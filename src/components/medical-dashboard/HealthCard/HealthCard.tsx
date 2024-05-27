import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChartCustomLegend } from '../../common/charts/PieChartCustomLegend';
import { healthChartData } from 'constants/healthChartData';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import axios from 'axios';

export const HealthCard: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<{ value: number; name: string | undefined }[]>([]);

  const chartData = data.map((item) => ({
    ...item,
  }));
  const toData = (obj: any) => {
    const dataArray = [];
    let name;
    for (const key in obj) {
      name = key;
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        dataArray.push({ name, value }); // 创建新的对象并放入数组中
      }
    }
    return dataArray;
  };

  // const legendData = chartData.map((item) => ({ ...item, value: `${item.value}%` }));
  const fetch = async () => {
    const response = await axios.get('http://192.168.1.102:5000/api/select_pie_records_view');

    const result = toData(response.data);
    console.log(result);
    setData(result);
  };
  const legendData = chartData.map((item) => ({ ...item, value: `${item.value}` }));
  useEffect(() => {
    fetch();
  }, []);

  return (
    <BaseCard title="异常分类占比" padding={'0 1.25rem 1.875rem'}>
      <PieChartCustomLegend name="分类" chartData={data} legendData={legendData} height="300px" />
    </BaseCard>
  );
};
