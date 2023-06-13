import TableAdmin from "../TableAdmin/Table"
import { Button, Col, Divider, Layout, Menu, Row, Space, theme ,Input,Breadcrumb , Modal} from 'antd';
import {
    RetweetOutlined,
    UploadOutlined,
    UserOutlined,
    AppstoreOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined
    
  } from '@ant-design/icons';
import './manageuser.scss'
import { useEffect, useState } from "react";
import { fetchGetAllAccount } from "../../../api/api";
import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import Modalmport from "./Modalmport";
import * as XLSX from "xlsx";


const ManageUser = () => {
    const [searchInput , setSearchInput] = useState(false)
    const [dataTable , setDataTable] = useState([])
    const [dataShowModalOnClick  , setDataShowModalOnClick] = useState({})
    const [openModalCreate , setOpenModalCreate] = useState(false)
    const [openModalUpdate , setOpenModalUpdate] = useState(false)
    const [openModalDelete , setOpenModalDelete] = useState(false)
    const [openModalImport , setOpenModalImport] = useState(false)
      
      const columns = [
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            sorter:true,
           
          },

        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          sorter:true,
          responsive: ['lg'],
        },
    
        {
          title: 'Full Name',
          dataIndex: 'fullName',
          key: 'fullname',
     
        },
        {
            title: 'Time Update',
            dataIndex: 'time',
            key: 'updatedAt',
            responsive: ['md'],
            sorter:true,
          },
       
          {
            title: 'Action',
            dataIndex: 'action',
            key: 'age',
          
          },

          
      ];



      const fetchAllAccount = async () => {
        let res = await fetchGetAllAccount()
        console.log('manage user'.res)
        if(res && res.statusCode == 200) {
            let dataAccount = res.data.map((item , index) => {
                return {
                    key : index,
                    id : item._id,
                    email : item.email,
                    fullName : item.fullName,
                    time : item.updatedAt,
                    phone : item.phone,
                    action : <Row gutter={[10,5]}  key={index}>
                       <Col  xs={24} sm={12} md={12} lg={12} xl={12}>    
                            <Button onClick={() => handleUpdate(item,index)}  size="small"  type="primary" style={{backgroundColor :'orange' , width:'100%'}} ><EditOutlined /></Button>
                       </Col>
                       <Col  xs={24} sm={12} md={123} lg={12} xl={12}>
                             <Button onClick={() => handleDelete(item,index)} size="small"  style={{width : '100%'}}  type="primary" danger><DeleteOutlined /></Button>
                       </Col>
                    </Row>
                }
            })
            setDataTable(dataAccount)
        }
      }

      const handleUpdate = (item,index) => {
        setOpenModalUpdate(true)
        setDataShowModalOnClick(item)
      }

      const handleDelete = (item) => {
        setOpenModalDelete(true)
        setDataShowModalOnClick(item)
      }

      const handleInput = async (e) => {
        let res = await fetchGetAllAccount()
        if(res && res.statusCode == 200) {
            let dataAccountInput = res.data.filter((item , index) => {
                return item.phone.includes(e.target.value)     
            })
            let dataTableConfim = dataAccountInput.map((item,index) => {
                return {
                    key : index,
                    id : item._id,
                    email : item.email,
                    fullName : item.fullName,
                    time : item.updatedAt,
                    phone : item.phone,
                    action : <Row gutter={[10,5]}  key={index}>
                       <Col  xs={24} sm={12} md={12} lg={12} xl={12}>    
                            <Button onClick={() => handleUpdate(item,index)}  size="small"  type="primary" style={{backgroundColor :'orange' , width:'100%'}} ><EditOutlined /></Button>
                       </Col>
                       <Col  xs={24} sm={12} md={123} lg={12} xl={12}>
                             <Button onClick={() => handleDelete(item,index)} size="small"  style={{width : '100%'}}  type="primary" danger><DeleteOutlined /></Button>
                       </Col>
                    </Row>
                }
            })
            setDataTable(dataTableConfim)
        }
    }

     const handleExport = async () => {
        let res = await fetchGetAllAccount()
        if(res && res.data) {
            let dataExport = res.data.map(item => {
                return {
                    phone : item.phone,
                    fullName : item.fullName,
                    email : item.email    
                }
            })

            if(dataExport) {
                const worksheet = XLSX.utils.json_to_sheet(dataExport)
                const workbook = XLSX.utils.book_new()
                XLSX.utils.book_append_sheet(workbook,worksheet,"Sheet1")
              
                XLSX.writeFile(workbook,"DataSheet.xlsx")
            }
        }
     }
        
       
      useEffect(() => {
        fetchAllAccount()
      },[])


    
    return (
        <>
            <Breadcrumb
            className="lg-marginbot-header"
          style={{
            marginBottom: 100,
          }}
        >
          <Breadcrumb.Item >Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>Manage Users</Breadcrumb.Item>
        </Breadcrumb>
            <Row className="lg-marginbot" gutter={[20,30]} style={{display :'flex' , alignItems : 'center' , justifyContent :'space-between' , marginBottom : 50}}>
                <Col xs={0} sm={0} md={24} lg={10} xl={10}  >
                 
                    <Input onChange={(e) => handleInput(e)} size="large" type="number" addonBefore="SDT" placeholder="Find user by phone number " allowClear />
                 
                </Col>

                <Col xs={0} sm={15} md={0} lg={0} xl={0}  >
                 
                 <Input onChange={(e) => handleInput(e)}  size="default" type="number" addonBefore="SDT" placeholder="Find user by phone number " allowClear />
              
                </Col>

                <Col xs={3} sm={0} md={0} lg={0} xl={0}  >
                     <Button onClick={() => setSearchInput(!searchInput)}  ><SearchOutlined /></Button>
                 {/* <Input  size="default" type="number" addonBefore="SDT" placeholder="...... " allowClear /> */}
              
                </Col>
                        {searchInput == true ? 
                        <Col xs={19} sm={0} md={0} lg={0} xl={0} >
                            <Input onChange={(e) => handleInput(e)}  size="default" type="number" addonBefore="SDT" 
                        placeholder="find user by phone number " allowClear />
                          </Col> : null}

                <Col className="md-marginleft ld-marginleft"  >
                    <Row  >
                        <Button onClick={() => setOpenModalCreate(true)}   className="md-button" style={{margin :'0 5px'}} type="primary" ><UserOutlined/>Add New User</Button>
                        <Button onClick={() => setOpenModalImport(true)} className="hide-manageuser" style={{margin :'0 5px'}} type="primary" ><UploadOutlined/>Import</Button>
                        <Button onClick={() => handleExport()}  className="hide-manageuser" style={{margin :'0 5px'}} type="primary" ><AppstoreOutlined/>Export</Button>
                        <Button onClick={() => fetchAllAccount()}  style={{margin :'0 5px'}} shape="circle" ><RetweetOutlined /></Button>
                    </Row>
                </Col>
            </Row>

            <TableAdmin setDataTable = {setDataTable} dataSource = {dataTable} columns = {columns}/>
            <ModalCreateUser fetchAllAccount = {fetchAllAccount} openModalCreate = {openModalCreate}  setOpenModalCreate = {setOpenModalCreate}/>
            <ModalUpdateUser dataShowModalOnClick= {dataShowModalOnClick} fetchAllAccount = {fetchAllAccount} openModalCreate = {openModalUpdate}  setOpenModalCreate = {setOpenModalUpdate}/>
            <ModalDeleteUser dataShowModalOnClick= {dataShowModalOnClick} fetchAllAccount = {fetchAllAccount} openModalCreate = {openModalDelete}  setOpenModalCreate = {setOpenModalDelete}/>
            <Modalmport dataShowModalOnClick= {dataShowModalOnClick} fetchAllAccount = {fetchAllAccount} openModalCreate = {openModalImport}  setOpenModalCreate = {setOpenModalImport}/>

        </>
    )
  }


export default ManageUser