import Loading from "@/common/components/Display/Loading";
import Button from "@/common/components/Inputs/Button";
import AddItemForm from "@/common/components/MenuItem/AddItemForm";
import MenuItemList from "@/common/components/MenuItem/List";
import MerchantView from "@/common/components/views/merchant.view";
import { database, } from "@/config/firebase";
import { TMenuItem } from "@/data/types/menu.types";
import { NextPageWithLayout } from "@/data/types/next-page-with-layout.types";
import useMenuItems from "@/hooks/useMenuItems";
import { push, ref, set, update } from 'firebase/database';
import { useEffect, useMemo } from "react";
import { SubmitHandler } from "react-hook-form";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
export interface HomePageProps {

}

const HomePage: NextPageWithLayout<HomePageProps> = () => {
  const {
    fetchMenuItems,
    reset,
    handleSubmit,
    register,
    formState,
    totalItems,
    menuItems,
    handleDelete,
    handleEdit,
    handleDeleteMultiple,
    setCurrentPage,
    setEditingItem,
    openForm,
    setOpenForm,
    editingItem,
    renderNotification,
    executeAlert,
    loading,
    insertDummyRecords,
    deleteAllRecords
  } = useMenuItems()

  const ITEMS_PER_PAGE = 10; // Number of items to display per page

  const onSubmit: SubmitHandler<TMenuItem> = (data) => {
    if (!database) return
    delete data['id']
    if (editingItem) {
      const itemRef = ref(database, `menuItems/${editingItem.id}`);
      update(itemRef, data).then(() => {
        fetchMenuItems();
        setEditingItem(null);
        reset({
          amountInStock: 0,
          category: '',
          cost: 0,
          name: '',
          options: '',
          price: 0
        })
        executeAlert({
          type: 'success',
          message: 'Item updated successfully',
          duration: 5000,
        })
      });
    } else {
      const menuRef = ref(database, 'menuItems');
      const newItemRef = push(menuRef);

      set(newItemRef, data).then(() => {
        fetchMenuItems();
        reset({
          amountInStock: 0,
          category: '',
          cost: 0,
          name: '',
          options: '',
          price: 0
        })
        executeAlert({
          type: 'success',
          message: 'Item added successfully',
          duration: 5000,
        })
      });
    }
  };

  const renderFormItem = useMemo(() => {
    return <div id="form-item" className={`overflow-hidden transition-all  rounded-md  ${openForm ? 'max-h-[1000px] p-5 bg-gray-300 border-none' : 'max-h-[50px]'}`}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">Menu Management</h1>
        <Button
          btnType="link"
          size="sm"
          buttonAttributes={{
            onClick: () => {
              if (openForm) {
                setEditingItem(null)
                reset({
                  amountInStock: 0,
                  category: '',
                  cost: 0,
                  name: '',
                  options: '',
                  price: 0
                })
              }
              setOpenForm(!openForm)
            }
          }}
        >
          {openForm ? <FaLongArrowAltDown /> : <FaLongArrowAltUp />}
        </Button>
      </div>
      <AddItemForm
        editingItem={editingItem}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={formState?.errors}
        onClear={() => {
          setEditingItem(null)
          reset({
            amountInStock: 0,
            category: '',
            cost: 0,
            name: '',
            options: '',
            price: 0
          })
        }}
      />
    </div>
  }, [editingItem, openForm, formState, handleSubmit, register, reset])

  useEffect(() => {
    const generateDummy = async () => {
      alert("INSERTING DUMMIES")
      await deleteAllRecords()
      await insertDummyRecords()
    }

    // generateDummy()
  }, [])

  return (
    <div className="container mx-auto p-4">
      {renderNotification}
      {renderFormItem}
      <br />
      <hr />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Menu Items ({totalItems})</h2>
        {loading ? <Loading size={100} data-aos="zoom-in" /> : <>
          <MenuItemList
            menuItems={menuItems}
            onClickDelete={handleDelete}
            onClickEdit={handleEdit}
            onChangePage={(page) => setCurrentPage(page)}
            itemsPerPage={ITEMS_PER_PAGE}
            onDeleteMultiple={handleDeleteMultiple}
          />
        </>}
      </div>
    </div>
  );
};

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <MerchantView>{page}</MerchantView>
};

export default HomePage;

