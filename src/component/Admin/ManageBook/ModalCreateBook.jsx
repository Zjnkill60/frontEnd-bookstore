import { Col, Modal, Row} from 'antd';
import { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input , message,Select } from 'antd';
import { callUploadBookImg, handleCreateBook, handleCreateUser } from '../../../api/api';
import { PlusOutlined } from '@ant-design/icons';
import {  Upload } from 'antd'
import { baseURL } from '../../../baseURL';
import { v4 as uuidv4 } from 'uuid';


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


const ModalCreateBook= (props) => {
    const [form2] = Form.useForm()
    const {openModalCreate , setOpenModalCreate ,dataCategory,callGetAllBook} = props
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [imgThumbnail, setImgThumbnail] = useState([])
    const [imgSlider, setImgSlider] = useState([])
    const [itemSelect , setItemSelect] = useState()


    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };


    const onFinish = async (values) => {
    
        const {mainText  ,author , price,quantity,sold} = values
       
        const dataSliderCreate = imgSlider?.map(item => {
                 return item.name
        })
        let res  = await handleCreateBook(imgThumbnail[0].name , dataSliderCreate , mainText  , author ,Number(price)  ,Number(sold), Number(quantity) , itemSelect)
        if(res && res.data) {
            await callGetAllBook()
            message.success("Create new book success!")
            setOpenModalCreate(false)
            form2.setFieldsValue({
                mainText : "",
                author : "",
                price : "",
                quantity : "",
                sold : "",    

            })
            setImgSlider([])
            setImgThumbnail([])
            setItemSelect('Arts')
        }
      };

    const handleChangeSelect = (value) => {
        setItemSelect(value)
      };

    const handleUploadThumbnail = async ({file , onSuccess , onError}) => {
        let res = await callUploadBookImg(file)
        console.log(res)
        if(res && res.data) {
            onSuccess("OK")
            setImgThumbnail([{
                    uid: file.uid,
                    name: res.data.fileUploaded,
            }])
        }else {
            onError("Error !")
        }
    }
    

    const handleUploadSlider = async ({file , onSuccess , onError}) => {
        let res = await callUploadBookImg(file)
        console.log(res)
        if(res && res.data) {
            setImgSlider(imgSlider => [...imgSlider, {              
                    uid: file.uid,
                    name: res.data.fileUploaded,
                    url: `${baseURL}images/book/${res.data.fileUploaded}`,


            }] )
        }
    }

    const uploadButton = (
        <div>
          <PlusOutlined />
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
          </div>
        </div>
      )


   
        return (
        <>
            <Modal width={700}  title ="Create New Book" onOk={() => form2.submit()} open = {openModalCreate} onCancel={() =>setOpenModalCreate(false)} >
                     <Form      
                                initialValues={{
                                    category : "Arts"
                                }}
                                form={form2}
                                name="basic"
                                onFinish={onFinish}
                                style={{marginTop : 25}}
                                >

                               <Row gutter={20}>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >

                                        <Form.Item
                                            label="Tên sách"
                                            name="mainText"
                                            labelCol={{span : 24}}
                                             rules={[
                                                {
                                                required: true,
                                                message: 'Please input name!',
                                                },
                                            ]}
                                            >
                                            <Input />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                        <Form.Item
                                            label="Tác giả"
                                            name="author"
                                            labelCol={{span : 24}}
                                            rules={[
                                                {
                                                required: true,
                                                message: 'Please input tác giả!',
                                                },
                                            ]}
                                            >
                                            <Input />
                                         </Form.Item>
                                    </Col>
                               </Row>
                                
                                <Row gutter={30}>
                                    <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                                            <Form.Item
                                        label="Giá"
                                        name="price"
                                        labelCol={{span : 24}}
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please input price!',
                                            },
                                        ]}
                                        >
                                        <Input addonAfter="VND" type='number' />
                                            </Form.Item>

                                    </Col>

                                    <Col xs={24} sm={12} md={6} lg={6} xl={6}>

                                        <Form.Item
                                        label="Thể loại"
                                        name="category"
                                        labelCol={{span : 24}}
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please input thể loại!',
                                            },
                                        ]}
                                        >
                                             <Select
                                                
                                                name = "category"
                                                onChange={handleChangeSelect}
                                                options={dataCategory}
                                                />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                                            <Form.Item
                                        label="Số lượng"
                                        name="quantity"
                                        labelCol={{span : 24}}
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please input số lượng!',
                                            },
                                        ]}
                                        >
                                        <Input type='number'  />
                                        </Form.Item>

                                    </Col>

                                    <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                                            <Form.Item
                                        label="Đã bán "
                                        name="sold"
                                        labelCol={{span : 24}}
                                    
                                        >
                                        <Input type='number' />
                                        </Form.Item>
                                    </Col>
                                </Row>


                                <Row gutter={30}>
                                    <Col span={12} >
                                    <Form.Item
                                            label="Thumbnail Image"
                                            name="thumbnail"
                                            labelCol={{span : 24}}
                                             rules={[
                                                {
                                                required: true,
                                                message: 'Please input min 1 image!',
                                                },
                                            ]}
                                            >
                                            <Upload
                                                customRequest={handleUploadThumbnail}
                                                listType="picture-card"
                                                multiple = {false}
                                                maxCount={1}
                                                fileList={imgThumbnail.name}
                                                onPreview={handlePreview}
                                            >
                                             {imgThumbnail > 1 ? null : uploadButton}
                                            </Upload>
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                    <Form.Item
                                            label="Slider Image"
                                            name="slider"
                                            labelCol={{span : 24}}
                                             
                                            >
                                            <Upload
                                                customRequest={handleUploadSlider}
                                                listType="picture-card"
                                                fileList={imgSlider}
                                                onPreview={handlePreview}
                                            >
                                                {imgSlider >= 8 ? null : uploadButton}
                                            </Upload>
                                        </Form.Item>
                                    </Col>
                                </Row>
                    </Form>

            </Modal>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                alt="example"
                style={{
                    width: '100%',
                }}
                src={previewImage}
                />
            </Modal>
        </>
    )
}

export default ModalCreateBook
