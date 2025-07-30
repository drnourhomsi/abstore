'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useCartStore from '@/app/store/cartStore';

export default function CartPage() {
	const cartItems = useCartStore((state) => state.cart);
	const updateQuantity = useCartStore((state) => state.updateQuantity);
	const removeItem = useCartStore((state) => state.removeItem);

	const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<div className='min-h-screen  p-4 sm:p-8'>
			<div className='max-w-4xl mx-auto'>
				<h1 className='text-3xl sm:text-4xl font-bold text-center mb-8'>User Cart</h1>

				<div>
					{cartItems.map((item) => (
						<div key={item.id} className=' p-4 sm:p-6 rounded-2xl mb-3 border-1 border-gray-400'>
							<div className='flex justify-between'>
								<div>
									<img src={item.image} alt={item.name} className='w-24 h-24 object-cover' />
									<div>
										<h3 className='text-lg font-semibold'>{item.name}</h3>
										<p>${item?.price?.toFixed(2)}</p>
									</div>
								</div>
								<div className='flex items-center justify-between'>
									<div className='flex items-center space-x-1'>
										<Input type='number' min='0' value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} className='w-16 text-center' />
										<Button variant='ghost' size='icon' onClick={() => updateQuantity(item.id, item.quantity - 1)}>➖</Button>
										<Button variant='ghost' size='icon' onClick={() => updateQuantity(item.id, item.quantity + 1)}>➕</Button>
										<Button variant='ghost' size='icon' onClick={() => removeItem(item.id)}>🗑️</Button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className='flex justify-between text-lg font-semibold mt-8'>
					<span>Total</span>
					<span>${total.toFixed(2)}</span>
				</div>
			</div>
		</div>
	);
}