import { Modal} from 'antd';
import { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input , message } from 'antd';
import { handleCreateUser, handleUpdateUser } from '../../../api/api';



const ModalUpdateUser = (props) => {
    const [form] = Form.useForm()
    const {openModalCreate , setOpenModalCreate ,fetchAllAccount ,dataShowModalOnClick} = props

    const onFinish = async (values) => {
        const {username  ,email  , phone} = values
        let res =  await handleUpdateUser(dataShowModalOnClick?._id,username,email,phone)
        if(res && res.statusCode == 200) {
            await fetchAllAccount()
            message.success("Update  user success !")
            setOpenModalCreate(false)
        }else {
            message.error(res.message)
        }
      };

      useEffect(() => {
            form.setFieldsValue({
                    "username" : dataShowModalOnClick?.fullName,
                    "email" :dataShowModalOnClick?.email,
                    "phone" :dataShowModalOnClick?.phone  
            })
      },[dataShowModalOnClick])

    return (
        <>
            <Modal   title ="Update User" onOk={() => form.submit()} open = {openModalCreate} onCancel={() =>setOpenModalCreate(false)} >
                         <Form
                                form={form}
                                name="update"
                                onFinish={onFinish}
                                style={{marginTop : 25}}
                               
                                >

                                <Form.Item
                                label="Username"
                                name="username"
                                labelCol={{span : 24}}
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input name!',
                                    },
                                ]}
                                >
                                <Input />
                                </Form.Item>

                                <Form.Item
                                label="Email"
                                name="email"
                                labelCol={{span : 24}}
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input email!',
                                    },
                                ]}
                                >
                                <Input />
                                </Form.Item>

                                <Form.Item
                                label="Phone Number"
                                name="phone"
                                labelCol={{span : 24}}
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input phone number!',
                                    },
                                ]}
                                >
                                <Input />
                                </Form.Item>

                            

                            
                    </Form>
            </Modal>
        </>
    )
}

export default ModalUpdateUser