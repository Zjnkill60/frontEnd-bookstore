import { Button, Col, Row, Space, Table, Tag } from 'antd';
import { handleSorterASCBook, handleSorterASCTableAdmin, handleSorterDESCBook, handleSorterDESCTableAdmin } from '../../../api/api';
import {
    EditOutlined,
    DeleteOutlined
    
  } from '@ant-design/icons';

const TableAdmin = (props) => {
   const {columns , dataSource ,setDataTable ,handleShowerDrawer,handleUpdate} = props

   const handleOnchange = async (pagination, filters, sorter, extra) => {
    
    console.log(sorter)
    if(sorter.columnKey == 'phone' || sorter.columnKey == 'updatedAt' || sorter.columnKey == 'email' ) {
        if(sorter.order == "ascend") {
            let res = await handleSorterASCTableAdmin(sorter.columnKey)
            if(res && res.statusCode == 200) {
                let dataAccount = res.data.result.map((item , index) => {
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
        
        else{
            let res = await handleSorterDESCTableAdmin(sorter.columnKey)
            if(res && res.statusCode == 200) {
                let dataAccount = res.data.result.map((item , index) => {
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

    }else {
        if(sorter.order == "ascend") {
            let res = await handleSorterASCBook(sorter.columnKey)
            if(res && res.statusCode == 200) {
                let dataAccount = res.data.result.map((item , index) => {
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
                setDataTable(dataAccount)
            }
        }
        
        else{
            let res = await handleSorterDESCBook(sorter.columnKey)
            console.log(res)
            if(res && res.statusCode == 200) {
                let dataAccount = res.data.result.map((item , index) => {
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
                setDataTable(dataAccount)
            }
        }
    }
  
    
    }
    return(
        <>
            
            <Table  onChange={() =>handleOnchange()}  size='small' dataSource={dataSource} columns={columns} pagination ={{pageSize : 10}} />
        </>
    )
}

export default TableAdmin