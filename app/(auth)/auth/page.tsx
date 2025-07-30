'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { getSignupFormData, handleSignupSubmit } from '@/actions/auth/signup';
import { getLoginFormData, handleLoginSubmit } from '@/actions/auth/login';
import { IAttributes } from 'oneentry/dist/base/utils';


import { Button } from '@/components/ui/button';
import { ChevronLeftCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


interface SignUpFormData {
  email: string;
  password: string;
  name: string;
}

interface LoginFormData {
  email: string;
  password: string;
}



export default function Auth() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [isSignUp, setIsSignUp] = useState(true);
	const [formData, setFormData] = useState<IAttributes[]>([]);
	const [inputValues, setInputValues] = useState<Partial<SignUpFormData & LoginFormData>>({});


	useEffect(() => {
		const type = searchParams.get('type');
		setIsSignUp(type !== 'login');
	}, [searchParams]);

		
	useEffect(() => {
		const fetchData = isSignUp ? getSignupFormData : getLoginFormData;
		fetchData()
		.then((data) => setFormData(data))
	}, [isSignUp]);


	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (isSignUp) {
			if (inputValues.email && inputValues.password && inputValues.name) {
			const response = await handleSignupSubmit(
				inputValues as SignUpFormData
			);

			if ('identifier' in response) {
				setInputValues({});
				setIsSignUp(false);
			} 
			} 
		} else {
			if (inputValues.email && inputValues.password) {
			const response = await handleLoginSubmit(
				inputValues as LoginFormData
			);
			
			}
		}
	};

	const switchForm = () => {
		setIsSignUp(!isSignUp);
		setInputValues({});
	};



	return (
		<>
			<div className='flex min-h-screen mt-7'>
				<div className='w-full max-w-3xl mx-auto p-3'>
					<div>
						<div className='mb-8 lg:mb-12' onClick={() => router.push('/')}>
							<ChevronLeftCircle className='text-gray-500 h-6 w-6 sm:h-8 sm:w-8 cursor-pointer' />
						</div>

						<h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-blue-900'>
							{isSignUp ? 'Sign Up' : 'Sign In'}
						</h2>

						<form className='space-y-5' onSubmit={handleSubmit}>
							{formData.map((field) => (
								<div key={field.marker}>
									<Label htmlFor={field.marker} className='text-base sm:text-lg text-gray-400 mb-1 sm:mb-2 block'>
										{field.localizeInfos.title}
									</Label>
									<Input
										id={field.marker}
										type={field.marker === 'password' ? 'password' : 'text'}
										name={field.marker}
										className='text-base sm:text-lg p-4 sm:p-6'
										placeholder={field.localizeInfos.title}
										value={inputValues[field.marker as keyof (SignUpFormData & LoginFormData)] || ''}
										onChange={handleInputChange}
									/>
								</div>
							))}

							<div>
								<Button>
									{isSignUp
										? ('Sign Up')
										: ('Sign In')
									}
								</Button>
							</div>
						</form>

						<div className='mt-4 sm:mt-5 text-gray-600 flex items-center justify-center'>
							<p>{isSignUp ? 'Already a member?' : 'Create new account'}</p>
							<Button variant='link' className='cursor-pointer' onClick={switchForm}>
								{isSignUp ? 'Sign in' : 'Sign up'}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}