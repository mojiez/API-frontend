import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React from 'react';
export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

// 定义了一个TypeScript类型 名为 Props。使用 export 关键字表示该类型可以被其他模块导入和使用。
// 定义组件需要传的属性
export type Props = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.RuleListItem>;
};

// Modal 模态框？？组件
const CreateModal: React.FC<Props> = (props) => {
  return (
    // 新建一条API接口信息
    <ModalForm
      title={'新建规则'}
      width="400px"
      open={createModalOpen}
      onOpenChange={handleModalOpen}
      onFinish={async (value) => {
        const success = await handleAdd(value as API.RuleListItem);
        if (success) {
          handleModalOpen(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
      }}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: '规则名称为必填项',
          },
        ]}
        width="md"
        name="name"
      />
      <ProFormTextArea width="md" name="desc" />
    </ModalForm>
  );
};
export default CreateModal;
