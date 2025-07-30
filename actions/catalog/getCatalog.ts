'use server';

import { fetchApiClient } from '@/lib/oneentry';

export const getCatalogs = async (): Promise<any> => {
	try {
		const apiClient = await fetchApiClient();
		const pages = await apiClient?.Pages.getRootPages('en_US');

		const catalogPages = pages?.filter((page: { type: string }) => page.type === 'catalog_page');

		// Return an array
		return catalogPages?.length ? catalogPages : [];
	} catch (error) {
		console.error({ error });
		return [];
	}
};
