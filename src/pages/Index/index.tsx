import { PageContainer } from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {List, message, Skeleton} from "antd";
import {listInterfaceInfoByPageUsingGet} from "@/services/API-backend/interfaceInfoController";

const Index: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);

  // 加载数据方法
  const loadData = async (current=1, pageSize=1) => {
    setLoading(true);// 表示正在加载
    try {
      const res = await listInterfaceInfoByPageUsingGet({
        current,pageSize
      });
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    }catch (error:any) {
      message.error("加载数据失败" + error.message);
    }
    setLoading(false);// 表示已经加载完成
  }
  // 加载数据的逻辑
  useEffect( ()=> {
    loadData(); // 首次加载的时候调用loadData
  },[])
  return (
    <PageContainer title={'在线接口开放平台'}>
      <List
        className="my-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => {
          const apiLink = `/interface_info/${item.id}`;
            return <List.Item
              actions={[<a href={apiLink} key={item.id}>查看</a>]}
            >
              <List.Item.Meta
                title={<a href={apiLink}>{item.name}</a>}
                description={item.description}
              />

            </List.Item>
          }
        }
        pagination={
          {
            pageSize:1,
            showTotal(total) {
              return '总数:'+total;
            },
            total:total,
            onChange(page,pageSize) {
              loadData(page,pageSize);
            },
          }
        }
      />
    </PageContainer>
  );
};

export default Index;
