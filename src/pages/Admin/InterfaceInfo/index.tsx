import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import type {SortOrder} from "antd/lib/table/interface";
import {
  addInterfaceInfoUsingPost,
  deleteInterfaceInfoUsingPost,
  listInterfaceInfoByPageUsingGet,
  offlineInterfaceInfoUsingPost,
  publishInterfaceInfoUsingPost,
  updateInterfaceInfoUsingPost
} from "@/services/API-backend/interfaceInfoController";
import CreateModal from "@/pages/Admin/InterfaceInfo/components/CreateModal";
import UpdateModal from "@/pages/Admin/InterfaceInfo/components/UpdateModal";



// 表单
const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  // useState钩子定义了一个名为ceareteModalOpen的状态变量和一个名为handleModalOpen的状态更新函数
    //handleModalOpen 是一个函数，用于更新 createModalOpen 的状态。
    //createModalOpen 是 useState 返回的状态变量，它的初始值为 false，表示创建模态框是关闭的。
    // handleModalOpen 是 useState 返回的更新函数，它用于更新 createModalOpen 的状态值。这个函数接受一个参数，用于指定新的状态值。在这个例子中，参数的类型是布尔类型，因为状态变量 createModalOpen 是布尔类型的。

  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param record
   */
// 处理删除的函数
  const handleRemove = async (record: API.InterfaceInfo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteInterfaceInfoUsingPost({
        id: record.id,
      });
      hide();
      message.success('Deleted successfully and will refresh soon');
      actionRef.current?.reload();
      return true;
    } catch (error:any) {
      hide();
      message.error('删除失败, '+ error.message);
      return false;
    }
  };

  /**
   *  发布 node
   * @zh-CN 发布接口
   *
   * @param record
   */
// 发布
  const handlePublish = async (record: API.InterfaceInfo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await publishInterfaceInfoUsingPost({
        id: record.id,
      });
      hide();
      message.success('published successfully and will refresh soon');
      actionRef.current?.reload();
      return true;
    } catch (error:any) {
      hide();
      message.error('发布失败, '+ error.message);
      return false;
    }
  };

  /**
   *  下线 node
   * @zh-CN 下线接口
   *
   * @param record
   */
// 下线
  const handleOffline = async (record: API.InterfaceInfo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await offlineInterfaceInfoUsingPost({
        id: record.id,
      });
      hide();
      message.success('offlined successfully and will refresh soon');
      actionRef.current?.reload();
      return true;
    } catch (error:any) {
      hide();
      message.error('下线失败, '+ error.message);
      return false;
    }
  };
  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
// 处理更新的函数
  const handleUpdate = async (fields: API.InterfaceInfo) => {
    const hide = message.loading('Configuring');
    try {
      await updateInterfaceInfoUsingPost({
        ...fields,
      });
      hide();
      message.success('Configuration is successful');
      handleUpdateModalOpen(false);
      actionRef.current?.reload();
      return true;
    } catch (error) {
      // 全局响应拦截器抛出的异常是在这里被捕获的
      hide();
      message.error('Configuration failed, please try again!');
      handleUpdateModalOpen(false);
      return false;
    }
  };


  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
// 处理新增的函数
  const handleAdd = async (fields: API.InterfaceInfo) => {
    const hide = message.loading('正在添加');
    try {
      await addInterfaceInfoUsingPost({
        ...fields,
      });
      hide();
      message.success('Added successfully');
      handleModalOpen(false);// 关闭显示
      actionRef.current?.reload();
      return true;
    } catch (error:any) {
      hide();
      message.error('创建失败!, ', error.message);
      handleModalOpen(false);
      return false;
    }
  };
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  // 定义了一个columns变量 类型是Procolomns，这是AntdesignPro用于描述表格中一列的类型
    // columns其实是一个ProColumns的“数组”
  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: '接口id',
      dataIndex: 'id',
      valueType: 'text',
      // 这里如果设置了这个，更新时id不会传给后端 导致报错，但是我又不想修改id，怎么办？
      // hideInForm:true,
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'moximoxi',
          },
        ],
      },
    },
    {
      title: '接口描述',
      dataIndex: 'description',
      valueType: 'textarea', // 富文本
    },
    {
      title: '方法',
      dataIndex: 'method',
      valueType: 'text',
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'text',
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'text',
    },
    {
      title: 'url',
      dataIndex: 'url',
      valueType: 'text',
    },

    {
      title: '状态',
      dataIndex: 'status',
      // hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '运行中',
          status: 'Processing',
        },
        // 2: {
        //   text: '已上线',
        //   status: 'Success',
        // },
        // 3: {
        //   text: '异常',
        //   status: 'Error',
        // },
      },
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'options',
      valueType: 'option',
      render: (_, record) => [
        <Button
          type={"text"}
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </Button>,
        <Button
          type={"text"}
          key="config"
          onClick={() => {
            handleRemove(record);
          }}
        >
          删除
        </Button>,
        record.status === 0 ? (
          <Button
            type={"text"}
            key="config"
            onClick={() => {
              handlePublish(record);
            }}
          >
            发布
          </Button>
        ) : null,

        record.status === 1 ? (
          <Button
            type={"text"}
            danger
            key="config"
            onClick={() => {
              handleOffline(record);
            }}
          >
            下线
          </Button>
        ) : null,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        // request是一个函数？
        request={async (
          params,
          sort: Record<string, SortOrder>,
          filter: Record<string, (string | number)[] | null>,
        ) => {
          // 这个函数接收三个参数

          const res = await listInterfaceInfoByPageUsingGet({
            ...params,
          });
          if (res?.data) {
            return {
              data: res?.data.records || [],
              success: true,
              total: res?.data.total,
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
              </span>
            </div>
          }
        >
          {/*<Button*/}
          {/*  onClick={async () => {*/}
          {/*    await handleRemove(selectedRowsState);*/}
          {/*    setSelectedRows([]);*/}
          {/*    actionRef.current?.reloadAndRest?.();*/}
          {/*  }}*/}
          {/*>*/}
          {/*  批量删除*/}
          {/*</Button>*/}
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>

      {/*  引入定义好的CreateModal React组件传入参数*/}
      <CreateModal
        columns={columns}
        onCancel={() => {
          handleModalOpen(false);
        }}
        onSubmit={(values) => {
          handleAdd(values);
        }}
        visible={createModalOpen}
      />

      {/*点击修改 弹出来的UpdateForm 引入组件*/}
      <UpdateModal
        columns={columns}
        onCancel={() => {
          handleUpdateModalOpen(false);
        }}
        onSubmit={(values) => {
          handleUpdate(values);
        }}
        visible={updateModalOpen}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};
export default TableList;
