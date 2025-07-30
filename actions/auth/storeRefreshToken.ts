'use server';

import { cookies } from 'next/headers';

export default async function storeRefreshToken(token: string) {
  const cookieStore = await cookies();
  return cookieStore.set('refresh_token', token);
}