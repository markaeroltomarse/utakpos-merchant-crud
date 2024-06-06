import { TMenuItem } from "@/data/types/menu.types";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import React, { useEffect, useRef, useState } from 'react';
import Chip from "../Display/Chip";
import Input from "../Inputs/Input";
import SelectDropdown from "../Inputs/Select";

export interface IFilterMenu {
    filterCategory?: string,
    filterPriceRange?: { min: number; max: number },
    filterSearchTerm?: string
}

export interface MenuItemListProps {
    menuItems: TMenuItem[];
    onClickEdit?: (item: TMenuItem) => void;
    onClickDelete?: (itemId: string) => void;
    onChangePage?: (pageNumber: number, isGoingToNext?: boolean) => void;
    itemsPerPage?: number;
    onDeleteMultiple?: (itemIds: string[]) => void;
    onFilterChange?: (filter: IFilterMenu) => void
}

const MenuItemList: React.FC<MenuItemListProps> = (props) => {
    const { menuItems, onClickEdit, onClickDelete, onChangePage, onDeleteMultiple, onFilterChange, itemsPerPage } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    // Filter state
    const [filterCategory, setFilterCategory] = useState<string>('');
    const [filterPriceRange, setFilterPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: Infinity });
    const [filterSearchTerm, setFilterSearchTerm] = useState<string>('');

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const notificationRef = useRef<HTMLDivElement>(null);
    const isNotificationVisible = useElementOnScreen(notificationRef);

    useEffect(() => {
        onChangePage?.(currentPage);
    }, [currentPage]);

    useEffect(() => {
        onFilterChange?.({
            filterPriceRange,
            filterCategory,
            filterSearchTerm
        })
    }, [filterPriceRange, filterCategory, filterSearchTerm])

    const handleSelectItem = (id: string) => {
        setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.includes(id)
                ? prevSelectedItems.filter((itemId) => itemId !== id)
                : [...prevSelectedItems, id]
        );
    };

    const handleDeleteSelected = () => {
        onDeleteMultiple?.(selectedItems);
        setSelectedItems([]);
    };

    const options = [
        { value: '', label: 'All Categories' },
        { value: 'Beverages', label: 'Beverages' },
        { value: 'Main Course', label: 'Main Course' },
        { value: 'Desserts', label: 'Desserts' },
        { value: 'Salads', label: 'Salads' },
        { value: 'Appetizers', label: 'Appetizers' },
    ];

    // Filter logic
    const filteredMenuItems = menuItems.filter((item) => {
        const matchesCategory = filterCategory ? item.category === filterCategory : true;
        const matchesPriceRange = item.price >= filterPriceRange.min && item.price <= filterPriceRange.max;
        const matchesSearchTerm = filterSearchTerm ? item.name.toLowerCase().includes(filterSearchTerm.toLowerCase()) : true;

        return matchesCategory && matchesPriceRange && matchesSearchTerm;
    });

    return (
        <div>
            {/* Filter UI */}
            <div className="flex gap-4 mb-4">
                <SelectDropdown
                    value={filterCategory}
                    onChange={setFilterCategory}
                    options={options}
                    className="px-4 py-2 border border-gray-300 rounded-md"
                />

                {/* <input
                    type="number"
                    placeholder="Min Price"
                    value={filterPriceRange.min === 0 ? '' : filterPriceRange.min}
                    onChange={(e) => setFilterPriceRange({ ...filterPriceRange, min: Number(e.target.value) || 0 })}
                    className="px-4 py-2 border border-gray-300 rounded-md"
                />

                <input
                    type="number"
                    placeholder="Max Price"
                    value={filterPriceRange.max === Infinity ? '' : filterPriceRange.max}
                    onChange={(e) => setFilterPriceRange({ ...filterPriceRange, max: Number(e.target.value) || Infinity })}
                    className="px-4 py-2 border border-gray-300 rounded-md"
                /> */}

                <Input
                    inputAttribute={{
                        type: 'text',
                        placeholder: "Search...",
                        value: filterSearchTerm,
                        onChange: (e) => setFilterSearchTerm(e.target.value),
                    }}
                />
            </div>

            <ul className="space-y-6">
                {filteredMenuItems.map((item) => (
                    <li key={item.id} className={`p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${selectedItems.includes(item?.id!) ? 'bg-[#10ac8591] text-white' : 'bg-white'}`}>
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center mb-3">
                                    <Input
                                        className="mr-2"
                                        inputAttribute={{
                                            type: 'checkbox',
                                            checked: selectedItems.includes(item.id!),
                                            onChange: () => handleSelectItem(item.id!),
                                        }}
                                    />
                                    <small className="text-gray-500">{item.id}</small>
                                </div>
                                <div className="text-sm text-gray-500 mb-1">{item.category}</div>
                                <div className="text-2xl font-bold text-gray-900 mb-1">{item.name}</div>
                                <div className="text-gray-700 mb-1">Price: <span className="font-semibold">${Number(item.price).toFixed(2)}</span></div>
                                <div className="text-gray-700 mb-1">Cost: <span className="font-semibold">${Number(item.cost).toFixed(2)}</span></div>
                                <div className="text-gray-700 mb-3">In Stock: <span className="font-semibold">{item.amountInStock}</span></div>
                                <div className="flex items-center">
                                    <div className="text-gray-700 mr-2">Options:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {item.options
                                            && item.options
                                                .split(',')
                                                .map((option, index) => option && (
                                                    <Chip
                                                        key={index}
                                                        label={option.trim()}
                                                    />
                                                ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <button
                                    onClick={() => onClickEdit?.(item)}
                                    className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M9 11l4-4 5 5-4 4M7 17h6"></path></svg>
                                    Edit
                                </button>
                                <button
                                    onClick={() => onClickDelete?.(item.id!)}
                                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-7 7-7-7"></path></svg>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div ref={notificationRef}></div>
            <div className={`flex gap-2 justify-center transition-all mt-4 p-5 ${!isNotificationVisible && "rounded-md shadow-lg fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-[#10ac84]"}`}>
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={(itemsPerPage && filteredMenuItems.length < itemsPerPage) || false}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>

                {selectedItems.length > 0 && (
                    <>
                        <button
                            onClick={() => setSelectedItems([])}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                            Unselect All ({selectedItems.length})
                        </button>

                        <button
                            onClick={handleDeleteSelected}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Delete Selected
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default MenuItemList;
