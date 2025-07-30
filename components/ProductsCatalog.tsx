import React from 'react';
import Product from '@/components/Product';

const ProductCatalog = ({ title, products }: { title: string; products: any[] }) => {
	return (
		<section className='mb-12'>
            <h2 className='text-3xl font-bold mb-8'>
                {title}
            </h2>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
				{products?.map((product) => {
					return <Product product={product} key={product.id} />;
				})}
			</div>
		</section>
	);
};

export default ProductCatalog;