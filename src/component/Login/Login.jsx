import { Link, useNavigate } from 'react-router-dom';
import '../Register/register.scss'
import { Button, Checkbox, Form, Input, Row , Col,Divider , message , Spin} from 'antd';
import { fetchLogin, fetchRegister } from '../../api/api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/account/accountSlice';


export default  function Login() {
    const [loading , setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (values) => {
        const { email , password } = values
        setLoading(true)
        let res = await fetchLogin( email ,password ,2000)
        if(res && res.statusCode == 201) {
            localStorage.setItem('access_token',res.data.access_token)
            dispatch(doLogin({
                user :res.data.user,
                password : password
            }))
            message.success("Login success !")
            navigate('/')
            setLoading(false)
        }else {
            message.error(res.message)
            setLoading(false)

        }
      
        console.log(res)
  
    };


    return (
        <Row className='container-register'>
           <Col xs={22} sm={18} md={15} lg={12} xl={10} className='main-register lg-padding'>
            <div className='title-register'>LOGIN</div>
           <Form
                
            
                onFinish={onFinish}
            
            >
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
                    <Input size='large' />
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
                    <Input.Password size='large' />
                    </Form.Item>

                    <Form.Item
                 
                    >
                    <Button  style={{width : '100%' , height: 45 , marginTop : 30 }} size='large' 
                        type={loading == false ? 'primary' : ''}  htmlType="submit">
                        {loading == true ? <Spin className='spin-login' size='large'/> : 'Login'}
                    </Button>
                    <Divider plain><span style={{color : '#aaaaaa'}}>Or</span></Divider>
                    <div style={{color : '#bdbdbd'}}>You don't have account ? <Link to = '/register'>Register now !</Link></div>
                    </Form.Item>
                </Form>
           </Col> 
        </Row>
    )
}