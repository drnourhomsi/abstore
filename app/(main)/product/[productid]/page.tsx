'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getProductDetails } from '@/actions/catalog/getProductDetails';
import { useParams } from 'next/navigation';
import useCartStore from '@/app/store/cartStore';
import { ShoppingBasketIcon } from 'lucide-react';
import Footer from '@/components/Footer';

export default function ProductDetailPage({ params: paramsPromise }: { params: Promise<{ productId: string }> }) {
	const [productId, setProductId] = useState<string | null>(null);
	const [product, setProduct] = useState<any | null>(null);

	const params = useParams();

	useEffect(() => {
		setProductId(params.productid);
	}, [params]);

	useEffect(() => {
		const fetchData = async () => {
			if (!productId) return;

			const productData = await getProductDetails(parseInt(productId));
			setProduct(productData as unknown as any);
		};

		fetchData();
	}, [productId]);

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
			<div>
				<div className='bg-gray-100'>
					<div className='container mx-auto px-8 py-18'>
						<div className='flex flex-wrap -mx-4'>
							<div className='w-full md:w-1/2 px-4 mb-8'>
								<img
									src={product?.attributeValues?.product_image?.value?.downloadLink}
									alt={product?.attributeValues?.product_title?.value}
									className='w-full h-auto rounded-lg shadow-md mb-4'
									id='mainImage'
								/>
							</div>

							<div className='w-full md:w-1/2 px-4'>
								<h2 className='text-3xl font-bold mb-2'>{product?.attributeValues?.product_title?.value}</h2>
								<p className='text-gray-600 mb-4'>SKU: WH1000XM4</p>
								<div className='mb-4'>
									<span className='text-2xl font-bold mr-2'>${product?.attributeValues?.product_price?.value?.toFixed(2)}</span>
									<span className='text-gray-500 line-through'>${product?.attributeValues?.product_price?.value?.toFixed(2) * 2}</span>
								</div>

								<p
									className='text-gray-700 mb-6'
									dangerouslySetInnerHTML={{
										__html: product?.attributeValues?.product_description?.value?.[0]?.htmlValue,
									}}
								/>

								<div className='mb-6'>
									<h3 className='text-lg font-semibold mb-2'>Color:</h3>
									<div className='flex space-x-2'>
										<button className='w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'></button>
										<button className='w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300'></button>
										<button className='w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'></button>
									</div>
								</div>

								<div className='flex space-x-4 mb-6'>
									<Button
										className='bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
										onClick={() => handleAddToCart(product)}>
										<ShoppingBasketIcon />
										Add to Cart
									</Button>
								</div>

								<div>
									<h3 className='text-lg font-semibold mb-2'>Key Features:</h3>
									<ul className='list-disc list-inside text-gray-700'>
										<li>Industry-leading noise cancellation</li>
										<li>30-hour battery life</li>
										<li>Touch sensor controls</li>
										<li>Speak-to-chat technology</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}