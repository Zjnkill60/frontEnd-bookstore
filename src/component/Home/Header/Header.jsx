import { Row,Col, Input, Space, Button, Drawer , Avatar, message } from "antd"
import {SlackOutlined,MenuFoldOutlined} from '@ant-design/icons'
import './header.scss'
import Cart from "./Cart"
import { useDispatch, useSelector } from "react-redux"
import DropDown from "./DropDown"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DrawerApp from "./Drawer"
import {baseURL} from '../../../baseURL'


const Header = () => {
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const dataUserLogin = useSelector(state => state.account)
    const onSearch = (value) => console.log(value);
    const { Search } = Input;

    return (
     <>
      <Row className="header-homepage">
            <Col onClick={() => navigate('/')} xs={7} sm={3} md={7} lg={7} xl={6} className = "title-header hide-xxs">
                 <SlackOutlined className="icon-header " spin = {true} rotate={90}/>
                 <span className="hide-header">Book Store</span>
            </Col>

            <Col xs={15} sm={7} md={7} lg={8} xl={8} className="input-header ">
                  <Search
                    placeholder="Search"
                    onSearch={onSearch}
                    size="large"
                 
                    />
          
            </Col>

            <Col xs={0} sm={4} md={2} lg={3} xl={3} className="cart-header">
                 <Cart/>
            </Col>

            {dataUserLogin.isAuthenticated == true ?
             <Col xs={0} sm={9} md={7} lg={5} xl={4} xxl={3} className="dropdown">
                <Avatar src = {`${baseURL}images/avatar/${dataUserLogin.user.avatar}`} style={{marginRight : 15}} size={40} icon={<MenuFoldOutlined />} />
                <DropDown isModalOpen = {isModalOpen} setIsModalOpen = {setIsModalOpen} dataUserLogin = {dataUserLogin}/>
            </Col> :  

            <Col xs={0} sm={7} md={6} lg={5} xl={3} className="btn-header">
                <Space> 
                    <Button onClick={() => navigate('/login')} size="large">Login</Button>
                    <Button onClick={() => navigate('/register')} style={{marginLeft : 15}} size="large" type="primary">Sign up</Button>
                </Space>
            </Col>}
           
           <Col xs={2} sm={0} md={0} lg={0} xl={0} className="menu-header">
                  <MenuFoldOutlined onClick={() => setOpen(true)} style={{ fontSize : 29 , color: '#1677ff'}} />
           </Col>

           
      </Row>
      <DrawerApp setIsModalOpen = {setIsModalOpen} isModalOpen = {isModalOpen} dataUserLogin = {dataUserLogin} open = {open} setOpen = {setOpen}/>
     </>
    )
}

export default Header