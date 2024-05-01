import React, { useEffect, useState } from 'react';
import SwitchInput from './SwitchInput';

const PlanOptionsForm = ({
	planFormData,
	setPlanFormData,
	prevStep,
	nextStep,
	setBillingPeriod,
}) => {
	const [isChecked, setIsChecked] = useState(false);
	const [optionsData, setOptionsData] = useState(null);
	const [selectedPlanOption, setSelectedPlanOption] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const resp = await fetch('/data.json');
			const data = await resp.json();
			setOptionsData(data);
		};
		fetchData();
	}, []);

	const handleChange = () => {
		setIsChecked(!isChecked); // Toggle the isChecked stat
		setBillingPeriod(!isChecked);
		setSelectedPlanOption({});
		setPlanFormData({});
	};

	const handleOptionChange = (e) => {
		const { name, value } = e.target;
		const { dataset } = e.target;

		setSelectedPlanOption({
			title: value,
			price: dataset.price,
			period: dataset.period,
		});

		setPlanFormData({
			...planFormData,
			[name]: {
				title: value,
				price: dataset.price,
				period: dataset.period,
			},
		});
	};

	const handleNext = () => {
		nextStep();
	};

	const handlePrev = () => {
		prevStep();
	};

	const renderPlanOptions = (plan) => {
		if (!plan) return null;

		return plan
			.filter((option) => (isChecked ? option.yearly : option.monthly))
			.flatMap((option) => (isChecked ? option.yearly : option.monthly))
			.map((option, index) => (
				<div key={index}>
					<label
						htmlFor={`option-${index}`}
						className={`mb-8 border border-borderColor rounded-[8px] p-4 lg:px-4 lg:py-5 w-[138px] m-h-[160px] hover:cursor-pointer ${
							selectedPlanOption &&
							selectedPlanOption.title === option.title
								? 'border-purple bg-lightGray'
								: ''
						}`}
					>
						<input
							required
							type="radio"
							id={`option-${index}`}
							className="hidden"
							name="selectedPlanOption"
							value={option.title}
							checked={
								selectedPlanOption &&
								selectedPlanOption.title === option.title
							}
							data-period={isChecked ? 'yearly' : 'monthly'}
							data-price={option.price}
							onChange={handleOptionChange}
						/>
						<img
							className="mb-10"
							src={`/${option.title}.svg`}
							alt={option.title}
						/>
						<p className="text-denim font-medium text-sm lg:text-base mb-[7px]">
							{option.title}
						</p>
						<span className="text-sm text-gray">
							${option.price}/{isChecked ? 'yr' : 'mo'}
						</span>
					</label>
				</div>
			));
	};

	return (
		<div className="flex flex-col justify-between h-full">
			<div>
				<h1 className="h1">Select Your Plan</h1>
				<p className="description">
					You have the option of monthly or yearly billing.
				</p>
				<div className="flex items-center justify-between gap-4">
					{renderPlanOptions(optionsData?.plan)}
				</div>
				<SwitchInput
					id="options"
					labelBefore="Monthly"
					labelAfter="Yearly"
					checked={isChecked}
					onChange={handleChange}
				/>
			</div>
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

export default PlanOptionsForm;
