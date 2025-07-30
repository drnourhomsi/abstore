import React from 'react';

function Header() {
	return (
		<main className='dark:bg-gray-800 bg-white relative overflow-hidden'>
			<div className='bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden'>
				<div className='container mx-auto px-6 flex relative py-16'>
					<div className='sm:w-2/3 lg:w-2/5 flex flex-col relative z-20'>
						<span className='w-20 h-2 bg-gray-800 dark:bg-white mb-12'></span>
						<h1 className='font-rubik uppercase text-6xl sm:text-8xl mb-3 font-black flex flex-col leading-none dark:text-white text-gray-800'>
							AB STORE
						</h1>
						<p className='text-sm sm:text-base text-gray-700 dark:text-white'>
							Dimension of reality that makes change possible and understandable. An indefinite and homogeneous environment in which natural events and human existence take place.
						</p>
						<div className='flex mt-8'>
							<a href='#' className='uppercase py-2 px-4 rounded-lg bg-purple-600 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400'>
								Get started
							</a>
							<a
								href='#'
								className='uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-purple-600 text-purple-600 dark:text-white hover:bg-purple-600 hover:text-white text-md'>
								Read more
							</a>
						</div>
					</div>
					<div className='hidden sm:block sm:w-1/3 lg:w-3/5 relative'>
						<img src='https://www.tailwind-kit.com/images/object/10.png' className='max-w-xs md:max-w-sm m-auto' />
					</div>
				</div>
			</div>
		</main>
	);
}

export default Header;
