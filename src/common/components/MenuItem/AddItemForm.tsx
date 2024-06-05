import { TMenuItem } from "@/data/types/menu.types";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import Button from "../Inputs/Button";
import Input from "../Inputs/Input";

export interface AddItemFormProps {
    onSubmit: (e: any) => void;
    register: UseFormRegister<TMenuItem>;
    errors: FieldErrors<TMenuItem>;
    editingItem?: TMenuItem | null;
    onClear?: () => void
}

const AddItemForm: React.FC<AddItemFormProps> = (props) => {
    const { register, onSubmit, errors, editingItem, onClear } = props;

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <Input
                    inputAttribute={{
                        placeholder: 'Category',
                        className: 'w-full p-2 border border-gray-300 rounded mt-1',
                        ...register('category', { required: 'Category is required', })
                    }}
                />
                {errors.category && <span className="text-sm text-red-600">{errors.category.message}</span>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <Input
                    inputAttribute={{
                        placeholder: 'Name',
                        className: 'w-full p-2 border border-gray-300 rounded mt-1',
                        ...register('name', { required: 'Name is required' })
                    }}
                />
                {errors.name && <span className="text-sm text-red-600">{errors.name.message}</span>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Options (comma separated)</label>
                <Input
                    inputAttribute={{
                        placeholder: 'Options (comma separated)',
                        className: 'w-full p-2 border border-gray-300 rounded mt-1',
                        ...register('options', { required: 'Options are required' })
                    }}
                />
                {errors.options && <span className="text-sm text-red-600">{errors.options.message}</span>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <Input
                    inputAttribute={{
                        type: 'number',
                        placeholder: 'Price',
                        className: 'w-full p-2 border border-gray-300 rounded mt-1',
                        ...register('price', { required: 'Price is required' })
                    }}
                />
                {errors.price && <span className="text-sm text-red-600">{errors.price.message}</span>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Cost</label>
                <Input
                    inputAttribute={{
                        type: 'number',
                        placeholder: 'Cost',
                        className: 'w-full p-2 border border-gray-300 rounded mt-1',
                        ...register('cost', { required: 'Cost is required' })
                    }}
                />
                {errors.cost && <span className="text-sm text-red-600">{errors.cost.message}</span>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Amount in Stock</label>
                <Input
                    inputAttribute={{
                        type: 'number',
                        placeholder: 'Amount in Stock',
                        className: 'w-full p-2 border border-gray-300 rounded mt-1',
                        ...register('amountInStock', { required: 'Amount in stock is required' })
                    }}
                />
                {errors.amountInStock && <span className="text-sm text-red-600">{errors.amountInStock.message}</span>}
            </div>
            <Button
                btnType="default"
                buttonAttributes={{
                    type: 'button',
                    onClick: () => onClear?.()
                }}
                className="w-full p-2 hover:scale-105"
            >
                Clear
            </Button>
            <Button
                btnType="primary"
                buttonAttributes={{
                    type: 'submit'
                }}
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:scale-105"
            >
                {editingItem ? 'Update' : 'Add'} Item
            </Button>
        </form>
    );
};

export default AddItemForm;
