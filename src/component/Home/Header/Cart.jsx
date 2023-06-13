import {ShoppingCartOutlined} from '@ant-design/icons'
import {  Badge ,Col,Popover, Row , Avatar, Divider,Button} from 'antd';
import './header.scss'
import { baseURL } from '../../../baseURL';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



const Cart = (props) => {
    const {className} = props
    const itemCart = useSelector(state => state.book)
    const navigate = useNavigate()

    let USDollar = new Intl.NumberFormat({
        style: 'currency',
        currency: 'USD',
        });

    var slug = function(str) {
            str = str.replace(/^\s+|\s+$/g, ''); // trim
            str = str.toLowerCase();
          
            // remove accents, swap ñ for n, etc
            var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
            var to   = "aaaaaeeeeeiiiiooooouuuunc------";
            for (var i = 0, l = from.length; i < l; i++) {
              str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
            }
          
            str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                     .replace(/\s+/g, '-') // collapse whitespace and replace by -
                     .replace(/-+/g, '-'); // collapse dashes
          
            return str;
          };

    const handleOnClickItemCart = (item,e) => {
        e.stopPropagation()
        let bookPath = slug(item.dataBook.mainText)
       
        navigate(`/book/${bookPath}?id=${item.dataBook._id}`)
    }

    


    const content = (
        <>
           {itemCart.listBookFromCart.length > 0 ? itemCart.listBookFromCart.map((item,index) => {
                 return <> 
                    <Row className='item-cart' onClick={(e) => handleOnClickItemCart(item,e)} key={index} style={{width :'500px',cursor :'pointer'} }>
                        <Col span={4}>
                            <Avatar shape='square' size={64} src = {`${baseURL}images/book/${item.dataBook.thumbnail}`}/>
                        </Col>
                        <Col span={13}>
                            <span style={{fontSize : 13}} >{item.dataBook.mainText}</span>
                        </Col>
                        <Col span={4} style={{marginLeft :'auto'}}>
                            <div style={{fontSize : 17 , color :'#1677ff'}} >{USDollar.format(item.dataBook.price)}₫</div>
                        </Col>
                    </Row>
                    <Divider/>
                 </>
                    
                 
           }) : <>Bạn chưa có sản phẩm nào trong giỏ hàng</>}
           
           {itemCart.listBookFromCart.length > 0 ? 
           <Row key={0}>
                <Button onClick={() => navigate('/order')} style={{width : '100%', height :50}} size='large' type = "primary">Xem giỏ hàng </Button>
           </Row> : <></>}
        </>
    
    );
 
    return (
       <div>
         <Popover   
        
        trigger="hover"
        content={content} >
         <Badge count={itemCart.listBookFromCart.length > 0 ? itemCart.listBookFromCart.length : 0}>
                 <ShoppingCartOutlined className={className} style={{ fontSize : 25 , color: '#1677ff'}} />
         </Badge>
           
        </Popover>
       </div>
    )
}

export default Cart