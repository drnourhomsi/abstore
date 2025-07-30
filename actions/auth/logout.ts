'use server';

import { fetchApiClient } from '@/lib/oneentry';
import { cookies } from 'next/headers';

interface IErrorResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  pageData: null;
}

export default async function logoutAction() {
  const cookieStore = cookies();
  const refreshTokenCookie = (await cookieStore).get('refresh_token')?.value;
  const accessTokenCookie = (await cookieStore).get('access_token')?.value;
  const apiClient = await fetchApiClient();

    
  if (!refreshTokenCookie || !accessTokenCookie) {
    return {
      message: 'You are not currently logged in.',
    };
  }

    const logoutResponse = await apiClient?.AuthProvider.setAccessToken(
      accessTokenCookie
    ).logout('email', refreshTokenCookie);

    
    if (typeof logoutResponse !== 'boolean') {
      const errorResponse = logoutResponse as unknown as IErrorResponse;
      return {
        message: errorResponse.message,
      };
    }

    // After logout.. Delete the cookies
    (await cookieStore).delete('refresh_token');
    (await cookieStore).delete('access_token');
    (await cookieStore).delete('user_identifier');

    // Set the cookies to expire immediately
    (await cookieStore).set('refresh_token', '', { maxAge: 0 });
    (await cookieStore).set('access_token', '', { maxAge: 0 });
    (await cookieStore).set('user_identifier', '', { maxAge: 0 });

    return { message: 'Logout successful.' };


}