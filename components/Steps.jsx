const Steps = ({ steps, currentStep }) => {
	return (
		<ul>
			{steps.slice(0, 4).map((step, index) => (
				<li
					key={index}
					className="flex items-center uppercase gap-4 mb-8"
				>
					<div
						className={`w-[33px] h-[33px] border text-sm font-bold rounded-full flex items-center justify-center ${
							index + 1 === currentStep
								? 'border-skyBlue bg-skyBlue text-denim'
								: 'text-white border-white'
						}`}
					>
						{step.number}
					</div>
					<div>
						<p className="text-xs text-lightBlue mb-1">
							Step {step.number}
						</p>
						<p className="text-sm text-white font-bold tracking-[1px]">
							{step.title}
						</p>
					</div>
				</li>
			))}
		</ul>
	);
};

export default Steps;
