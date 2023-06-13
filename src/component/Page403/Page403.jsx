import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';


export default function Page403 () {
    
    return (
        <div>
             <Result
                style={{
                    marginTop : 100
                }}
                status="403"
                title="403"
                subTitle="Xin lỗi ! Bạn không được cấp quyền để truy cập trang này :("
                extra={<Button type="primary"><Link to = '/'>Back Home</Link></Button>}
            />
        </div>
    )
}