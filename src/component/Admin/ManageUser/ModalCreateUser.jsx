import { Modal} from 'antd';
import { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input , message } from 'antd';
import { handleCreateUser } from '../../../api/api';



const ModalCreateUser = (props) => {
    const [form] = Form.useForm()
    const {openModalCreate , setOpenModalCreate ,fetchAllAccount} = props

    const onFinish = async (values) => {
        const {username  ,email , password , phone} = values
        let res =  await handleCreateUser(username,password,email,phone)
        if(res && res.statusCode == 201) {
            await fetchAllAccount()
            message.success("Create new user success !")
            setOpenModalCreate(false)
            form.setFieldsValue({
                "username" : "",
                "email" :"",
                "password" : "",
                "phone" :""
        })
        }else {
            message.error(res.message)
        }
      };
    return (
        <>
            <Modal   title ="Create New User" onOk={() => form.submit()} open = {openModalCreate} onCancel={() =>setOpenModalCreate(false)} >
                         <Form
                                form={form}
                                name="basic"
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
                                labelCol={{span : 24}}
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input your password!',
                                    },
                                ]}
                                >
                                <Input.Password />
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

export default ModalCreateUser