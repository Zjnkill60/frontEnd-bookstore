import { Modal} from 'antd';
import { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input , message } from 'antd';
import { handleCreateUser, handleDeleteUser, handleUpdateUser } from '../../../api/api';



const ModalDeleteUser = (props) => {
    const {openModalCreate , setOpenModalCreate ,fetchAllAccount ,dataShowModalOnClick} = props

      const handleOK = async () => {
        let res = await handleDeleteUser(dataShowModalOnClick?._id)
        if(res && res.statusCode == 200) {
            setOpenModalCreate(false)
            await fetchAllAccount()
             message.success("Delete success !")
        }else {
            message.error(res.message)
        }
      }
    return (
        <>
            <Modal   title ="Delete User"   okText = "DELETE"
             onOk={handleOK} open = {openModalCreate} onCancel={() =>setOpenModalCreate(false)}
              okButtonProps={{style: {backgroundColor:'red'}}} >

                    <p>Are you sure to delete this user ?</p>
             </Modal>                 
        </>
    )
}

export default ModalDeleteUser