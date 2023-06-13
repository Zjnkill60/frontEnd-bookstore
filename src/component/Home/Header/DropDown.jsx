import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, message } from 'antd';
import { fetchLogOut } from '../../../api/api';
import { useDispatch } from 'react-redux';
import { doLogOut } from '../../../redux/account/accountSlice';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Account from '../../Account/Account';





const DropDown = (props) => {
    const {dataUserLogin,isModalOpen,setIsModalOpen} = props
  

    const dispatch = useDispatch()

    const handleLogOut = async () => {
      console.log(1)
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
    
    
    const items = [
      {
        key: '1',
        label: (
          <span onClick={() => setIsModalOpen(true)}>
             Thông tin tài khoản
          </span>
        ),
      },
      {
        key: '2',
        label: (
          <Link to = '/history'>
             Lịch sử đơn hàng
          </Link>
        ),
      },
      {
        key: '3',
        danger: true,
        label:<span onClick={handleLogOut}>Log Out</span>,
      },
    ];

    
        if(dataUserLogin?.user?.role == 'ADMIN') {
            items.unshift({
                key : '4',
                label: (
                    <Link to='/admin'> Trang quản trị</Link>
                  ),
            })
        }

        if(window.location.pathname.includes('admin')) {
          items.unshift({
            key : '5',
            label: (
                <Link to='/'> Homepage</Link>
              ),
        })
        }



  return ( 
    <>
         <Account dataUserLogin = {dataUserLogin} setIsModalOpen = {setIsModalOpen} isModalOpen = {isModalOpen}/>
         <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <span>{dataUserLogin?.user?.email}</span>
                <DownOutlined />
              </Space>
            </a>
        </Dropdown>
    </>
  )
}

  

export default DropDown;