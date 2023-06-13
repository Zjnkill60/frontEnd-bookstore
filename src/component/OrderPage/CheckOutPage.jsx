import { Row ,Steps,Col,Avatar, Button, Divider , Empty,Breadcrumb,Badge, message,Result} from "antd"
import './order.scss'
import {HomeOutlined} from '@ant-design/icons';
import { baseURL } from "../../baseURL"
import { useDispatch, useSelector } from "react-redux"
import {DeleteOutlined} from '@ant-design/icons'
import { doChangeTotal, doOrderSuccess, doRemoveItemFromOrder } from  "../../redux/book/bookSlice"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {CheckCircleOutlined,RightOutlined,CreditCardOutlined,SlackSquareOutlined,ShoppingCartOutlined,DownOutlined} from '@ant-design/icons'
import {  Checkbox, Form, Input } from 'antd';
import { fetchCreateAnOrder } from "../../api/api";

const { TextArea } = Input;




const CheckOutPage = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const itemCart = useSelector(state => state.book)
    const dataUserLogin = useSelector(state => state.account)

    const [totalPrice , setTotalPrice] = useState(0)
    const [currentStep , setCurrentStep] = useState(2)
    const [showInfo , setShowInfo] = useState(false)


    
    let USDollar = new Intl.NumberFormat({
        style: 'currency',
        currency: 'USD',
        });


    const onFinish = async (values) => {
        let {username , email , phone,address} = values
        console.log(itemCart)
        let detailOrder = itemCart.listBookFromCart.map(item => {
            return {
                bookName : item.dataBook.mainText,
                quantity : +item.total,
                _id : item.dataBook._id
            }
        })

        let res = await fetchCreateAnOrder(username,address,phone,totalPrice,detailOrder)
        console.log(res)
        if(res && res.data) {
            message.success("Đơn hàng đã được gửi đi")
            setCurrentStep(3)
            dispatch(doOrderSuccess())
            
        }else {
            message.error(res.message)
        }
        
    };
          

   
    useEffect(() => {
        let total = 0
        itemCart?.listBookFromCart?.forEach(item => {
            total += (item.total * item.dataBook.price)
        }) 

        setTotalPrice(total)
        form.setFieldsValue({
            username : dataUserLogin?.user.fullName,
            email : dataUserLogin?.user.email,
            phone : dataUserLogin?.user.phone
        })
        
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
                    <Breadcrumb.Item><Link style={{color : '#1677ff'}} to='/order'> Order</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Check Out</Breadcrumb.Item>
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

        {currentStep == 3 ? 
                <>
                    <Result
                        status="success"
                        title="Chúc mừng bạn đã đặt hàng thành công !"
                        subTitle="Order number: 2017182818828182881 đã được chuyển lên sever"
                        extra={[
                        <Button onClick={() => navigate('/history')}   type="primary" key="console">
                            Xem lịch sử mua hàng
                        </Button>,
                        <Button onClick={() => navigate('/')}   key="buy">Về trang chủ</Button>,
                        ]}
                    />
                </>
            : 
          

            <Row className="checkout-page">
                <Col className="checkout-left" xs={24} sm={24} md={24} lg={12} xl={13}>
                    <Row gutter={[0,15]}>
                        <Col span={24} className="title-checkout">
                        <SlackSquareOutlined style={{marginRight : 15}}/>BOOKSTORE.COM
                        </Col>
                
                        <Col xs={24} sm={24} md={24} lg={0} xl={0}>
                            <div onClick={() => setShowInfo(!showInfo)} className="show-item-checkout" style={{display : 'flex', alignItems :'center' , justifyContent :'space-between' ,paddingBottom :30}}>
                                <div style={{display : 'flex', alignItems :'center' ,color : '#1677ff'}}>
                                    <ShoppingCartOutlined style={{fontSize : 20}} />
                                    <span className="sm-showhide" style={{margin : '0 10px'}}>{showInfo !== true ? 
                                            'Hiển thị thông tin đơn hàng' : 'Ẩn thông tin đơn hàng' }</span>
                                    <DownOutlined />
                                </div>
                                <span className="sm-title-price" style={{fontSize : 22}}>{showInfo == true ? '' : USDollar.format(totalPrice) + 'đ'}</span>
                            </div>
                            {itemCart.listBookFromCart.length > 0 && showInfo == true ? itemCart.listBookFromCart.map((item,index) => {
                                return (
                                    <>
                                    <Row  key={index} className="item-checkout"> 
                                        <Col xs={6} sm={5} md={5} lg={7} xl={5} xxl={6}>
                                        <Badge count={item.total} color="#666666">
                                            <Avatar className="sm-avatar"  shape='square' size={80} src = {`${baseURL}images/book/${item?.dataBook?.thumbnail}`}/>
                                        </Badge>
                                        </Col>
                                        <Col xs={12} sm={10} md={10} lg={12} xl={12} xxl={12}>
                                            <span className="bookname-checkout-item">{item?.dataBook?.mainText}</span>
                                        </Col>
                                    
                                    
                                        <Col xs={4} sm={3} md={2} lg={3} xl={3} xxl={2} style={{marginLeft :'auto'}}>
                                            <div className="sm-price" style={{color : '#1677ff' , fontSize : 16}} > {USDollar.format(item?.dataBook?.price * item?.total)}đ</div>
                                        </Col>
                                
                                    
                                    </Row>
                                    <Divider/>
                                
                            </>
                                )
                            }) : <></>
                            }  

                    {itemCart.listBookFromCart.length > 0 && showInfo == true ? 
                        <>
                            <Row gutter={[5,10]}>
                    

                                <Col span={24}>
                                    <div style={{display :'flex' , alignItems :'center' , justifyContent :'space-between'}}>
                                        <span>Tạm tính</span>
                                        <span>{USDollar.format(totalPrice)}đ</span>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div style={{display :'flex' , alignItems :'center' , justifyContent :'space-between'}}>
                                        <span>Phí vận chuyển</span>
                                        <span>Miễn phí</span>
                                    </div>
                                </Col>
                                <Divider/>

                                <Col span={24}>
                                    <div style={{display :'flex' , alignItems :'center' , justifyContent :'space-between'}}>
                                        <span style={{fontSize : 17}}>Tổng cộng : </span>
                                        <div style={{display :'flex' , alignItems :'center'}}>
                                            <span style={{marginRight : 13 , color : '#aaaaaa' , fontSize : 16}}>VND</span>
                                            <span className="title-price-total-sm" style={{fontSize : 30}}>{USDollar.format(totalPrice)}₫</span>
                                        </div>
                                    </div>
                                </Col>

                            </Row> 
                            <Divider/>
                        </>: <></>}
                        </Col>
                    

                        <Col span={24}>
                            <div style={{display : 'flex' , alignItems :'center'}}>
                                <Link to = "/order">Giỏ hàng </Link>
                                <RightOutlined style={{margin : '0 5px'}} />
                                <span >Thông tin giao hàng </span>
                            </div>
                        </Col>

                        <Col span={24}>
                            <div className="sub-title-checkout"> 
                                Thông tin giao hàng 
                            </div>
                        </Col>

                        {dataUserLogin.isAuthenticated == true ?
                        <Col span={24}>
                            <div className="account-checkout">
                                <span>Xin chào :  </span>                        
                                <span style={{color : '#1677ff'}}>{dataUserLogin?.user?.email}</span>
                            </div>
                        </Col> :  <Col span={24}>
                            <div className="account-checkout">
                                <span style={{color :'#aaaaaa'}}>Bạn đã có tài khoản ?   </span>                        
                                <Link to = '/login' style={{color : '#1677ff'}}>Đăng nhập</Link>
                            </div>
                        </Col> }

                        <Col span={24} style={{marginTop : 10}}>
                        <Form
                                name="order"
                                onFinish={onFinish}
                                form={form}
                            >
                                <Row gutter={10}>
                                    <Col span={24}>
                                            <Form.Item
                                    
                                        name="username"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Vui lòng nhập họ tên !',
                                            },
                                        ]}
                                        >
                                        <Input className="input-form-checkout" size="large" placeholder="Họ và tên"/>
                                        </Form.Item>
                                    </Col>

                                    <Col span={17}>
                                            <Form.Item 
                                                name="email"
                                            
                                        >
                                        <Input className="input-form-checkout" size="large" placeholder = "Email"/>
                                        </Form.Item>
                                    </Col>

                                    <Col span={7}>
                                            <Form.Item
                                    
                                        name="phone"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Vui lòng nhập sdt!',
                                            },
                                        ]}
                                        >
                                        <Input className="input-form-checkout" size="large" placeholder ="Số điện thoại"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                            <Form.Item
                                    
                                        name="address"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Vui lòng nhập địa chỉ!',
                                            },
                                        ]}
                                        >
                                        <TextArea className="input-form-checkout" rows={5} placeholder ="Địa chỉ "/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                

                        

                            
                            </Form>
                        </Col>

                        <Col span={24}>
                            <div className="sub-title-checkout">
                                Phương thức vận chuyển
                            </div>
                        </Col>

                        <Col span={24}>
                            <Row className="box-method-shipping">
                                <div style={{display : 'flex' , alignItems : 'center'}}>
                                    <CheckCircleOutlined style={{marginRight : 15 , color : '#1677ff' , fontSize  : 20}}/>
                                    <span style = {{color : '#444444'}}>Giao hàng tận nơi</span>
                                </div>
                                <div style={{textDecoration :'underline'}}>
                                        0đ
                                </div>
                            </Row>
                        </Col>

                        <Col span={24} style={{marginTop :20}}>
                            <div className="sub-title-checkout">
                                Phương thức thanh toán 
                            </div>
                        </Col>

                        <Col span={24}>
                            <Row className="box-method-pay">
                                <Col>
                                    <CheckCircleOutlined style={{marginRight : 0 , color : '#1677ff' , fontSize  : 20}}/>
                                </Col>
                                <Col>
                                        <Avatar shape="square" style={{margin : '0 15px'}} size={40} icon ={<CreditCardOutlined />} />
                                </Col>
                                    <Col className="sm-method-shipping" >
                                        Thanh toán khi giao hàng (COD)
                                    </Col>
                            </Row>
                            <Row className="box-pay-subtitle ">
                                Là phương thức khách hàng nhận hàng mới trả tiền. Áp dụng với tất cả các đơn hàng trên toàn quốc
                            </Row>
                        </Col>

                        <Col span={24}>
                        <div className="btn-control-checkout">
                            <Link to = '/order'>Giỏ hàng</Link>
                            <Button onClick={() => form.submit()} type="primary" className="btn-submit" size="large">Hoàn tất đơn hàng</Button>
                        </div>
                        </Col>

                    </Row>
                </Col>

                <Col className="checkout-right" xs={0} sm={0} md={0} lg={12} xl={11}>
                    {itemCart.listBookFromCart.length > 0 ? itemCart.listBookFromCart.map((item,index) => {
                                return (
                                    <>
                                    <Row key={index} className="item-checkout"> 
                                        <Col xs={5} sm={5} md={4} lg={7} xl={5} xxl={6}>
                                        <Badge count={item.total} color="#666666">
                                            <Avatar className="sm-avatar"  shape='square' size={80} src = {`${baseURL}images/book/${item?.dataBook?.thumbnail}`}/>
                                        </Badge>
                                        </Col>
                                        <Col xs={13} sm={10} md={10} lg={12} xl={12} xxl={12}>
                                            <span className="bookname-checkout-item">{item?.dataBook?.mainText}</span>
                                        </Col>
                                    
                                    
                                        <Col xs={0} sm={0} md={0} lg={3} xl={3} xxl={2} style={{marginLeft :'auto'}}>
                                            <div style={{color : '#1677ff' , fontSize : 16}} > {USDollar.format(item?.dataBook?.price * item?.total)}đ</div>
                                        </Col>
                                
                                    
                                    </Row>
                                    <Divider/>
                                
                            </>
                                )
                            }) : <Empty className="xxl-empty" style={{fontSize : 20 , height : 400 }} imageStyle={{height : 250}}
                            description = {<Button type="primary"><Link to='/'>Về trang chủ sắm đồ đê </Link></Button>}/>
                            }  

                    {itemCart.listBookFromCart.length > 0 ? 
                        <Row gutter={[5,10]}>
                    

                            <Col span={24}>
                                <div style={{display :'flex' , alignItems :'center' , justifyContent :'space-between'}}>
                                    <span>Tạm tính</span>
                                    <span>{USDollar.format(totalPrice)}đ</span>
                                </div>
                            </Col>
                            <Col span={24}>
                                <div style={{display :'flex' , alignItems :'center' , justifyContent :'space-between'}}>
                                    <span>Phí vận chuyển</span>
                                    <span>Miễn phí</span>
                                </div>
                            </Col>
                            <Divider/>

                            <Col span={24}>
                                <div style={{display :'flex' , alignItems :'center' , justifyContent :'space-between'}}>
                                    <span style={{fontSize : 17}}>Tổng cộng : </span>
                                    <div style={{display :'flex' , alignItems :'center'}}>
                                        <span style={{marginRight : 13 , color : '#aaaaaa' , fontSize : 16}}>VND</span>
                                        <span style={{fontSize : 30}}>{USDollar.format(totalPrice)}₫</span>
                                    </div>
                                </div>
                            </Col>

                        </Row> : <></>}
                </Col>
            </Row>
        }
      
        </div>
    )
}

export default CheckOutPage