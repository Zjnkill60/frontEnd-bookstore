import React, { useEffect, useState } from 'react';
import './App.scss';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
  Link
} from "react-router-dom";
import Header from './component/Home/Header/Header';
import Footer from './component/Footer/Footer';
import HomeContent from './component/Home/HomeContent/HomeContent';
import HeaderAdmin from './component/Admin/MainAdmin/HeaderAdmin';
import Page404 from './component/Page404/Page404';
import Dashboard from './component/Admin/Dashboard/Dashboard';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import { fetchAccount, fetchLogin, handleRefreshToken } from './api/api';
import { useDispatch, useSelector } from 'react-redux';
import Page403 from './component/Page403/Page403';
import ProtectedRouter from './component/ProtectedRouter/ProtectedRouter';
import { doLogOut, doLogin } from './redux/account/accountSlice';
import { Layout, message } from 'antd';
import ManageUser from './component/Admin/ManageUser/ManageUser';
import ManageBook from './component/Admin/ManageBook/ManageBook';
import ManageOrder from './component/Admin/ManageOrder/ManageOrder';
import DetailBook from './component/Home/DetailBook/DetailBook';
import Order from './component/OrderPage/Order';
import CheckOutPage from './component/OrderPage/CheckOutPage';
import History from './component/OrderPage/History';






export default function App() {
  const dispatch = useDispatch()
 
const LayOutHomePage = () => (
  <Layout className='layout-hompage'>
     <Header/>
     
 
     <Outlet/>
    <Footer/>
  </Layout>
)

const LayOutOrderPage = () => (
  <Layout className='layout-hompage'>
     <Header/>
     
 
     <Outlet/>

  </Layout>
)

const LayOutAdminPage = () => {
  if(dataUserLogin.user.role == 'ADMIN') {
    return (
        <Layout className='layout-admin'>
          <HeaderAdmin dataUserLogin = {dataUserLogin} className ='admin-container'>
             <Outlet/>
          </HeaderAdmin>
         
      
       </Layout>
    )
  }else {
    return  <Outlet/>

  }
 
}


const dataUserLogin = useSelector(state => state.account)


const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOutHomePage/>,
    errorElement : <Page404/>,
    children : [
      {
        index : true,
        element : <HomeContent/>
      },
      {
        path: "book/:slug",
        element:  <DetailBook/>,
      },
      {
        path : "history",
        element : <History/>
      }
      
    ]
  },
  {
    path: "/admin",
    element: <LayOutAdminPage/>,
    errorElement : <Page404/>,
    children : [
      {
        index : true,
        element :<ProtectedRouter dataUserLogin = {dataUserLogin}><Dashboard/></ProtectedRouter> 
      },
      {
        path: "manage-users",
        element:  <ManageUser/>,
      },
      {
        path: "manage-books",
        element:  <ManageBook/>,
      },
      {
        path: "manage-order",
        element:  <ManageOrder/>,
      }

    
    ]
  },
  {
    path: "/order",
    element: <LayOutOrderPage/>,
    errorElement : <Page404/>,
    children:[{
      index : true,
      element : <Order/>
    },
    {
      path : "checkout",
      element : <CheckOutPage/>
    }]
  },
  {
    path: "/login",
    element: <Login/>,
    errorElement : <Page404/>,
   
  },
  {
    path: "/register",
    element: <Register/>,
    errorElement : <Page404/>,
  },
]);



const fetAccountUser = async () => {
  if(window.location.pathname == '/login' || window.location.pathname == '/register' || dataUserLogin.isAuthenticated == false ) {
    return
  }
  let res = await fetchAccount()
  if(res && res.statusCode == 200) {
     dispatch(doLogin({user : res.data.user}))
  }else {
    message.error("Phiên truy cập hết hạn ! Vui lòng đăng nhập lại")
    dispatch(doLogOut())
    localStorage.setItem('access_token',"")
    
  }
}
useEffect(() => {
  fetAccountUser()
},[])


  return (
    <RouterProvider router={router} />
  );
}
