'use server';
import { fetchApiClient } from '@/lib/oneentry';
import { getCatalogs } from './getCatalog';

export const getCatalogProducts = async () => {
	const apiClient = await fetchApiClient();
	const catalogs: any = await getCatalogs();

	const catalogProducts = [];

	if (catalogs) {
		for (const catalog of catalogs) {
			const products = await apiClient?.Products.getProductsByPageId(catalog.id, undefined, 'en_US');
			catalogProducts.push({ ...catalog, catalogProducts: products });
		}
		return catalogProducts;
	}
};
