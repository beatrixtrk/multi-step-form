import React from 'react';

const Summary = ({
	personalFormData,
	planFormData,
	setPlanFormData,
	addOnFormData,
	setAddOnFormData,
	billingPeriod,
	setBillingPeriod,
	prevStep,
	changePlan,
	submitForm,
}) => {
	let totalAddOnPrice = 0;

	if (Object.keys(addOnFormData).length > 0) {
		for (const key in addOnFormData) {
			totalAddOnPrice += addOnFormData[key].price;
		}
	}

	const totalPrice =
		parseInt(planFormData.selectedPlanOption.price) + totalAddOnPrice;

	const handleNext = () => {
		submitForm();
	};

	const handlePrev = () => {
		prevStep();
		setAddOnFormData({});
	};

	const handlePlan = () => {
		changePlan();
		setAddOnFormData({});
		setPlanFormData({});
		setBillingPeriod(false);
	};

	return (
		<div className="flex flex-col justify-between h-full">
			<div>
				<h1 className="h1">Finishing Up</h1>
				<p className="description">
					Double-check everything looks OK before confirming.
				</p>

				<div>
					<div className="bg-lightGray rounded-lg p-4 md:p-6">
						<div className="flex items-center justify-between ">
							<p className="text-denim text-sm md:text-base font-medium">
								{planFormData.selectedPlanOption.title}
								{billingPeriod ? '(Yearly)' : '(Monthly)'}
								<span className="block ">
									<button
										className="text-gray text-sm font-normal underline underline-offset-2 mt-[7px]"
										type="button"
										onClick={handlePlan}
									>
										Change
									</button>
								</span>
							</p>
							<p className="text-denim text-sm font-bold md:text-base">
								${planFormData.selectedPlanOption.price}/
								{billingPeriod ? 'yr' : 'mo'}
							</p>
						</div>
						{Object.keys(addOnFormData).length > 0 && (
							<>
								<hr className="h-px bg-gray opacity-20 mt-3 md:mt-6" />
								{Object.values(addOnFormData).map(
									(addon, index) => (
										<div
											key={index}
											className="flex items-center justify-between mt-3 md:mt-6"
										>
											<p className="text-gray text-sm font-normal">
												{addon.name}
											</p>
											<p className="text-denim text-sm font-normal">
												+${addon.price}/
												{billingPeriod ? 'yr' : 'mo'}
											</p>
										</div>
									)
								)}
							</>
						)}
					</div>
					<div className="flex items-center justify-between pt-4 pb-0 px-4 md:p-6">
						<p className="text-gray text-sm font-normal">
							Total {'('}per {billingPeriod ? 'year)' : 'month)'}
						</p>
						<p className="text-purple text-base md:text-xl font-bold">
							${totalPrice}/{billingPeriod ? 'yr' : 'mo'}
						</p>
					</div>
				</div>
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
					className="confirm-button"
					onClick={handleNext}
					type="submit"
				>
					Confirm
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
					className="confirm-button"
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
