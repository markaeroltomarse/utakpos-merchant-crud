import React from 'react';

interface ChipProps {
    label: string;
    onDelete?: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, onDelete }) => {
    return (
        <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-200 text-sm font-medium">
            <span>{label}</span>
            {onDelete && (
                <button
                    onClick={onDelete}
                    className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                    &times;
                </button>
            )}
        </div>
    );
};

export default Chip;
