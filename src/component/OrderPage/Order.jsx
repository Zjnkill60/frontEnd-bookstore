import { Row ,Steps,Col,Avatar, Button, Divider , Empty,Breadcrumb} from "antd"
import './order.scss'
import {HomeOutlined} from '@ant-design/icons';
import { baseURL } from "../../baseURL"
import { useDispatch, useSelector } from "react-redux"
import {DeleteOutlined} from '@ant-design/icons'
import { doChangeTotal, doRemoveItemFromOrder } from  "../../redux/book/bookSlice"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {LoadingOutlined,MenuFoldOutlined} from '@ant-design/icons'



const Order = () => {
    const dispatch = useDispatch()
    const itemCart = useSelector(state => state.book)
    const [totalPrice , setTotalPrice] = useState(0)
    const [currentStep , setCurrentStep] = useState(1)
    const ref = useRef()
    const nagivate = useNavigate()
    let USDollar = new Intl.NumberFormat({
        style: 'currency',
        currency: 'USD',
        });

    const handleChangeInput = (item , e) => {
   
        dispatch(doChangeTotal({
            dataBook : item.dataBook,
            total : e.target.value
        }))
    }

    const handleRemoveItem = (index) => {
        dispatch(doRemoveItemFromOrder(index))
    }

   
    useEffect(() => {
        let total = 0
        itemCart?.listBookFromCart?.forEach(item => {
            total += (item.total * item.dataBook.price)
        }) 

        setTotalPrice(total)
        
    },[itemCart])

    return (
    <div  className="order-container">
      <Row >
            <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Breadcrumb
                        className="header-order"
                    >
                    <Breadcrumb.Item><Link style={{color : '#1677ff' }} to='/'>-- <HomeOutlined style={{margin :' 0 5px ' , fontSize : 17}} 
                    />  Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link style={{color : '#1677ff'}} to='/'> Store</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Order</Breadcrumb.Item>
                    </Breadcrumb>

            </Col>
        </Row>

        <Row className="sm-padding"> 
             <Col xs={0} sm={0} md={24} lg={24} xl={24} style={{height : 80}}>
                <Steps
                   direction="horizontal"
                    className="sm-steps"
                    size="small"
                    current={currentStep}
                    items={[
                    {
                        title: 'Giỏ Hàng',
                    },
                    {
                        title: 'Cập Nhật',
                    },
                    {
                    
                        title: 'Thanh Toán',
                    },
                    {
                        title: 'Done',
                    },
                    ]}
                />
            </Col>
        </Row>

        <Row> 
            <Col span={24} >
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={17}>
                        {itemCart.listBookFromCart.length > 0 ? itemCart.listBookFromCart.map((item,index) => {
                            return (
                                <>
                                <Row className="item-order"> 
                                <Col xs={5} sm={5} md={4} lg={4} xl={3} xxl={3}>
                                    <Avatar className="sm-avatar"  shape='square' size={100} src = {`${baseURL}images/book/${item?.dataBook?.thumbnail}`}/>
                                </Col>
                                <Col xs={13} sm={10} md={10} lg={7} xl={8} xxl={8}>
                                    <span className="item-order-title">{item?.dataBook?.mainText}</span>
                                </Col>
                                <Col xs={4} sm={6} md={5} lg={5} xl={5} xxl={5} className="sm-margin-price">
                                    <span className="item-order-price">{USDollar.format(item?.dataBook?.price)}đ</span>
                                </Col>
                                <Col xs={2} sm={3} md={2} lg={3} xl={3} xxl={2} className="sm-absolute-input" >
                                    <input className="sm-input" ref = {ref} onChange={(e) => handleChangeInput(item,e)} defaultValue={item?.total} style={{width : 50 , height : 37 , textAlign : 'center', border: '1px solid #bbbbbb' , borderRadius: 5}} type="number"  />
                                </Col>
                                <Col xs={0} sm={0} md={0} lg={4} xl={3} xxl={3}>
                                    <div className="item-order-sub"><span>Tổng : </span>{USDollar.format(item?.dataBook?.price * item?.total)}đ</div>
                                </Col>
                                <Col xs={3} sm={3} md={2} lg={1} xl={1} xxl={1} style={{marginLeft : 'auto'}}>
                                   <Button className="sm-button" onClick={() => handleRemoveItem(index)} type="primary" style={{color :'#fff'}}><DeleteOutlined /></Button>
                                </Col>
                                
                            </Row>
                            
                        </>
                            )
                        }) : <Empty className="xxl-empty" style={{fontSize : 20 , height : 400 }} imageStyle={{height : 250}}
                        description = {<Button type="primary"><Link to='/'>Về trang chủ sắm đồ đê </Link></Button>}/>
                         }
                    </Col> 


                    {itemCart.listBookFromCart.length > 0 ?
                    <Col className="sm-col-bottom" style={{marginTop : 70}} xs={24} sm={24} md={24} lg={24} xl={24} xxl={7}>
                            <Row className="sm-box-price" style={{padding : '20px 30px' ,width :'80%' , margin :'0 auto' , backgroundColor : '#fff' , borderRadius : 10}}>
                                <Col className="sm-col-price" span={24} style={{display :'flex' , justifyContent :'space-between' , marginBottom : 40}}>
                                    <div className="sm-fontSize-total" style={{fontSize : 17 , fontWeight : 500}}>Tổng tiền : </div>
                                    <div className="sm-fontSize-price"  style={{fontSize : 25 , color : '#1677ff' , fontWeight : 600}}>{USDollar.format(totalPrice)}đ</div>
                                </Col>
                                <Divider/>
                                <Col span={24}>
                                    <Button onClick={() => nagivate('checkout')} className="sm-button-price" disabled = {itemCart.listBookFromCart.length > 0 ? false : true}
                                     size="large" type="primary" style={{width :'100%' , height : 50}}>Mua hàng ({itemCart.listBookFromCart.length})</Button>
                                </Col>
                            </Row>
                    </Col>: <></>}
                   

                    
                </Row>
            </Col>
        </Row>
        </div>
    )
}

export default Order