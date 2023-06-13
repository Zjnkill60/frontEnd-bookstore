import Page403 from "../Page403/Page403"
import IsLogin from "./isLogin"

const ProtectedRouter = (props) => {
    const {dataUserLogin} = props
    if(dataUserLogin.isAuthenticated == false) {
        return <IsLogin/>
    }else {
        if(dataUserLogin.user.role == 'ADMIN') {
            return props.children
        }else {
            return <Page403/>
        }
    }
  
}

export default ProtectedRouter