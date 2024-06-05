import React from 'react';
import Loading from '../Display/Loading';

export interface ButtonProps {
    className?: string;
    children?: React.ReactNode;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    btnType: 'link' | 'default' | 'primary' | 'success' | 'warning' | 'error';
    iconRight?: React.ReactNode;
    isLoading?: boolean;
    style?: React.CSSProperties;
    buttonAttributes?: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = (props) => {
    const { className, children, size, btnType, iconRight, isLoading, buttonAttributes, ...restProps } = props;

    // Define Tailwind CSS classes based on the props
    const buttonDefault = `bg-white text-[#1E1E1E] border border-[#1E1E1E] text-[#1E1E1E]`
    const buttonLink = `bg-transparent text-[#1E1E1E] text-[#1E1E1E]`
    const buttonClasses = `${btnType === 'default' ? buttonDefault : (btnType === 'link' ? buttonLink : `bg-${btnType} text-white`)} px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-300 hover:scale-110 transition-all`;

    // Define size classes based on the 'size' prop
    const sizeClasses = size === 'xs' ? 'text-xs' : size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base';

    return (
        <button {...buttonAttributes} className={`rounded ${buttonClasses} ${sizeClasses} ${className} ${isLoading && 'opacity-50'} ${iconRight && 'flex gap-3 items-center '} ${buttonAttributes?.disabled && 'opacity-50'}`} {...restProps}>
            {iconRight && <span className="ml-2">{iconRight}</span>}
            {isLoading ? (
                <Loading color='white' size={25} />
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
