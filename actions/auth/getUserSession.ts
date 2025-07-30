'use server';

import { fetchApiClient } from '@/lib/oneentry';
import { cookies } from 'next/headers';

interface IError {
	statusCode: number;
	message: string;
}

export default async function getUserSession() {
	const apiClient = await fetchApiClient();
	const accessToken = (await cookies()).get('access_token')?.value;

	if (!accessToken) {
		return null;
	}

	const currentUser = await apiClient?.Users.setAccessToken(accessToken).getUser();

	if (!currentUser || !currentUser.id) {
		throw new Error('Invalid user data or missing user ID.');
	}

	return currentUser;
}