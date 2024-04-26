import {
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, {useEffect, useRef} from 'react';
import {ProFormInstance} from "@ant-design/pro-form/lib";

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;
/**
 * 修改框 点击修改以后会弹出来
 */
// 定义了一个TypeScript类型 名为 Props。使用 export 关键字表示该类型可以被其他模块导入和使用。
// 定义组件需要传的属性
// 在 TypeScript 中，type 关键字用于定义一个类型别名或类型。类型别名允许我们为一个已有的类型赋予一个新的名字，从而方便我们在代码中引用
export type Props = {
  values: API.InterfaceInfo,
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  // 这个modal是否可见
  visible: boolean;
};

// Modal 模态框？？组件 接收一个Props参数并返回一个React组件
const UpdateModal: React.FC<Props> = (props) => {

  // 从props中取出columns
  const {columns,visible,onCancel,onSubmit,values} = props;
  const formRef = useRef<ProFormInstance>();

  // 监听values 只要values一改变 就改变formRef的值
  useEffect(() => {
    // formRef?.setFieldsValue(values);
    if (formRef) {
      formRef.current?.setFieldsValue(values);
    }
  }, [values])
  return (
    <Modal open={visible} onCancel={() => {onCancel?.()}}>
      {/*// 新建一条API接口信息*/}
      <ProTable
        type={'form'}
        columns={columns}
        // initialValues: values,
        formRef={formRef}
        onSubmit={
        async (value) => {
          onSubmit?.(value);
        }
      }/>
    </Modal>
  );
};
export default UpdateModal;
