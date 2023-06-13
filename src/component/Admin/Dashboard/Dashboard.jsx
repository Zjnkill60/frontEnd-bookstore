import { Col, Row } from "antd"
import { fetchGetDashboard } from "../../../api/api"
import { useEffect, useState } from "react"

const Dashboard = () => {
    const [data , setData] = useState([])
    const fetchGetDashBoard = async () => {
        let res = await fetchGetDashboard()
        console.log(res)
        if(res && res.data) {
            setData(res.data)
        }
    }

    useEffect(() => {
        fetchGetDashBoard()
    },[])
    return (
        <Row gutter={40} style={{minHeight : '100vh'}}> 
            <Col style={{padding : '30px 10px' , backgroundColor : '#fafafa' , borderRadius : 10 }} xs={24} sm={24} md={12} lg={12} xl={12}>
                <Row gutter={[0, 39]} style={{textAlign : 'center'}}>
                    <Col style={{fontSize : 23}} span={24}>  TOTAL USER</Col>
                    <Col style={{fontSize : 30 , color : '#1677ff'}} span={24}> {data.countUser}</Col>
                  
                </Row>
              
            </Col>

            <Col style={{padding : '30px 10px' , backgroundColor : '#fafafa' , borderRadius : 10 }}  xs={24} sm={24} md={12} lg={12} xl={12}>
                <Row gutter={[0, 39]} style={{textAlign : 'center'}}>
                    <Col style={{fontSize : 23}} span={24}>  TOTAL ORDER</Col>
                    <Col style={{fontSize : 30 , color : '#1677ff'}} span={24}> {data.countOrder}</Col>
                  
                </Row>
              
            </Col>
        </Row>
    )
}

export default Dashboard