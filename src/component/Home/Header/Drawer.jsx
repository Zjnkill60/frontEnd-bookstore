import { Button, Drawer, Row,Col, Divider, message } from 'antd';
import { useState } from 'react';
import { UserOutlined,HistoryOutlined,LogoutOutlined,LoginOutlined,EditOutlined,AuditOutlined,FacebookOutlined,PhoneOutlined} from '@ant-design/icons';
import { fetchLogOut } from '../../../api/api';
import { useDispatch } from 'react-redux';
import { doLogOut } from '../../../redux/account/accountSlice';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';

const DrawerApp = (props) => {
    const {open , setOpen ,dataUserLogin ,setIsModalOpen , isModalOpen} = props
    const dispatch = useDispatch()
    const navigate = useNavigate()

  const onClose = () => {
    setOpen(false);
  };

  const handleLogOut = async () => {
   
    let res = await fetchLogOut()
    if(res && res.statusCode == 201) {
        message.success('Log out thành công ! ')    
        dispatch(doLogOut())
        localStorage.setItem('access_token',"")
    }else {
        message.error(res.message)
    }
    console.log(res)
 }

 const handleClickInfo =() => {
    setIsModalOpen(true)
    setOpen(false)
 }

 const handleClickHistory = () => {
    setOpen(false)
    navigate('/history')
 }

  return (
    <>
   
      
    <Drawer width={'90%'} title="Book Store" placement="right" onClose={onClose} open={open}>
        {dataUserLogin.isAuthenticated == true ? 

        <>
            {
                dataUserLogin.user.role == 'ADMIN' ? 
                <>
                <Row onClick={() => navigate('/admin')} className='item-drawer'>
                <Col span={4}>
                    <AuditOutlined  className='icon-drawer' />
                    
                </Col>
                <Col  span={20}>
                    <div className='option-features-drawer'>Trang quản trị viên</div>
                </Col>
                </Row>
                <Divider/> </>: <></>

            }

            <Row onClick={() => navigate('/order')} className='item-drawer'>
                <Col span={4}>
                    <Cart className='icon-drawer' />
                    
                </Col>
                <Col span={20}>
                    <div className='option-features-drawer'>Xem Giỏ Hàng</div>
                </Col>
            </Row>
            <Divider/>
            
            <Row onClick={() => handleClickInfo()} className='item-drawer'>
                <Col span={4}>
                    <UserOutlined className='icon-drawer' />
                    
                </Col>
                <Col span={20}>
                    <div className='option-features-drawer'>Thông tin cá nhân</div>
                </Col>
            </Row>
            <Divider/>

         

            <Row className='item-drawer' onClick={() => handleClickHistory()}>
                <Col span={4}>
                    <HistoryOutlined className='icon-drawer'/>
                    
                </Col>
                <Col span={20}>
                    <div className='option-features-drawer'>Lịch sử mua hàng</div>
                </Col>
          </Row >
            <Divider/>

            <Row onClick={handleLogOut} className='item-drawer'>
                <Col span={4}>
                    <LogoutOutlined  className='icon-drawer log-out'/>
               
                </Col>
                <Col  span={20}>
                    <div  className='option-features-drawer log-out'>Đổi tài khoản</div>
                </Col>
            </Row>
        </> :

        <>
            <Row onClick={() => navigate('/login')} className='item-drawer'>
                <Col span={4}>
               
                    <LoginOutlined className='icon-drawer'/>
                    
                </Col>
                <Col span={20}>
                    <div className='option-features-drawer'>Đăng nhập</div>
                </Col>
            </Row>
            <Divider/>
            <Row onClick={() => navigate('/register')} className='item-drawer'>
                <Col span={4}>
          
                    <EditOutlined className='icon-drawer'/>
                     
                </Col>
                <Col span={20}>
                    <div className='option-features-drawer'>Đăng kí</div>
                </Col>
         </Row>
        </>
     }
       
       <Row gutter={15} className='contact-drawer'>
            
            <Col span={12}>
                
                <Button type='primary' style={{width : '100%'}} size='large'><FacebookOutlined />Facebook</Button>
            </Col>
            <Col span={12}>
                 
                <Button style={{width : '100%' , backgroundColor : '#77C750' ,color : '#fff'}} size='large'><PhoneOutlined />SMS</Button>
            </Col>
       </Row>
        
    </Drawer>
    </>
  );
};
export default DrawerApp;