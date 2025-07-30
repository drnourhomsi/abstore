import { defineOneEntry } from 'oneentry';
import retrieveRefreshToken from '@/actions/auth/retrieveRefreshToken';
import storeRefreshToken from '@/actions/auth/storeRefreshToken';

export type ApiClientType = ReturnType<typeof defineOneEntry> | null;
let apiClient: ApiClientType = null;


async function setupApiClient(): Promise<ReturnType<typeof defineOneEntry>> {
	const apiUrl = process.env.ONEENTRY_PROJECT_URL;

	if (!apiUrl) {
		throw new Error('ONEENTRY_PROJECT_URL is missing');
	}

	if (!apiClient) {
		try {
			const refreshToken = await retrieveRefreshToken();

			apiClient = defineOneEntry(apiUrl, {
				token: process.env.ONEENTRY_TOKEN,
				langCode: 'en_US',
				auth: {
					refreshToken: refreshToken || undefined,
					customAuth: false,
					saveFunction: async (newToken: string) => {
						await storeRefreshToken(newToken);
					},
				},
			});
		} catch (error) {
			console.error('Error fetching refresh token:', error);
		}
	}

	if (!apiClient) {
		throw new Error('Failed to initialize API client');
	}

	return apiClient;
}




export async function fetchApiClient(): Promise<ReturnType<typeof defineOneEntry>> {
	if (!apiClient) {
		await setupApiClient();
	}

	if (!apiClient) {
		throw new Error('API client is still null after setup');
	}

	return apiClient;
}