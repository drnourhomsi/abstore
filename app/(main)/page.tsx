'use client';

import { getCatalogProducts } from '@/actions/catalog/getCatalogProducts';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProductCatalog from '@/components/ProductsCatalog';

import { useEffect, useState } from 'react';

export default function page() {
	const [products, setProducts] = useState<any>([]);

	useEffect(() => {
		const getData = async () => {
			const catalogs: any = await getCatalogProducts();

			if (catalogs?.length) setProducts(catalogs);
		};
		getData();
	}, []);

	return (
		<div className='min-h-screen'>
      <main className='container mx-auto px-4 py-8'>
				<Header />
				<hr />
				<section className='mb-12 mx-auto mt-12'>
					<div className='inset-0 flex flex-col p-8'>
						{products.map((catalog) => (
							<ProductCatalog
								key={catalog?.id}
								title={catalog?.localizeInfos?.title as string}
								products={catalog.catalogProducts.items as string}
							/>
						))}
					</div>
				</section>
				<Footer />
			</main>
		</div>
	);
}