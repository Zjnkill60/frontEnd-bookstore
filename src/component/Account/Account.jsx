import { Avatar, Button, Col, Modal, Row , Form , Input} from 'antd';
import { baseURL } from '../../baseURL';
import { useEffect, useState } from 'react';
import './account.scss'

const Account = (props) => {
    const {isModalOpen , setIsModalOpen,dataUserLogin} = props
    const [form] = Form.useForm()
    const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };

      useEffect(() => {
        form.setFieldsValue({
            username : dataUserLogin?.user.fullName,
            email : dataUserLogin?.user.email,
            phone :dataUserLogin?.user.phone
        })
      },[])
         

      return (
        <>
       
          <Modal width={700} title="Thông Tin Tài Khoản" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
             <Row className='account-container-row' gutter={[100 , 20]} style={{marginTop : 50 , padding : '20px 30px'}}>
                <Col xs={24} sm={24} md={10} lg={10} xl={10}
                 style={{display :'grid' , placeItems :'center' ,  borderRadius :5}}>
                  <Avatar src = {`${baseURL}images/avatar/${dataUserLogin?.user?.avatar}`} style={{marginRight : 15}} size={100}  />
                </Col>

                <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                <Form
                                name="account"
                                form={form}
                            >
                                <Row gutter={10}>
                                    <Col span={24}>
                                            <Form.Item
                                        labelCol={{span : 24}}
                                        label ="Tên"
                                        name="username"
                                    
                                        >
                                        <Input size='large' disabled/>
                                        </Form.Item>
                                    </Col>

                                    <Col span={24}>
                                            <Form.Item 
                                             labelCol={{span : 24}}
                                             label ="Email"
                                                name="email"
                                            
                                        >
                                        <Input disabled  size="large" />
                                        </Form.Item>
                                    </Col>

                                    <Col span={24}>
                                            <Form.Item
                                             labelCol={{span : 24}}
                                     label ="SĐT"
                                        name="phone"
                                 
                                        >
                                        <Input disabled className="input-form-checkout" size="large" />
                                        </Form.Item>
                                    </Col>
                                  
                                </Row>
                                

                        

                            
                            </Form>
                    

                 
                </Col>
             </Row>
          </Modal>
        </>
      );
}

export default Account