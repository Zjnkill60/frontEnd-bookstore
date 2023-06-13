import './footer.scss'
import { Descriptions,Badge } from 'antd';


const Footer = () => {
    return (
        <div className="footer-container padding-small-xs">
            <div className='font-small-xs xl-title' style={{textAlign:'center' , fontSize : 30 , marginBottom : 50 }}>BOOK STORE</div>
            <Descriptions bordered>
                <Descriptions.Item span={2} label="Về Chúng Tôi">BookStore - ứng dụng mua sắm trực tuyến thú vị, tin cậy, an toàn và miễn phí</Descriptions.Item>
                <Descriptions.Item span={1} label="Billing Mode">Prepaid</Descriptions.Item>
                <Descriptions.Item span={3} label="Automatic Renewal">YES</Descriptions.Item>
                <Descriptions.Item span={1} label="Thời Gian Hoạt Động">2018-04-24 18:00:00</Descriptions.Item>
                <Descriptions.Item label="Usage Time" span={2}>
                2019-04-24 18:00:00
                </Descriptions.Item >
                <Descriptions.Item label="Status" span={3}>
                <Badge status="processing" text="Running" span={3}/>
                </Descriptions.Item>
                <Descriptions.Item span={3} label="Negotiated Amount">$80.00</Descriptions.Item>
                <Descriptions.Item span={3} label="Discount">$20.00</Descriptions.Item>
                <Descriptions.Item span={3} label="Official Receipts">$60.00</Descriptions.Item>
              
            </Descriptions>
         </div>
    )
}

export default Footer