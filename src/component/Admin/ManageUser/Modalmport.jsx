import { Modal} from 'antd';
import { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input  } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import TableAdmin from '../TableAdmin/Table';
import * as XLSX from "xlsx";
import { handleCreateImportListUser } from '../../../api/api';
import templateFile from '../../../assets/fileTestImport.xlsx?url'

const { Dragger } = Upload;




const Modalmport = (props) => {
  const [dataImport , setDataImport] = useState([])
  const {openModalCreate , setOpenModalCreate ,fetchAllAccount ,dataShowModalOnClick} = props

const dummyRequest = ({file,onSuccess}) => {
  setTimeout(() => {
    onSuccess("ok")
  },1000)
}
const propsDrag = {
  name: 'file',
  maxCount : 1,
  accept : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  multiple: false,
  customRequest : dummyRequest,
  onChange(info) {
    const { status } = info.file;
 
    if (status === 'done') {
      handleImport(info.fileList[0].originFileObj)
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const handleImport = async (file) => {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data)
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(worksheet , {
        header : ["fullName","email","phone","password"],
        range : 1
      })
      let jsonDataNew = jsonData.map((item,index) => {
        return {
          key : index,
          "fullName" : item.fullName,
          "email" : item.email,
          "phone" : `${item.phone}`,
          "password" : `${item.password}`
        }
      })
      setDataImport(jsonDataNew)
      

  }

const handleOk = async () => {
  console.log(dataImport)
  let res = await handleCreateImportListUser(dataImport)
  if(res && res.statusCode == 201) {
    message.success(`Success : ${res.data.countSuccess} ----  Error : ${res.data.countError}`)
    await fetchAllAccount()
    setOpenModalCreate(false)
  }else {
    message.error(res.message)
  }
}

const columns = [
  {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
     
    },

  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    responsive: ['lg'],
  },

  {
    title: 'Full Name',
    dataIndex: 'fullName',
    key: 'fullname',

  },
  {
    title: 'Password',
    dataIndex: 'password',
    key: 'password',

  },




    
];


    
    return (
        <>
            <Modal width={'700px'} onOk={handleOk}   title ="Import List User"   okText = "Import"
              open = {openModalCreate} onCancel={() =>setOpenModalCreate(false)}
             >
                 <Dragger  style={{marginBottom : 20}} {...propsDrag}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. <a onClick={(e) => e.stopPropagation()} href={templateFile} download
                       style={{color :'#1677ff'}}>Click here to Download Example File</a>
                    </p>
                </Dragger>
                   
                   <TableAdmin dataSource = {dataImport} columns = {columns}/>
             </Modal>                 
        </>
    )
}

export default Modalmport