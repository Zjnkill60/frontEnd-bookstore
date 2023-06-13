import { Col, Divider, Row ,Checkbox,Form,Input,Button,Rate} from "antd"
import {FilterOutlined,RedoOutlined} from '@ant-design/icons'
import './homepage.scss'
import { fetchBookPaganigate } from "../../../api/api";







const SiderBar = (props) => {
    const {listCategory ,setListBook,setTotal,callFetchListBook} = props

    const onChange = async (checkedValues) => {
        console.log('checked = ', checkedValues);
        let res = await fetchBookPaganigate(1,100) 
        console.log(res)
        if(res && res.statusCode == 200) {
          
            let newListBook = []
            res.data.result.map(book => {
                checkedValues.forEach(category => {
                    if(category == book.category) {
                        newListBook.push(book)
                    }
                })
            })

            if(newListBook.length > 0) {
                setListBook(newListBook)
                setTotal(5)
            }
        }
      };

    const onFinish = async (values) => {
        const {min , max} = values
        console.log(min,max)
        
        let res = await fetchBookPaganigate(1,100) 
        console.log(res)
        if(res && res.statusCode == 200) {         
            let newListBook = []
            res.data.result.map(book => {
                
                if(parseInt(min) <= book.price && book.price <= parseInt(max)) { 
                    newListBook.push(book)
                }
            })

            if(newListBook.length > 0) {
                setListBook(newListBook)
                setTotal(5)
            }
        }
        
      };
    return (
        <>
            <Row>
                <Col>
                    <FilterOutlined className="icon-sidebar"/>
                    <span className="text-sidebar" style={{marginLeft : 8}}>Bộ lọc tìm kiếm</span>
                </Col>
                <Col style={{marginLeft : 'auto'}}>
                    <RedoOutlined onClick={() => callFetchListBook(1,8)} className="icon-sidebar"/>
                </Col>
            </Row>
            <Divider/>
            <div className="text-sidebar">Danh mục sản phẩm</div>
            <Checkbox.Group
                style={{
                width: '100%',
                margin : '20px 0'
                }}
                onChange={onChange}
            >
                <Row>
                    {listCategory.length > 0 ? listCategory.map((item,index) => {
                            return  (
                                <Col key={index} span={24}>
                                    <Checkbox value={item}>{item}</Checkbox>
                                </Col>
                            )
                    }) : <></>}
                   
                </Row>
            </Checkbox.Group>

            <Divider/>
           
            <Form
                name="basic"
                style={{margin :'20px 0'}}
                onFinish={onFinish}
            >

                <Row gutter={10}>
                    <Col span={12}>
                            <Form.Item
                            name="min"
                            rules={[
                            {
                            required: true,
                            message: 'require min price!',
                            },
                        ]}
                        >
                        <Input type="number" addonBefore = {<span style={{ fontSize : 12}}>MIN</span>}  />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        
                        <Form.Item
                        name="max"
                        rules={[
                            {
                            required: true,
                            message: 'require max price!',
                            },
                        ]}
                        >
                        <Input type="number"  addonAfter = {<span style={{ fontSize : 12}}>MAX</span>} />
                        </Form.Item>

                    </Col>
                </Row>
               

            
                <Form.Item
                
                >
                <Button style={{width : '100%' , marginTop : 10}} type="primary" htmlType="submit">
                    Áp dụng
                </Button>
                </Form.Item>
            </Form>

            <div className="text-sidebar" style={{margin : "70px 0 20px"}}>Đánh giá</div>
            <Row gutter={10}>
                <Rate style={{marginRight : 5}} disabled defaultValue={5}/>
                <Rate  disabled defaultValue={4}/>
                <Rate style={{marginRight : 5}} disabled defaultValue={5}/>
                <Rate  disabled defaultValue={3}/>
                <Rate disabled defaultValue={5} style={{marginRight : 5}}/>
            </Row>
        </>
    )
}

export default SiderBar