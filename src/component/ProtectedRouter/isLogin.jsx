import { Button, Result } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const IsLogin = () => {
  const nagivate = useNavigate()
 return <Result
  style={{marginTop : 150}}
    status="warning"
    title="Bạn cần phải đăng nhập để sử dụng tính năng này !"
    extra={
      <Button onClick={() => nagivate('/login')} type="primary" key="console">
        Login now
      </Button>
    }
  />
};
export default IsLogin;