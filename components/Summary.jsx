import React from 'react';

const Summary = ({
	personalFormData,
	planFormData,
	addOnFormData,
	billingPeriod,
	prevStep,
	submitForm,
}) => {
	const handleNext = () => {
		submitForm();
	};

	const handlePrev = () => {
		prevStep();
	};

	return (
		<div>
			<h1 className="h1">Finishing Up</h1>
			<p className="description">
				Double-check everything looks OK before confirming.
			</p>
			<div>
				<div className="bg-lightGray rounded-lg p-6">
					<div className="flex items-center justify-between mb-6">
						<p className="text-denim font-medium">
							{planFormData.selectedPlanOption.title}{' '}
							{billingPeriod ? '(Yearly)' : '(Monthly)'}
							<span className="block ">
								<button
									className="text-gray text-sm font-normal underline underline-offset-2 mt-[7px]"
									type="button"
									onClick={handlePrev}
								>
									Change
								</button>
							</span>
						</p>
						<p className="text-denim font-bold">
							+${planFormData.selectedPlanOption.price}/
							{billingPeriod ? 'yr' : 'mo'}
						</p>
					</div>
					<hr className="h-px bg-gray opacity-20 mb-6" />
					{addOnFormData &&
						addOnFormData.map((addon, index) => {
							<div
								key={index}
								className="flex items-center justify-between mb-6"
							>
								<p className="text-denim font-medium">
									{addon.name}
								</p>
								<p className="text-denim font-bold">
									+${addon.price}/
									{billingPeriod ? 'yr' : 'mo'}
								</p>
							</div>;
						})}
				</div>
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
					type="submit"
				>
					Confirm
				</button>
			</div>
		</div>
	);
};

export default Summary;
