import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface InputProps {
    className?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    inputAttribute?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    error?: string;
    label?: string;
    helperText?: string;
}

const Input: React.FC<InputProps> = (props) => {
    const {
        inputAttribute,
        className,
        leftIcon,
        rightIcon,
        error,
        label,
        helperText
    } = props;

    const isCheckbox = inputAttribute?.type === 'checkbox';

    return (
        <div className={`flex flex-col ${className}`}>
            {label && !isCheckbox && (
                <label htmlFor={inputAttribute?.id} className="mb-1 text-sm font-medium text-gray-700">{label}</label>
            )}
            <div className={` flex ${isCheckbox ? 'items-center' : 'gap-3 items-center border bg-white'}  ${error ? 'border-red-500' : 'border-[#3F3F3F]'} rounded-md`}>
                {leftIcon && !isCheckbox && <div className="ml-1">{leftIcon}</div>}
                <input
                    {...inputAttribute}
                    className={`${isCheckbox ? 'form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out' : `${!['checkbox', 'radio'].includes(inputAttribute?.type!) && !leftIcon ? 'px-3' : 'p-0'} py-2 bg-none focus:outline-none focus:ring focus:border-yellow-300 rounded-md outline-none border-none font-Jost w-full text-[0.875rem] text-[#3F3F3F] ${inputAttribute?.className}`}`}
                />
                {label && isCheckbox && (
                    <label htmlFor={inputAttribute?.id} className="ml-2 text-sm font-medium text-gray-700">{label}</label>
                )}
                {rightIcon && !isCheckbox && <div className="mr-1">{rightIcon}</div>}
            </div>
            {helperText && !isCheckbox && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default Input;
