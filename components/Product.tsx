import Link from 'next/link';
import { Button } from './ui/button';

import useCartStore from '@/app/store/cartStore';

const Product = ({ product }: { product: any }) => {
	const addToCart = useCartStore((state) => state.addToCart);

	const handleAddToCart = (product: any) => {
		addToCart({
			id: product.id,
			name: product.attributeValues.product_title.value || 'Product',
			price: product.attributeValues.product_price.value || 0,
			quantity: 1,
			image: product.attributeValues.product_image.value.downloadLink,
		});
	};

	return (
		<>
			<div className='max-w-md mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg'>
				<div className='relative'>
					<Link href={`/product/${product.id}`}>
						<img className='w-full bg-transparent object-cover' src={product.attributeValues.product_image.value.downloadLink} alt={product.attributeValues.product_title.value} />
					</Link>
					<div className='absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium'>SALE</div>
				</div>
				<div className='p-4'>
					<Link href={`/product/${product.id}`}>
						<h3 className='text-lg font-medium mb-2'>{product.attributeValues.product_title.value}</h3>
					</Link>
					<p
						className='text-gray-600 text-sm mb-4 line-clamp-5'
						dangerouslySetInnerHTML={{
							__html: product.attributeValues.product_description.value[0].htmlValue,
						}}
					/>
					<div className='flex items-center justify-between'>
						<span className='font-bold text-lg'>${product.attributeValues.product_price.value.toFixed(2)}</span>
						<Button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded' onClick={() => handleAddToCart(product)}>
							Buy Now
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Product;