import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { BaseChart } from '@app/components/common/charts/BaseChart';
import Data from './data.json';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { themeObject } from '@app/styles/themes/themeVariables';
import axios from 'axios';

interface DataRow {
  id: string;
  fromDatasetId: string;
  transform: {
    type: string;
    config: { and: [{ dimension: string; gte: number }, { dimension: string; '=': string }] };
  };
}

interface SeriesRow {
  type: string;
  datasetId: string;
  showSymbol: boolean;
  name: string;
  endLabel: {
    show: boolean;
    formatter: (params: { value: string }) => string;
    color?: string;
  };
  labelLayout: {
    moveOverlap: string;
  };
  emphasis: {
    focus: string;
  };
  encode: {
    x: string;
    y: string;
    label: [string, string];
    itemName: string;
    tooltip: [string];
  };
}

export const LineRaceChart: React.FC = () => {
  // const [data, setData] = useState<DataRow[]>([]);
  // const [series, setSeries] = useState<SeriesRow[]>([]);
  // const rawData = JSON.parse(JSON.stringify(Data));
  const [data1, setData1] = useState<{ name: string; type: string; date: []; data: [] }[]>([]);
  const [days, setDays] = useState(['1', '2']);

  const { t } = useTranslation();

  const theme = useAppSelector((state) => state.theme.theme);
  const fetch = async () => {
    const response = await axios.get('http://192.168.1.102:5000/api/select_four_records_view');
    const result = response.data.map((item: any) => {
      let rename = '重命名';
      if (item.name === 'water_count') {
        rename = '水消耗异常数';
      } else if (item.name === 'power_count') {
        rename = '电消耗异常数';
      } else if (item.name === 'steam_count') {
        rename = '汽消耗异常数';
      } else if (item.name === 'coal_count') {
        rename = '煤消耗异常数';
      }
      return {
        name: rename,
        type: 'line',
        date: item.date,
        data: item.arr,
      };
    });
    setData1(result);
    setDays(result[0].date);
  };
  const runAnimation = useCallback(() => {}, [theme]);

  useEffect(() => {
    fetch();
    setTimeout(() => {
      runAnimation();
    }, 200);
  }, [runAnimation]);

  const option = {
    animationDuration: 5000,
    tooltip: {
      order: 'valueDesc',
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle',
      data: days,
    },
    yAxis: {
      name: '',
    },
    grid: {
      left: 65,
      right: 150,
      top: 20,
      bottom: 30,
    },
    series: data1,
  };

  return (
    <BaseCard padding="0 0 1.875rem" title={'异常趋势走向'}>
      <BaseChart option={option} height="24rem" />
    </BaseCard>
  );
};
