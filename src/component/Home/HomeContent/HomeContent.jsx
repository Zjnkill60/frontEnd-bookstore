import { Col, Row,Rate, message } from 'antd'
import './homepage.scss'
import SiderBar from './SideBar'
import { Tabs } from 'antd';
import { Card } from 'antd';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { callFetchCategory, fetchAccount, fetchBookPaganigate, fetchGetAllBook, handleSorterASCBook } from '../../../api/api';
import PageLoading from '../../PageLoading/PageLoading';
import { baseURL } from '../../../baseURL';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doLogOut, doLogin } from '../../../redux/account/accountSlice';
import Account from '../../Account/Account';
const { Meta } = Card;



const items = [
  {
    key: '1',
    label: `Tất Cả`,
    children: ` `,
  },
  {
    key: '-sold',
    label: `Phổ Biến`,
    children: ``,
  },
  {
    key: 'price',
    label: `Giá Thấp Đến Cao`,
    children: ``,
  },
  {
    key: '-price',
    label: `Giá Cao Đến Thấp`,
    children: ``,
  },
];



const HomeContent = () => {
  const [current, setCurrent] = useState(1);
  const [listCategory , setListCategory] = useState([])
  const [listBook, setListBook] = useState([])
  const [total , setTotal] = useState(0)
  const nagivate = useNavigate()
  const dispatch = useDispatch()

  const onChange = (page) => {
   
    setCurrent(page);
    callFetchListBook(page,8)
  };

  const onChangeTab = async (key) => {
    console.log(key);
    if(key != 1) {
      let res = await handleSorterASCBook(key)
      console.log(res)
      if(res && res.data) {
          setListBook(res.data.result)
          setTotal(res.data.meta.total)
      }
    }else {
      callFetchListBook(1,8)
    }
    
  };
  const callFetchListCategory = async () => {
    let res = await callFetchCategory()
    console.log(res)
    if(res && res.data) {
        setListCategory(res.data)
    }
  }

  const callFetchListBook = async (current , pageSize) => {
    let res = await fetchBookPaganigate(current,pageSize)
    console.log(res)
    if(res && res.data) {
        setListBook(res.data.result)
        setTotal(res.data.meta.total)
    }
  }



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

  const handleNagivate = (item) => {
    let bookPath = slug(item.mainText)
      nagivate(`book/${bookPath}?id=${item._id}`)
  }

  let USDollar = new Intl.NumberFormat({
    style: 'currency',
    currency: 'USD',
    });

  useEffect(() => {
    callFetchListCategory()
    callFetchListBook(1,8)
  },[])
    return (
        <Row gutter={50} className="homepage-container md-padding ">
          
            <Col style={{marginTop : 15 }} xs={0} sm={0} md={0} lg={0} xl={4}>
                <SiderBar setTotal ={setTotal} listCategory = {listCategory} callFetchListBook ={callFetchListBook} setListBook={setListBook}/>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={20}>
                <Row  className='md-mid'>
                      <Tabs style={{width : '100%'}}  size='small' className='md-left' defaultActiveKey="1" items={items} onChange={onChangeTab} />
                </Row>
                

                <Row gutter={[15,20]} className='md-mid'>
                  
                  {listBook.length > 0 ? listBook.map((item,index) => {
                        return (
                        <Col onClick={() => handleNagivate(item)} key={index} className='md-col'>
                                <Card
                                hoverable
                                className='card-item md-width '
                                cover={<img className='img-item md-height '  alt="example" src={`${baseURL}images/book/${item.thumbnail}`}/>}
                            >
                                <div className='title-item md-font-title' >{item.mainText}</div>
                                <Row className='sub-item'>
                                    <Col span={24}>
                                        <span className='sub-price md-font-price'>{USDollar.format(item.price)} VND</span>
                                    </Col>
                                    <Col span={24} className='sub-rating' >
                                        <Rate className='md-font-rating' style={{marginRight : 15 , fontSize : 17}} disabled defaultValue={5}/>
                                        <span className='sub-sold md-font-sold'  >Đã bán {item.sold}</span>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        )
                  }) : <Col span={24} >
                              <PageLoading/>
                      </Col>}
                

                 
                  
                </Row>

                {listBook.length > 0 ? 
                <Row className='paganigate'>
                    <Col className='panaginate-item'>
                        <Pagination current={current} onChange={onChange} total={total} pageSize={8} />
                    </Col>
               </Row> : <></> }
            </Col>

            
        </Row>
       
    )
}

export default HomeContent