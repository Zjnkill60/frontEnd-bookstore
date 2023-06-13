import { Modal} from 'antd';
import { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input , message } from 'antd';
import { handleCreateUser, handleDeleteBook, handleDeleteUser, handleUpdateUser } from '../../../api/api';



const ModalDeleteBook = (props) => {
  const {openModalCreate , setOpenModalCreate ,callGetAllBook , dataShowDrawerOnClick} = props

      const handleOK = async () => {
        let res = await handleDeleteBook(dataShowDrawerOnClick?._id)
        if(res && res.statusCode == 200) {
            setOpenModalCreate(false)
            await callGetAllBook()
             message.success("Delete success !")
        }else {
            message.error(res.message)
        }
      }
    return (
        <>
            <Modal   title ="Delete Book"   okText = "DELETE"
             onOk={handleOK} open = {openModalCreate} onCancel={() =>setOpenModalCreate(false)}
              okButtonProps={{style: {backgroundColor:'red'}}} >

                    <p>Are you sure to delete this book ?</p>
             </Modal>                 
        </>
    )
}

export default ModalDeleteBook