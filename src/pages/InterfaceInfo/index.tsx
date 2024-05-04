import { PageContainer } from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {Button, Card, Descriptions, Form, Input, List, message, Skeleton} from "antd";
import {
  getInterfaceInfoByIdUsingGet,
  listInterfaceInfoByPageUsingGet
} from "@/services/API-backend/interfaceInfoController";
import {useMatch, useParams} from "react-router";
import TextArea from "antd/es/input/TextArea";


const Index: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  // const match = useMatch('/interface_info/:id')
  const params = useParams();
  // 加载数据方法
  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);// 表示正在加载
    try {
      const res = await getInterfaceInfoByIdUsingGet({
        id: Number(params.id),
      });
      setData(res.data)
    }catch (error:any) {
      message.error("加载数据失败" + error.message);
    }
    setLoading(false);// 表示已经加载完成
  }
  const onFinish = (values: any) => {
    console.log(values);
  };
  // 加载数据的逻辑
  useEffect( ()=> {
    loadData(); // 首次加载的时候调用loadData
  },[])
  return (
    <PageContainer title={'查看接口文档'}>
      <Card>
        {data ? (
          // column 每行只展示一条数据
          <Descriptions title="Interface Info" column={1}>
            <Descriptions.Item label="接口名称">{data.name}</Descriptions.Item>
            <Descriptions.Item label="接口描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>
      <Card>
        <Form
          name="invoke"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          // style={{ maxWidth: 600 }}
          layout={"vertical"}
          onFinish={onFinish}
        >
          <Form.Item
            label="请求参数"
            name="requestParams"
          >
            <TextArea/>
          </Form.Item>


          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              发送
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default Index;
