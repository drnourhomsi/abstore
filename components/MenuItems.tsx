import React from 'react';

function MenuItems() {
	return (
		<>
			<div className='hidden sm:flex sm:items-center'>
				<a href='#' className='text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4'>
					Products
				</a>
				<a href='#' className='text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4'>
					Marketplace
				</a>
				<a href='#' className='text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4'>
					Partners
				</a>
				<a href='#' className='text-gray-800 text-sm font-semibold hover:text-purple-600'>
					Pricing
				</a>
			</div>
		</>
	);
}

export default MenuItems;
