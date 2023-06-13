import { Link, useNavigate } from 'react-router-dom';
import './register.scss'
import { Button, Checkbox, Form, Input, Row , Col,Divider , message} from 'antd';
import { fetchRegister } from '../../api/api';






export default  function Register() {
    const navigate = useNavigate()
    const onFinish = async (values) => {
        const {fullName , email , password , phone} = values
        let res = await fetchRegister(fullName , email ,password ,phone)
        console.log(res)
        if(res && res.statusCode == 201) {
            message.success("Register account success !")
            navigate('/login')
        }
    };


    return (
        <Row className='container-register'>
           <Col xs={22} sm={18} md={15} lg={12} xl={10} className='main-register lg-padding'>
            <div className='title-register lg-text '>REGISTER</div>
           <Form
               
            
                onFinish={onFinish}
            
            >
                    <Form.Item
                    label="Full name"
                    labelCol={{span : 24}}
                    name="fullName"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your name!',
                        },
                    ]}
                    >
                    <Input size='large' />
                    </Form.Item>

                    <Form.Item
                    label="Email"
                    labelCol={{span : 24}}
                    name="email"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your email!',
                        },
                    ]}
                    >
                    <Input  size='large' />
                    </Form.Item>

                    <Form.Item
                    label="Password"
                    labelCol={{span : 24}}
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}
                    >
                    <Input.Password  size='large'  />
                    </Form.Item>


                    <Form.Item
                    label="Phone Number"
                    labelCol={{span : 24}}
                    name="phone"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your phone number!',
                        },
                    ]}
                    >
                    <Input  size='large' />
                    </Form.Item>


                    <Form.Item
                 
                    >
                    <Button  style={{width : '100%' , height: 45 , marginTop : 30 }} size='large' type="primary" htmlType="submit">
                        Register
                    </Button>
                    <Divider plain><span style={{color : '#aaaaaa'}}>Or</span></Divider>
                    <div style={{color : '#bdbdbd'}}>You already have an account ? <Link to = '/login'>Login now !</Link></div>
                    </Form.Item>
                </Form>
           </Col> 
        </Row>
    )
}