import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tables1 } from '@app/components/tables/Tables/Tables1';
import { Tables as Tables2 } from '@app/components/tables/Tables/Tables2';
import { Tables } from '@app/components/tables/Tables/Tables';
import { healthChartData } from 'constants/healthChartData';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { PieChartCustomLegend } from '@app/components/common/charts/PieChartCustomLegend';
import * as S from './DashboardPage.styles';
import axios from 'axios';
const ChartsPage: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<{ value: number; name: string | undefined }[]>([]);
  const [data1, setData1] = useState<{ value: number; name: string | undefined }[]>([]);
  const [data2, setData2] = useState<{ value: number; name: string | undefined }[]>([]);
  const chartData = data.map((item) => ({
    ...item,
  }));
  const chartData1 = data1.map((item) => ({
    ...item,
  }));
  const chartData2 = data2.map((item) => ({
    ...item,
  }));
  const toData = (obj: any) => {
    const dataArray = [];
    let name;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key]; // 将值转换为整数
        if (key === 'boiler_feed_water') {
          name = '锅炉给水';
        } else if (key === 'inter_supply_water_supplementary_ton') {
          name = '去糖间补水';
        } else if (key === 'inter_supply_water_volume_ton') {
          name = '去糖间供水';
        } else if (key === 'ro_concentrate_water') {
          name = '一级反渗透浓水';
        } else if (key === 'ro_feed_water') {
          name = '一级反渗透进水';
        } else if (key === 'grid_electricity_external') {
          name = '外网电';
        } else if (key === 'intermediate_electricity_sugar') {
          name = '糖间用电';
        } else if (key === 'maintenance_electricity') {
          name = '维修用电';
        } else if (key === 'self_generated_electricity') {
          name = '自发电';
        } else if (key === 'power_electricity') {
          name = '动力用电';
        } else if (key === 'gas_supply_sugar') {
          name = '制糖供汽';
        } else if (key === 'inter_steam_supply_volume') {
          name = '去糖间供汽';
        } else if (key === 'sodium_hypochlorite') {
          name = '汽轮机排气量';
        } else if (key === 'sewage_gas') {
          name = '汽轮机进气量';
        } else if (key === 'steam_supply_enthalpy_sugar_removal') {
          name = '供汽涵值';
        }
        dataArray.push({ value, name }); // 创建新的对象并放入数组中
      }
    }
    return dataArray;
  };

  // const legendData = chartData.map((item) => ({ ...item, value: `${item.value}%` }));
  const fetch = async () => {
    const response = await axios.get('http://192.168.1.102:5000/api/select_water_records_view');
    console.log(response.data);
    const response1 = await axios.get('http://192.168.1.102:5000/api/select_electricity_records_view');
    const response2 = await axios.get('http://192.168.1.102:5000/api/select_sugar_records_view');
    const result = toData(response.data[0]);
    const result1 = toData(response1.data[0]);
    const result2 = toData(response2.data[0]);
    setData(result); // eslint-disable-next-line
    setData1(result1); // eslint-disable-next-line
    setData2(result2); // eslint-disable-next-line
  };
  const legendData = chartData.map((item) => ({ ...item, value: `${item.value}` }));
  const legendData1 = chartData1.map((item) => ({ ...item, value: `${item.value}` }));

  const legendData2 = chartData2.map((item) => ({ ...item, value: `${item.value}` }));

  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      {/* <PageTitle>{t('common.charts')}</PageTitle> */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', marginLeft: '45px' }}>
        <BaseCard title="重要水指标消耗占比" padding={'0 1.25rem 1.875rem'} style={{ flex: 1 }}>
          <PieChartCustomLegend
            name="分类"
            chartData={data}
            legendData={legendData}
            height="350px"
            // width="250px"
          />
        </BaseCard>
        <BaseCard padding={'0 1.25rem 1.875rem'} style={{ flex: 1 }}>
          <Tables />
        </BaseCard>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', marginLeft: '45px' }}>
        <BaseCard title="重要电指标消耗占比" padding={'0 1.25rem 1.875rem'} style={{ flex: 1 }}>
          <PieChartCustomLegend
            name="分类"
            chartData={data1}
            legendData={legendData1}
            height="350px"
            // width="250px"
          />
        </BaseCard>
        <BaseCard padding={'0 1.25rem 1.875rem'} style={{ flex: 1 }}>
          <Tables1 />
        </BaseCard>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', marginLeft: '45px' }}>
        <BaseCard title="重要汽指标消耗占比" padding={'0 1.25rem 1.875rem'} style={{ flex: 1 }}>
          <PieChartCustomLegend
            name="分类"
            chartData={data2}
            legendData={legendData2}
            height="350px"
            // width="250px"
          />
        </BaseCard>
        <BaseCard padding={'0 1.25rem 1.875rem'} style={{ flex: 1 }}>
          <Tables2 />
        </BaseCard>
      </div>
    </>
  );
};

export default ChartsPage;
