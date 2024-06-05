import React, { useState, useEffect } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import PlanOptionsForm from './PlanOptionsForm';
import AddOnsForm from './AddOnsForm';
import Summary from './Summary';
import Final from './Final';

const StepForm = ({ setCurrentStep }) => {
	const [step, setStep] = useState(1);
	const [personalFormData, setPersonalFormData] = useState({});
	const [planFormData, setPlanFormData] = useState({});
	const [addOnFormData, setAddOnFormData] = useState({});
	const [billingPeriod, setBillingPeriod] = useState(false);
	const [formData, setFormData] = useState({});

	useEffect(() => {
		setCurrentStep(step);
	}, [step, setCurrentStep]);

	const nextStep = () => {
		setStep(step + 1);
	};

	const prevStep = () => {
		switch (step) {
			case 1:
				setPersonalFormData({});
				break;
			case 2:
				setPlanFormData({});
				break;
			case 3:
				setAddOnFormData({});
				break;
			default:
				break;
		}
		setStep(step - 1);
	};
	const submitForm = (formData) => {
		setFormData(formData);
		nextStep();
	};

	const changePlan = () => {
		setStep(2);
	};

	return (
		<div className="px-6 py-8 bg-white rounded-[10px] md:p-0 h-full shadow-stepForm md:shadow-none">
			{step === 1 && (
				<PersonalInfoForm
					personalFormData={personalFormData}
					setPersonalFormData={setPersonalFormData}
					nextStep={nextStep}
				/>
			)}
			{step === 2 && (
				<PlanOptionsForm
					planFormData={planFormData}
					setPlanFormData={setPlanFormData}
					prevStep={prevStep}
					nextStep={nextStep}
					setBillingPeriod={setBillingPeriod}
				/>
			)}
			{step === 3 && (
				<AddOnsForm
					addOnFormData={addOnFormData}
					setAddOnFormData={setAddOnFormData}
					prevStep={prevStep}
					nextStep={nextStep}
					billingPeriod={billingPeriod}
				/>
			)}
			{step === 4 && (
				<Summary
					personalFormData={personalFormData}
					planFormData={planFormData}
					addOnFormData={addOnFormData}
					setPlanFormData={setPlanFormData}
					setAddOnFormData={setAddOnFormData}
					billingPeriod={billingPeriod}
					prevStep={prevStep}
					submitForm={submitForm}
					changePlan={changePlan}
				/>
			)}
			{step === 5 && <Final />}
		</div>
	);
};

export default StepForm;
