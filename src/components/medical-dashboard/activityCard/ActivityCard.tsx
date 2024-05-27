import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseCard } from '../../common/BaseCard/BaseCard';
import { ActivityChart } from './ActivityChart';
import { ChartData } from 'interfaces/interfaces';
import styled from 'styled-components';
import axios from 'axios';

export const ActivityCard: React.FC = () => {
  const [data, setData] = useState<ChartData>([]);
  const [data2, setData2] = useState<ChartData>([]);
  const [data3, setData3] = useState<ChartData>([]);
  const [data4, setData4] = useState<ChartData>([]);

  const { t } = useTranslation();
  const fetch = async (url1: string, url2: string, url3: string, url4: string) => {
    const response1 = await axios.get(`http://192.168.1.102:5000/api/${url1}`);
    const result1: ChartData = response1.data;
    const response2 = await axios.get(`http://192.168.1.102:5000/api/${url2}`);
    const result2: ChartData = response2.data;
    const response3 = await axios.get(`http://192.168.1.102:5000/api/${url3}`);
    const result3: ChartData = response3.data;
    const response4 = await axios.get(`http://192.168.1.102:5000/api/${url4}`);
    const result4: ChartData = response4.data;
    setData(result1);
    setData2(result2);
    setData3(result3);
    setData4(result4);
  };
  useEffect(() => {
    fetch(
      'select_seven_water_records_view',
      'select_seven_power_records_view',
      'select_seven_coal_records_view',
      'select_seven_steam_records_view',
    );
  }, []);

  return (
    // <ActivityCardStyled id="activity" title={t('medical-dashboard.activity.title')} padding={0}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
      <ActivityCardStyled id="activity" title="七日内水能耗量" padding={0}>
        <ActivityChart data={data} />
      </ActivityCardStyled>
      <ActivityCardStyled id="activity" title="七日内电能耗量" padding={0}>
        <ActivityChart data={data2} />
      </ActivityCardStyled>
      <ActivityCardStyled id="activity" title="七日内煤能耗量" padding={0}>
        <ActivityChart data={data3} />
      </ActivityCardStyled>
      <ActivityCardStyled id="activity" title="七日内汽能耗量" padding={0}>
        <ActivityChart data={data4} />
      </ActivityCardStyled>
    </div>
  );
};

const ActivityCardStyled = styled(BaseCard)`
  height: 500px;
`;
