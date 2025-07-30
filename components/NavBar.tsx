'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import getUserSession from '@/actions/auth/getUserSession';
import logoutAction from '@/actions/auth/logout';
import useCartStore from '@/app/store/cartStore';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ShoppingCart, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { IUserEntity } from 'oneentry/dist/users/usersInterfaces';
import Logo from './assets/images/Logo';
import MenuItems from './MenuItems';

function NavBar() {
	const router = useRouter();
	const [user, setUser] = useState<IUserEntity | null>(null);
	const cartItems = useCartStore((state) => state.cart);

	useEffect(() => {
		async function fetchUser() {
			try {
				const userData = await getUserSession();
				if (userData) setUser(userData as IUserEntity);
			} catch (error) {
				setUser(null);
			}
		}
		fetchUser();
	}, []);

	const handleLogout = async () => {
		await logoutAction();
		router.push('/');
		setUser(null);
	};

	useEffect(() => {
		console.log(user);
	}, [user]);

	return (
		<>
			<div className='bg-gray-100 font-sans w-full m-0'>
				<div className='bg-white shadow'>
					<div className='container mx-auto px-4'>
						<div className='flex items-center justify-between py-4'>
							<Logo />
							<MenuItems />

							<div className='flex items-center'>
								<Link href='/cart'>
									<Button size='icon' className='relative cursor-pointer text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4' variant='outline'>
										<ShoppingCart className='h-5 w-5' />
										{cartItems.length > 0 && (
											<span className='absolute top-[-5px] right-[-2px] px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full'>{cartItems.length}</span>
										)}
									</Button>
								</Link>
								{!user && (
									<div className='flex mx-2 space-x-2'>
										<div>
											<Link href='/auth?type=login'>
												<Button variant='outline' className='cursor-pointer'>
													Login
												</Button>
											</Link>
										</div>
										<div>
											<Link href='/auth?type=signup'>
												<Button className='text-white cursor-pointer'>Sign Up</Button>
											</Link>
										</div>
									</div>
								)}

								{user && (
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant='outline' className='relative h-9 w-9 rounded-full'>
												<Avatar className='cursor-pointer'>
													<AvatarFallback className='border text-white'>😃</AvatarFallback>
												</Avatar>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className='w-48 ' align='end' forceMount>
											<DropdownMenuLabel>{user.formData.find((userName) => userName.marker === 'name')?.value}</DropdownMenuLabel>

											<DropdownMenuSeparator />

											<DropdownMenuItem>
												<Link href='/profile'>Profile</Link>
											</DropdownMenuItem>

											<DropdownMenuItem>
												<Link href='/orders'>Orders</Link>
											</DropdownMenuItem>

											<DropdownMenuSeparator />

											<DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default NavBar;