import useAlert from "@/common/components/Display/Alert";
import { database } from "@/config/firebase";
import { dummyData } from "@/data/constant/dummy";
import { TMenuItem } from "@/data/types/menu.types";
import { endAt, get, limitToFirst, limitToLast, onValue, orderByKey, push, query, ref, remove, set, startAt } from "firebase/database";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAutoScrollToElement from "./useAutoScrollToElement";



const useMenuItems = () => {
    const [menuItems, setMenuItems] = useState<TMenuItem[]>([]);
    const [editingItem, setEditingItem] = useState<TMenuItem | null>(null);
    const [openForm, setOpenForm] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [firstKey, setFirstKey] = useState<string | null>(null);
    const [lastKey, setLastKey] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const useFormObj = useForm<TMenuItem>();
    const [totalItems, setTotalItems] = useState<number>(0);

    const ITEMS_PER_PAGE = 10; // Number of items to display per page

    const { renderNotification, executeAlert } = useAlert()

    // Scroll to the notification when it appears
    const { scrollToById } = useAutoScrollToElement('form-item');
    const { scrollToById: scrollToAlert } = useAutoScrollToElement('custom-alert');

    useEffect(() => {
        fetchMenuItems();
    }, [currentPage]);

    const fetchMenuItems = () => {
        setLoading(true);
        const menuRef = ref(database, "menuItems");

        let menuQuery;
        if (currentPage === 1) {
            menuQuery = query(menuRef, orderByKey(), limitToFirst(ITEMS_PER_PAGE + 1));
        } else if (currentPage > 1 && lastKey) {
            menuQuery = query(menuRef, orderByKey(), startAt(lastKey), limitToFirst(ITEMS_PER_PAGE + 1));
        } else if (currentPage < 1 && firstKey) {
            menuQuery = query(menuRef, orderByKey(), endAt(firstKey), limitToLast(ITEMS_PER_PAGE + 1));
        }

        if (!menuQuery) {
            return setMenuItems([])
        }

        onValue(menuQuery, (snapshot) => {
            const data = snapshot.val();
            const items = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];

            if (items.length > ITEMS_PER_PAGE) {
                if (currentPage > 0) {
                    setLastKey(items[ITEMS_PER_PAGE - 1].id);
                    setFirstKey(items[0].id);
                    items.pop(); // Remove the extra item for next page
                } else {
                    setLastKey(items[ITEMS_PER_PAGE].id);
                    items.shift(); // Remove the extra item for previous page
                }
            } else {
                setLastKey(null);
                setFirstKey(null);
            }

            setMenuItems(items);
            setLoading(false);
            fetchTotalItems();
        });
    };

    const fetchTotalItems = async () => {
        const menuRef = ref(database, "menuItems");
        const snapshot = await get(menuRef);
        const data = snapshot.val();
        const totalCount = data ? Object.keys(data).length : 0;
        setTotalItems(totalCount);
    };

    const handleEdit = (item: TMenuItem) => {
        setOpenForm(true)
        setEditingItem(item);
        useFormObj.reset(item);
        scrollToById()
    };

    const handleDelete = (id: string) => {
        executeAlert({
            type: 'confirmation',
            message: `Are you sure want to delete item ${id}`,
            duration: 5000,
            onConfirm: () => {
                if (database) {
                    const itemRef = ref(database, `menuItems/${id}`);
                    remove(itemRef).then((res) => {
                        fetchMenuItems();
                        executeAlert({
                            type: 'success',
                            message: 'Item deleted successfully',
                            duration: 5000,
                        })
                    })
                }
            }
        })
        scrollToAlert()
    };

    const handleDeleteMultiple = async (itemIds: string[]) => {
        const promises = itemIds.map(id => {
            return remove(ref(database, `menuItems/${id}`));
        })
        await Promise.all(promises).then(() => {
            executeAlert({
                type: 'success',
                message: `${itemIds.length} items deleted.`,
                duration: 5000,
            })
            fetchMenuItems();
        }).catch(error => {
            executeAlert({
                type: 'error',
                message: `${itemIds.length} deleting items error.`,
                duration: 5000,
            })
        })
    }

    const deleteAllRecords = async () => {
        const pathRef = ref(database, 'menuItems');

        await remove(pathRef);
        console.log('All records deleted');
    };

    const insertDummyRecords = async () => {
        const menuRef = ref(database, 'menuItems');
        const insertPromises = dummyData.map((item) => {
            const newItemRef = push(menuRef);
            const { id, ...itemWithoutId } = item; // remove the id field
            return set(newItemRef, itemWithoutId);
        });

        await Promise.all(insertPromises);
        console.log('20 dummy records inserted');
    };


    return {
        handleDelete,
        handleDeleteMultiple,
        handleEdit,
        fetchMenuItems,
        fetchTotalItems,
        menuItems,
        setMenuItems,
        currentPage,
        setCurrentPage,
        loading,
        setLoading,
        totalItems,
        setTotalItems,
        editingItem,
        setEditingItem,
        ITEMS_PER_PAGE,
        renderNotification,
        openForm,
        setOpenForm,
        executeAlert,
        deleteAllRecords,
        insertDummyRecords,
        ...useFormObj
    }
};

export default useMenuItems;
