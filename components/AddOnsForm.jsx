import React, { useState, useEffect } from 'react';

const AddOnsForm = ({
	addOnFormData,
	setAddOnFormData,
	prevStep,
	nextStep,
	billingPeriod,
}) => {
	const [checkedStates, setCheckedStates] = useState({});
	const [addOnsData, setAddOnsData] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const resp = await fetch('/data.json');
			const data = await resp.json();
			setAddOnsData(data);
		};
		fetchData();
	}, []);

	const handleCheckbox = (e) => {
		const { name, checked } = e.target;
		const { price } = e.target.dataset;

		setCheckedStates((prevState) => ({
			...prevState,
			[name]: checked,
		}));

		setAddOnFormData((prevData) => {
			const newData = { ...prevData };
			if (checked) {
				newData[name] = {
					name,
					price: parseFloat(price),
					period: e.target.dataset.period,
				};
			} else {
				delete newData[name];
			}
			return newData;
		});
	};

	const handleNext = () => {
		nextStep();
	};

	const handlePrev = () => {
		prevStep();
	};

	const renderAddOns = (addOns) => {
		if (!addOns) return null;

		return addOns
			.filter((addOn) => (billingPeriod ? addOn.yearly : addOn.monthly))
			.flatMap((addOn) => (billingPeriod ? addOn.yearly : addOn.monthly))
			.map((addOn, index) => (
				<div key={index}>
					<label
						htmlFor={`addOn-${index}`}
						className={`flex items-center justify-between checkbox mb-4 border border-borderColor rounded-[8px] p-4 lg:px-6 lg:py-4 hover:cursor-pointer ${
							checkedStates[`${addOn.title}`]
								? 'border-purple bg-lightGray'
								: ''
						}`}
					>
						<div className="flex items-center">
							<input
								id={`addOn-${index}`}
								className="relative peer customCheckbox"
								type="checkbox"
								name={addOn.title}
								value={addOn.price}
								data-price={addOn.price}
								data-period={
									billingPeriod ? 'yearly' : 'monthly'
								}
								onChange={handleCheckbox}
								checked={
									checkedStates[`${addOn.title}`] || false
								}
							/>
							<svg
								className={`absolute w-4 h-4 ml-[2px] ${
									checkedStates[`${addOn.title}`]
										? 'peer-checked:block'
										: 'hidden'
								}`}
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="white"
								strokeWidth="4"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polyline points="20 6 9 17 4 12"></polyline>
							</svg>
							<div>
								<p className="text-denim font-medium text-sm lg:text-base mb-[7px]">
									{addOn.title}
								</p>
								<span className="text-gray text-xs lg:text-sm">
									{addOn.description}
								</span>
							</div>
						</div>
						<span className="text-purple text-xs lg:text-sm">
							+${addOn.price}/{billingPeriod ? 'yr' : 'mo'}
						</span>
					</label>
				</div>
			));
	};

	return (
		<div>
			<h1 className="h1">Pick Add-ons</h1>
			<p className="description">
				Add-ons help enhance your gaming experience.
			</p>
			{renderAddOns(addOnsData?.addOns)}

			<div className="flex items-center justify-between">
				<button
					className="prev-button"
					onClick={handlePrev}
					type="button"
				>
					Go back
				</button>
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

export default AddOnsForm;
