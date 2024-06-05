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
	const [isOptionSelected, setIsOptionSelected] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const resp = await fetch('/data.json');
			const data = await resp.json();
			setOptionsData(data);
		};
		fetchData();
	}, []);

	const handleChange = () => {
		setIsChecked(!isChecked);
		setBillingPeriod(!isChecked);
		setSelectedPlanOption({});
		setPlanFormData({});
		setIsOptionSelected(false);
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

		setIsOptionSelected(true);

		const errorInput = document.getElementById('error-input');
		if (!errorInput.classList.contains('!hidden')) {
			errorInput.classList.add('!hidden');
		}
	};

	const handleNext = () => {
		if (isOptionSelected) {
			nextStep();
		} else {
			document.getElementById('error-input').classList.remove('!hidden');
		}
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
				<div key={index} className="last:mb-6 md:last:mb-0">
					<label
						htmlFor={`option-${index}`}
						className={`flex w-full m-h-[160px] mb-[12px] border border-borderColor rounded-[8px] p-4 md:block md:mb-8 md:w-[138px] lg:px-4 lg:py-5 hover:cursor-pointer ${
							selectedPlanOption &&
							selectedPlanOption.title === option.title
								? 'border-purple bg-lightGray'
								: ''
						}`}
					>
						<input
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
							className="mr-[14px] md:mb-10"
							src={`/${option.title}.svg`}
							alt={option.title}
						/>
						<div>
							<p className="text-denim font-medium text-sm lg:text-base mb-[7px]">
								{option.title}
							</p>
							<span className="text-sm text-gray">
								${option.price}/{isChecked ? 'yr' : 'mo'}
							</span>
							<span
								className={`text-xs mt-[7px] text-denim ${
									isChecked ? 'block' : 'hidden'
								}`}
							>
								2 months free
							</span>
						</div>
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
				<span
					id="error-input"
					className="error-msg mt-[-19px] lg:mt-[-28px] !hidden"
				>
					Please select a plan option
				</span>
				<div className="md:flex items-center justify-between gap-4">
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

			<div className="hidden md:flex items-center justify-between">
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

			<div className="fixed bottom-0 w-full bg-white -ml-10 p-4 flex items-center justify-between shadow-buttonBar md:hidden">
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
