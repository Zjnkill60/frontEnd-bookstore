import { Col, Row, Table, message } from 'antd'

import './order.scss'
import { fetchGetHistoryOrder } from '../../api/api';
import { useEffect, useState } from 'react';


const History = () => {
    const [data , setData] = useState([])

      
      const columns = [
        {
          title: 'STT',
          dataIndex: 'stt',
          key: 'stt',
        },
        {
          title: 'Họ Tên',
          dataIndex: 'name',
          responsive: ['md'],
          key: 'name',
        },
        {
          title: 'SĐT',
          dataIndex: 'phone',
          responsive: ['md'],
          key: 'phone',
        },
        {
            title: 'Chi Tiết',
            dataIndex: 'detail',
            key: 'detail',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'total',
        },
      ];
        
    let USDollar = new Intl.NumberFormat({
        style: 'currency',
        currency: 'USD',
        });

      const fetchGetHistory = async () => {
        let res = await fetchGetHistoryOrder()
        console.log('history',res)
        if(res && res.data) {
            let dataFetch = res.data.map((item,index) => {
                return {
                    key : index ,
                    stt : index + 1,
                    name : item.name,
                    phone : item.phone,
                    detail : <ul>
                                    {item.detail.map((item,index) => {
                                        return (
                                            <li key={index}>
                                               <span style={{fontWeight : 600}} className='item-history'> {item.quantity}</span> - <span className='item-history'>{item.bookName} </span>
                                            </li>
                                        )
                                    })}
                          </ul>,
                   
                    totalPrice : USDollar.format(item.totalPrice) +'đ'
                }
            })
            setData(dataFetch)
        }else {
            message.error(res.error)
        }
      }

      useEffect(() => {
        fetchGetHistory()
      },[])
    return (
        <div className="order-container">
            <Row>
            

                <Col span={24}>
                    <Table dataSource={data} columns={columns} pagination ={{pageSize : 5}}/>
                </Col>
            </Row>
        </div>
    )
}

export default History