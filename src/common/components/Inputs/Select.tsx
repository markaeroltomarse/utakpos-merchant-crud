import React from 'react';

interface SelectDropdownProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    className?: string;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ value, onChange, options, className }) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={className}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default SelectDropdown;
