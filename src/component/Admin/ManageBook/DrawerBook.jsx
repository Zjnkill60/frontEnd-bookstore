import { Button, Drawer, Row,Col, Divider, message } from 'antd';
import { Descriptions,Badge } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { UserOutlined,HistoryOutlined,LogoutOutlined,LoginOutlined,EditOutlined,AuditOutlined,FacebookOutlined,PhoneOutlined} from '@ant-design/icons';
import {baseURL} from '../../../baseURL'


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


const DrawerApp = (props) => {
    const {open , setOpen,dataShowDrawerOnClick,handleShowerDrawer } = props
    const [width , setWidth] = useState(screen.width)
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };


  const onClose = () => {
    setOpen(false);
  };



  useEffect(() =>  {
   let a = window.addEventListener('resize' , (e) => {
        setWidth(e.currentTarget.innerWidth)
    })


    let dataSlider =  dataShowDrawerOnClick?.slider?.map((item,index) => {
            return {
              uid: index,
              name: 'image.png',
              status: 'done',
              url: `${baseURL}images/book/${item}`
            }
    })

    let dataThumbnail = {
              uid: dataShowDrawerOnClick?._id,
              name: 'image.png',
              status: 'done',
              url: `${baseURL}images/book/${dataShowDrawerOnClick?.thumbnail}`
    }

    dataSlider?.unshift(dataThumbnail)
    

      
       setFileList(dataSlider)
    

    return window.removeEventListener('resize',a)
  },[dataShowDrawerOnClick])

  console.log(dataShowDrawerOnClick)
  return (
    <>
   
      
    <Drawer width={width < 700 ? '92%' : `70%`} title="Book Detail" placement="right" onClose={onClose} open={open}>
             <Descriptions bordered>
                <Descriptions.Item span={3} label="ID">{dataShowDrawerOnClick?._id}</Descriptions.Item>
                <Descriptions.Item span={3} label="Tên Sách">{dataShowDrawerOnClick?.mainText}</Descriptions.Item>
                <Descriptions.Item span={2} label="Tác Gả">{dataShowDrawerOnClick?.author}</Descriptions.Item>
                <Descriptions.Item span={1} label="Loại sách">{dataShowDrawerOnClick?.category}</Descriptions.Item>
                <Descriptions.Item label="Price" span={2}>
                    {dataShowDrawerOnClick?.price}
                </Descriptions.Item >
                <Descriptions.Item label="Số lượng" span={3}>
                <Badge status="processing" text= {dataShowDrawerOnClick?.quantity} span={3}/>
                </Descriptions.Item>
                <Descriptions.Item span={3} label="Thời Gian Tạo">{dataShowDrawerOnClick?.createdAt}</Descriptions.Item>
                <Descriptions.Item span={3} label="Sửa Gần Nhất">{dataShowDrawerOnClick.updatedAt}</Descriptions.Item>

               
            </Descriptions>
            <div style={{margin : 20 , marginBottom : 40 }}>
              <Upload
                listType="picture-card"
                showUploadList ={{showRemoveIcon : false}}                
                
                fileList={fileList}
                onPreview={handlePreview}
              >
              </Upload>
              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={previewImage}
                />
              </Modal>
            
                    
            </div>
        
    </Drawer>
    </>
  );
};
export default DrawerApp;