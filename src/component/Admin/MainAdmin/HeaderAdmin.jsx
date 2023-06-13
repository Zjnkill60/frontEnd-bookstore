import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined
  } from '@ant-design/icons';
  import { Button, Col, Divider, Layout, Menu, Row, Space, theme ,Input} from 'antd';
  import { useState } from 'react';
  import '../AdminPage.scss'
import DropDown from '../../Home/Header/DropDown';
import { Link, useNavigate } from 'react-router-dom';


  const { Header, Sider, Content } = Layout;



   
  const AdminPage = (props) => {
    const {dataUserLogin} = props
    const navigate = useNavigate()
    const indexSelected = localStorage.getItem('selectedKey')
    const items = [
        {
          label: 'Menu',
          key: 'SubMenu',
          icon: <MenuFoldOutlined  />,
          children: [
            {
              type: 'group',
              label: <div className='item-menu' onClick={() =>navigate('/admin') }> Dashboard</div>,
             
            },
            {
              type: 'group',
              label: <div className='item-menu' onClick={() =>navigate('/admin/manage-users') }> Manage Users</div>,
             
            },
            {
              type: 'group',
              label:<div className='item-menu' onClick={() =>navigate('/admin/manage-books') } to='/admin/manage-books'> Manage Books</div>,
             
            },
            {
                type: 'group',
                label: <div className='item-menu'  onClick={() =>navigate('/admin/manage-order') } to='/admin/manage-order'> Manage Orders</div>,
               
            },
          ],
        },
        {   
           
            key :'dropdown',
            label :   <div className='dropdown-headeradmin'><DropDown/></div>
        }
      
      ];


    const [collapsed, setCollapsed] = useState(false);
    const [hideSideBar , setHideSideBar] = useState(false)
    const {
      token: { colorBgContainer },
    } = theme.useToken();

    return (
      <Layout className='admin-container'>
        <Sider   
            breakpoint="md"
            collapsedWidth="50"
            className={hideSideBar == true ? 'hide' : null}
            onBreakpoint={(broken) => {
                broken == true ? setHideSideBar(true) : setHideSideBar(false)
            }}
            trigger={null} collapsible collapsed={collapsed}>
          {collapsed == false ? <div className="demo-logo-vertical" > {dataUserLogin?.user?.email} </div> : <></> }
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={indexSelected ? [indexSelected] : ['1']}
            onClick={(item) => localStorage.setItem('selectedKey',item.key)}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 
                    <Link to='/admin'>Dashboard</Link>
          

              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: <Link to='/admin/manage-users'>Manage Users</Link>,
              },
              {
                key: '3',
                icon: <MailOutlined />,
                label: <Link to='/admin/manage-books'>Manage Books</Link>,
              },
              {
                key: '4',
                icon: <UploadOutlined />,
                label: <Link to='/admin/manage-order'>Manage Orders</Link>,
              },
                    ]}
          />
        </Sider>

        <Layout>
          <Header
            style={{
                position:'fixed',
                width :'100%',
                backgroundColor :'#fafafa',
                zIndex :100,
                padding: 0,
                background: colorBgContainer,
            }} 
          >
              
             <Menu   className={hideSideBar == true ? 'menu-header-admin' : 'hide' } theme="dark" mode="horizontal"  items={items} />
             
           <Row style={{display: 'flex' , alignItems :'center' }}>
                <Col>
                     <Button
                        className={hideSideBar == true ? 'hide' : null}
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                    }}
                    
                    />
                </Col>

                <Col className={hideSideBar == true ? 'hide' : null }  style={collapsed == true ? {position :'absolute' , right : 100} :
                    {position :'absolute' , right : 250}}>
                    <div ><DropDown/></div>
                </Col>
           </Row>


          </Header>
          <Content
            style={{
              margin: '60px 10px 20px 10px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              
            
            }}
          >
            
                 {props.children}
          </Content>
        </Layout>
      </Layout>
    );
  };
  export default AdminPage;