import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { fetchGetBookID } from "../../../api/api";
import './detailBook.scss'
import { Col, Row ,Breadcrumb, Rate, Button, Input, Space, Divider,Avatar, message, Skeleton} from "antd";
import ImageGallery from 'react-image-gallery';
import {CarOutlined,MinusOutlined,PlusOutlined,FileDoneOutlined,EnterOutlined,ShoppingCartOutlined,ArrowLeftOutlined,WechatOutlined} from '@ant-design/icons'
import { baseURL } from "../../../baseURL";
import { useDispatch, useSelector } from "react-redux";
import { doAddBookToCart } from "../../../redux/book/bookSlice";



const DetailBook = () => {
    const [dataBook , setDataBook] = useState([])
    const [listImgBook , setListImgBook] = useState([])
    const [indexStart , setIndexStart] = useState(0)
    const ref = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()  
    let params = new URLSearchParams(location.search);
    const bookID = params.get("id"); // "instagram"
    bookID.toString()
    console.log(bookID)
    let USDollar = new Intl.NumberFormat({
        style: 'currency',
        currency: 'USD',
        });
    const renderLeftNav =  (onClick, disabled) => (
            <LeftNav onClick={onClick} />
          )
    const getDetailBookByID =  async () => {
        let res = await fetchGetBookID(bookID)
        console.log(res)
        if(res && res.data) {
            setDataBook(res.data)
            let thumbnailImg = [{
                original :`${baseURL}images/book/${res.data.thumbnail}` ,
                thumbnail : `${baseURL}images/book/${res.data.thumbnail}` 
            }]
            if(res.data.slider.length > 0) {
                let sliderImg = res.data.slider.map(item => {
                    return {
                        original : `${baseURL}images/book/${item}` ,
                        thumbnail : `${baseURL}images/book/${item}` 
                    }
                })
                thumbnailImg.push(...sliderImg)
            }
           setListImgBook(thumbnailImg)
        }
    }

    const handleAdd = () => {
        if(ref.current.value >= 100) {           
            return
        }
        console.log(ref.current.value)
        let number = Number(ref.current.value)
        ref.current.value = number + 1
    }

    const handleReduce = () => {
        if(ref.current.value <= 1) {
            ref.current.value = 1
            return
        }
        ref.current.value -=1
       
    }
    
    const handleChangeInput =(e) => {
        ref.current.value = e.target.value
        if(ref.current.value >= 100) {
            ref.current.value = 100
            return
        }


    }

    const handleAddCart = () => {
        dispatch(doAddBookToCart({
            dataBook : dataBook,
            total : ref.current.value
        }))
        message.success("Thêm mới sản phẩm vào giỏ hàng")
    }

    const handleBuyNow = () => {
        dispatch(doAddBookToCart({
            dataBook : dataBook,
            total : ref.current.value
        }))
        navigate('/order/checkout')
    }

    useEffect(() => {
        getDetailBookByID()
    },[bookID])


    

    return (
        <>
        
        <Row className="detail-header sm-hide ">
            <Col  xs={0} sm={0} md={24} lg={24} xl={24}>
                        <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                    >
                    <Breadcrumb.Item><Link style={{color : '#1677ff'}} to='/'> Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link style={{color : '#1677ff'}} to='/'> Store</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{dataBook.mainText}</Breadcrumb.Item>
                    </Breadcrumb>

            </Col>
        </Row>
        
        {Object.keys(dataBook).length > 0 ? <>
            <Row gutter={50} className="detail-container sm-padding ">
            
            <Col className="sm-padding " style={{backgroundColor : '#fff',padding :'20px 0 0 20px'}} xs={24} sm={24} md={24} lg={8} xl={9}>
                <Row gutter={[10,10]}>
                     <Col span={24}>
                         <ImageGallery
                         showFullscreenButton = {false} 
                         showNav ={false}
                         renderLeftNav =  {() => renderLeftNav(onClick , disabled)}
                         startIndex={indexStart}
                         showPlayButton = {false}
                         showThumbnails = {false}
                         items={listImgBook}
                         />
                     </Col>
                     <Col span={24} className="thumbnail" style={{display :'flex',overflow :'scroll',marginLeft :30}} >
                         {listImgBook.map((item,index) => {
                             return  (
                                 <div key={index} onMouseOver={() => setIndexStart(index)} className={index == indexStart ? "active active-xs  " : ""}
                                 style={{marginRight : 5 , border : '2px solid #aaaaaa'}}>
                                      <Avatar  key={index} shape="square" size={100} src ={item.thumbnail}  />
                                 </div>
                             )
                            
                         })}
                         
                     </Col>
                     <div onClick={() => navigate('/')} className="back-button hide-xl">
                         <ArrowLeftOutlined  className="back" />
                     </div>
                </Row>
            </Col>
 
            <Col className="ms-content" style={{backgroundColor : '#fff',padding :'20px 50px 20px 50px'}} xs={24} sm={24} md={24} lg={16} xl={15}>
                   <Row gutter={[10,20]}>
                         <Col span={24} className="book-author">
                             Tác Giả : <span> {dataBook.author}</span>
                         </Col>
                         <Col span={24} className="book-title">
                              {dataBook.mainText}
                         </Col>
                   </Row>  
 
                   <Row style={{marginTop : 20}} gutter={[40,30]} >
                         <Col >
                             <Row gutter={40} style={{display : 'flex' , alignItems :'center'}}>
                                 <Col  className="book-rate" >
                                     <span className="rate-count">4.5</span>
                                     <Rate className="ms-star" style={{color :'#ee4d3d'}} defaultValue={4.5} allowHalf disabled/>
                                 </Col>
                                 <Col className="book-sold">
                                     <span className="sold-count">{dataBook.sold}</span>
                                     <span className="sold-out"> Đã Bán </span>
                                 </Col>
                             </Row>
                            
                         </Col>
 
                         <Col className="book-price" span={24}>
                             <span className="real-price">₫{USDollar.format(dataBook.price * 2)}</span>
                             <span className="discount-price">₫{USDollar.format(dataBook.price )}</span>
                             <div className="percent-price">
                                 50% GIẢM
                             </div>
                             <div className="contact-price sm-hide ">Liên Hệ / Phản Hồi</div>
                         </Col>
 
                         <Col span={24} >
                             <Row className="flex-align" >
                                 <Col xs={0} sm={5} md={5} lg={5} xl={5}>
                                      <span className="text-content ">Deal Sốc</span>
                                 </Col>
                                 <Col>
                                     <div className="box-content ">Giảm 20% cho giá trị đơn hàng = 300k</div>
                                 </Col>
                             </Row>
                            
                            
                         </Col>
 
                         <Col  span={24}>
                               <Row className="flex-align" >
                                 <Col xs={0} sm={5} md={5} lg={5} xl={5}>
                                   <span className="text-content ">Bảo Hiểm</span>
                                 </Col>
                                 <Col>
                                      <div className="box-content ">Hoàn tiền 100% khi có sai sót / sự cố</div>
                                 </Col>
                             </Row>
                            
                            
                         </Col>
 
                         <Col  span={24}>
                              <Row className="flex-align" >
                                 <Col xs={0} sm={5} md={5} lg={5} xl={5}>
                                     <span className="text-content ">Vận Chuyển</span>
                                 </Col>
                                 <Col>
                                     <div className="flex-align" >
                                         
                                         <div className="box-content "> <CarOutlined style={{marginRight : 20}}/>Miễn Phí Vận Chuyển </div>
                                            
                                     </div>
                                 </Col>
                             </Row>
                           
                           
                         </Col>
 
                         <Col   span={24}>
                             <Row className="flex-align sm-hide " >
                                 <Col xs={0} sm={5} md={5} lg={5} xl={5}>
                                     <span className="text-content ">Số Lượng</span>
                                 </Col>
                                 <Col>
                                     <div style={{display :'flex',alignItems:'center'}}>
                                         
                                         <Button onClick={() => handleReduce()} className="button-content sm-hide "> <MinusOutlined /></Button>
                                         <input onChange={(e) => handleChangeInput(e)}  ref={ref} className=" sm-hide " defaultValue={1}
                                          style={{width : 60,height : 32, textAlign:'center',border : '1px solid #cccccc'}} type="number"/>
                                         <Button onClick={() => handleAdd()}   className="button-content sm-hide "><PlusOutlined /></Button>
                                     </div>
                                 </Col>
                             </Row>
                           
                            
                         </Col>
 
                         <Col  span={24} className="sm-hide ">
 
                               <Space>
                                 <Button onClick={handleAddCart} className="add-cart sm-hide "> <ShoppingCartOutlined /> Thêm Vào Giỏ Hàng</Button>
                                 <Button onClick={handleBuyNow} className="buy-now sm-hide ">Mua Ngay</Button>
                               </Space>
                             
                         </Col>
 
                         <Divider/>                     
                   </Row>  
 
                   <Row>
                                 <Col span={8}>
                                     <div className="flex-align" >
                                         <EnterOutlined className="icon-content"/>
                                         <div className="text-content-7day">Miễn phí trả hàng </div>
                                           
                                     </div>
                                 </Col>
                                 <Col span={8}>
                                    <div className="flex-align" >
                                          <FileDoneOutlined className="icon-content"/>
                                         <div className="text-content-7day">Chính hãng 100%</div>
                                        
                                     </div>
                                 </Col>
                                 <Col span={8}>
                                    <div className="flex-align" >
                                       <CarOutlined className="icon-content"/>
                                         <div className="text-content-7day">Miễn phí vận chuyển</div>
                                            
                                     </div>
                                 </Col>
                 </Row>
 
                 
 
            </Col>
         </Row>
 
         <Row className="tool-btn hide-xl">
                 <Col span={5}>
                     <Button className="button-tool"><WechatOutlined style={{fontSize : 25 , color :'#d0011b'}}/> 
                             <div style={{fontSize : 11 , color :'#666666'}}>Chat ngay</div>
                     </Button>
                 </Col>
                 <Col span={5}>
                 <Button className="button-tool"><ShoppingCartOutlined style={{fontSize : 25 , color :'#d0011b'}} /> 
                          <div onClick={handleAddCart} style={{fontSize : 11 , color :'#666666'}}>Add Cart</div>
                 </Button>
                 </Col>
                 <Col span={14}>
                 <Button onClick={handleBuyNow} className="button-tool" style={{backgroundColor : '#d0011b' , color : '#fff'}}>Mua ngay </Button>
                 </Col>
         </Row>
        </> : <Row style={{minHeight : '100vh'}}  className="detail-container sm-padding ">
               <Skeleton active/>
               <Skeleton active/>
      
            </Row>}
      
        </>
    )
}

export default DetailBook