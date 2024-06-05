import React from 'react';

const SwitchInput = ({ id, labelBefore, labelAfter, checked, onChange }) => {
	return (
		<div className="flex items-center justify-center rounded-lg bg-lightGray pt-3 px-4 pb-4 w-full md:mb-10">
			<label
				htmlFor={id}
				className="flex items-center justify-around mb-0"
			>
				<div
					className={`mr-6 font-medium ${
						!checked ? 'text-denim' : 'text-gray'
					}`}
				>
					{labelBefore}
				</div>
				<input
					id={id}
					type="checkbox"
					className="hidden"
					checked={checked}
					onChange={onChange}
				/>
				<div className="relative">
					<div className="w-[38px] h-[20px] bg-denim rounded-full"></div>
					<div
						className={`absolute top-[4px] left-[4px] w-[12px] h-[12px] bg-white rounded-full shadow-md transition ${
							checked ? 'transform translate-x-[18px]' : ''
						}`}
					></div>
				</div>
				<div
					className={`ml-6 font-medium ${
						checked ? 'text-denim' : 'text-gray'
					}`}
				>
					{labelAfter}
				</div>
			</label>
		</div>
	);
};

export default SwitchInput;
