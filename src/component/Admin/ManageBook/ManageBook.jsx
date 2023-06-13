import TableAdmin from "../TableAdmin/Table"
import { Button, Col, Divider, Layout, Menu, Row, Space, theme ,Input,Breadcrumb} from 'antd';
import {
    RetweetOutlined,
    UploadOutlined,
    UserOutlined,
    AppstoreOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined
    
  } from '@ant-design/icons';
import '../ManageUser/manageuser.scss'
import { useEffect, useState } from "react";
import { fetchGetAllBook, fetchGetCategory } from "../../../api/api";
import DrawerApp from "./DrawerBook";
import ModalCreateBook from "./ModalCreateBook";
import ModalUpdateBook from "./ModalUpdateBook";
import ModalDeleteBook from "./ModalDeleteBook";



const ManageBook = () => {
    const [searchInput , setSearchInput] = useState(false)
    const [dataTable , setDataTable] = useState([])
    const [dataShowDrawerOnClick , setDataShowDrawerOnClick] = useState({})
    const [dataCategory , setDataCategory] = useState([])
    const [openDrawer , setOpenDrawer] = useState(false)
    const [openModalCreate , setOpenModalCreate] = useState(false)
    const [openModalUpdate , setOpenModalUpdate] = useState(false)
    const [openModalDelete , setOpenModalDelete] = useState(false)
    const [openModalImport , setOpenModalImport] = useState(false)
      
    const columns = [
        {
            title: 'Tên Sách',
            dataIndex: 'mainText',
            key: 'mainText',
            sorter:true,
           
          },

        {
          title: 'Thể Loại',
          dataIndex: 'category',
          key: 'category',
          sorter:true,
          responsive: ['lg'],
        },
    
        {
          title: 'Tác giả ',
          dataIndex: 'author',
          key: 'author',
          responsive: ['xl'],
     
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
            // responsive: ['md'],
            sorter:true,
          },
          {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            responsive: ['md'],
        
           
          },
          {
            title: 'Action',
            dataIndex: 'action',
            key: 'age',
          
          },

          
      ];

    
    const callGetAllBook = async () => {
        let res = await fetchGetAllBook()
        console.log(res)
        if(res && res.data) {
            let dataTableBook = res.data.map((item,index) => {
                return {
                    key :index,
                    mainText : <p onClick={() => handleShowerDrawer(item) } style={{color : '#1677ff' , cursor :'pointer' }}>{item.mainText}</p>,
                    category : item.category,
                    author : item.author,
                    price : item.price,
                    updatedAt : item.updatedAt,
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

            setDataTable(dataTableBook)
        }
    }

    const handleInput = async (e) => {
        let res = await fetchGetAllBook()
        if(res && res.statusCode == 200) {
            let dataAccountInput = res.data.filter((item , index) => {
                return item.mainText.toLowerCase().includes(e.target.value)     
            })
            let dataTableConfim = dataAccountInput.map((item,index) => {
                return {
                    key :index,
                    mainText : <p onClick={() => handleShowerDrawer(item) } style={{color : '#1677ff' , cursor :'pointer' }}>{item.mainText}</p>,
                    category : item.category,
                    author : item.author,
                    price : item.price,
                    updatedAt : item.updatedAt,
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

    const handleShowerDrawer = (item) => {
        setDataShowDrawerOnClick(item)
        setOpenDrawer(true)
    }

    const callGetCategory = async () => {
        let res = await fetchGetCategory()
        console.log('category',res)
        if(res && res.data) {
            let dataListCategory = res.data.map(item => {
                return {
                    value: item,
                    label: item,
                }
            })
            setDataCategory(dataListCategory)
        }
    }

    const handleUpdate = (item) => {
        setOpenModalUpdate(true)
        setDataShowDrawerOnClick(item)
    }

    const handleDelete = (item) => {
        setOpenModalDelete(true)
        setDataShowDrawerOnClick(item)
    }

    useEffect(() => {
        callGetAllBook()
        callGetCategory()
    },[])
    return (
        <>
            <Breadcrumb
            className="lg-marginbot-header"
          style={{
            marginBottom: 100,
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>Manage Books</Breadcrumb.Item>
        </Breadcrumb>
            <Row className="lg-marginbot" gutter={[20,30]} style={{display :'flex' , alignItems : 'center' , justifyContent :'space-between' , marginBottom : 50}}>
                <Col xs={0} sm={0} md={24} lg={10} xl={10}  >
                 
                    <Input onChange={(e) => handleInput(e)} size="large"  addonBefore="Name" placeholder="find book name..." allowClear />
                 
                </Col>

                <Col xs={0} sm={15} md={0} lg={0} xl={0}  >
                 
                 <Input onChange={(e) => handleInput(e)}  size="default"  addonBefore="Name" placeholder="find book name... " allowClear />
              
                </Col>

                <Col xs={3} sm={0} md={0} lg={0} xl={0}  >
                     <Button onClick={() => setSearchInput(!searchInput)}  ><SearchOutlined /></Button>
                 {/* <Input  size="default"  addonBefore="SDT" placeholder="...... " allowClear /> */}
              
                </Col>
                        {searchInput == true ? 
                        <Col xs={19} sm={0} md={0} lg={0} xl={0} >
                            <Input onChange={(e) => handleInput(e)}  size="default" addonBefore="Name" 
                        placeholder="find book name... " allowClear />
                          </Col> : null}

                <Col className="md-marginleft ld-marginleft"  >
                    <Row  >
                        <Button onClick={() => setOpenModalCreate(true)}  className="md-button" style={{margin :'0 5px'}} type="primary" ><UserOutlined/>Add New Book</Button>
                        <Button  className="hide-manageuser" style={{margin :'0 5px'}} type="primary" ><UploadOutlined/>Import</Button>
                        <Button   className="hide-manageuser" style={{margin :'0 5px'}} type="primary" ><AppstoreOutlined/>Export</Button>
                        <Button onClick={() => callGetAllBook()}  style={{margin :'0 5px'}} shape="circle" ><RetweetOutlined /></Button>
                    </Row>
                </Col>
            </Row>
             <DrawerApp dataShowDrawerOnClick = {dataShowDrawerOnClick} open = {openDrawer} setOpen = {setOpenDrawer}/>               
            <TableAdmin handleUpdate = {handleUpdate} dataSource = {dataTable} columns ={columns} setDataTable ={setDataTable} handleShowerDrawer ={handleShowerDrawer}/>
            <ModalCreateBook callGetAllBook = {callGetAllBook} dataCategory = {dataCategory} setOpenModalCreate = {setOpenModalCreate} openModalCreate  = {openModalCreate}/>
            <ModalUpdateBook dataShowDrawerOnClick = {dataShowDrawerOnClick} callGetAllBook = {callGetAllBook} dataCategory = {dataCategory} setOpenModalCreate = {setOpenModalUpdate} openModalCreate  = {openModalUpdate}/>
            <ModalDeleteBook dataShowDrawerOnClick = {dataShowDrawerOnClick} callGetAllBook = {callGetAllBook} dataCategory = {dataCategory} setOpenModalCreate = {setOpenModalDelete} openModalCreate  = {openModalDelete}/>

        </>
    )
}



export default ManageBook