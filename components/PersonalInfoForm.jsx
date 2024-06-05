import React, { useState } from 'react';

const PersonalInfoForm = ({
	personalFormData = {},
	setPersonalFormData,
	nextStep,
}) => {
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPersonalFormData({
			...personalFormData,
			[name]: value,
		});
		// Clear the error message if the user starts typing again
		setErrors({
			...errors,
			[name]: '',
		});
	};

	const handleNext = () => {
		//Perform validation before proceeding to the next step
		const { name, email, phone } = personalFormData;
		const newErrors = {};
		if (!name) {
			newErrors.name = 'Name is required';
		}
		if (!email) {
			newErrors.email = 'Email is required';
		} else if (!isValidEmail(email)) {
			newErrors.email = 'Invalid email format';
		}
		if (!phone) {
			newErrors.phone = 'Phone number is required';
		} else if (!isValidPhoneNumber(phone)) {
			newErrors.phone = 'Invalid phone number format';
		}

		// If there are errors, set them and prevent moving to the next step
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
		} else {
			nextStep();
		}
	};

	// Function to validate email format
	const isValidEmail = (email) => {
		// Implement your email validation logic here
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	// Function to validate phone number format
	const isValidPhoneNumber = (phone) => {
		// Implement your phone number validation logic here
		return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(phone);
	};

	return (
		<div className="flex flex-col justify-between h-full">
			<div>
				<h1 className="h1">Personal Info</h1>
				<p className="description">
					Please provide your name, email address, and phone number.
				</p>
				<div>
					<div className="flex items-center justify-between">
						<label htmlFor="name">Name</label>
						{errors.name && (
							<span className="error-msg">{errors.name}</span>
						)}
					</div>
					<input
						required
						id="name"
						type="text"
						name="name"
						value={personalFormData.name || ''}
						onChange={handleChange}
						placeholder="e.g. Stephen King"
					/>
				</div>
				<div>
					<div className="flex items-center justify-between">
						<label htmlFor="email">Email Address</label>
						{errors.email && (
							<span className="error-msg">{errors.email}</span>
						)}
					</div>
					<input
						required
						id="email"
						type="email"
						name="email"
						value={personalFormData.email || ''}
						onChange={handleChange}
						placeholder="e.g. stephenking@lorem.com"
					/>
				</div>
				<div>
					<div className="flex items-center justify-between">
						<label htmlFor="phone">Phone Number</label>
						{errors.phone && (
							<span className="error-msg">{errors.phone}</span>
						)}
					</div>
					<input
						required
						id="phone"
						type="tel"
						name="phone"
						value={personalFormData.phone || ''}
						onChange={handleChange}
						placeholder="e.g. +1 234 567 890"
					/>
				</div>
			</div>
			<div className="hidden md:flex items-center justify-end">
				<button
					className="next-button"
					onClick={handleNext}
					type="button"
				>
					Next Step
				</button>
			</div>
			<div className="fixed bottom-0 w-full bg-white -ml-10 p-4 text-right md:hidden shadow-buttonBar">
				<button
					className="next-button"
					onClick={handleNext}
					type="button"
				>
					Next Step
				</button>
			</div>
		</div>
	);
};

export default PersonalInfoForm;
