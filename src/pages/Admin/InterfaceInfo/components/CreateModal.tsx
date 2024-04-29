import {
  ModalForm, ProColumns,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea, ProTable,
  StepsForm,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React from 'react';
import {column} from "stylis";
export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

// 定义了一个TypeScript类型 名为 Props。使用 export 关键字表示该类型可以被其他模块导入和使用。
// 定义组件需要传的属性
// 在 TypeScript 中，type 关键字用于定义一个类型别名或类型。类型别名允许我们为一个已有的类型赋予一个新的名字，从而方便我们在代码中引用
export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  // 这个modal是否可见
  visible: boolean;
};

// Modal 模态框？？组件 接收一个Props参数并返回一个React组件
const CreateModal: React.FC<Props> = (props) => {
  // 从props中取出columns
  const {columns,visible,onCancel,onSubmit} = props;
  return (
    <Modal open={visible} onCancel={() => {onCancel?.()}}>
      {/*// 新建一条API接口信息*/}
      <ProTable type={'form'} columns={columns} onSubmit={
        async (value) => {
          onSubmit?.(value);
        }
      }/>
    </Modal>
  );
};
export default CreateModal;
