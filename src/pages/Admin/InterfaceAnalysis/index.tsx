import {
  PageContainer,
} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useEffect, useRef, useState} from 'react';
import ReactECharts from 'echarts-for-react';
import {listTopInterfaceInfoInvokeUsingGet} from "@/services/API-backend/analysisController";  // or var ReactECharts = require('echarts-for-react');


/**
 * 接口分析
 * @constructor
 */
const InterfaceAnalysis: React.FC = () => {
  // 定义 饼状图数据
  const [data, setData] = useState<API.InterfaceInfoVO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // todo 从远程获取数据
    try {
      listTopInterfaceInfoInvokeUsingGet().then(res => {
        if (res.data) {
          setData(res.data);
          setLoading(false);
        }
      })
    }catch (e: any) {

    }
  }, [])// 数组[] 里面的元素发生改变时会重新触发这个钩子函数，因此如果想只触发一次，就放一个空数组

  const chartData = data.map(item => {
    return {
      value: item.totalNum,
      name: item.name,
    }
  })
  const options = {
    title: {
      text: 'Top3 Invoked Interface',
      subtext: 'True Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  return (
    <PageContainer>
      <ReactECharts
        showLoading={loading}
        option={options}
      />
    </PageContainer>
  );
};
export default InterfaceAnalysis;
