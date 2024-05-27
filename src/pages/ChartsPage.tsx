import React from 'react';
import { useTranslation } from 'react-i18next';
import { GradientStackedAreaChart } from '@app/components/charts/GradientStackedAreaChart/GradientStackedAreaChart';
import { VisitorsPieChart } from '@app/components/charts/VisitorsPieChart';
import { BarAnimationDelayChart } from '@app/components/charts/BarAnimationDelayChart/BarAnimationDelayChart';
import { ScatterChart } from '@app/components/charts/ScatterChart/ScatterChart';
import { LineRaceChart } from '@app/components/charts/LineRaceChart/LineRaceChart';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { Tables } from '@app/components/tables/Tables/Tables';
import { Tables1 } from '@app/components/tables/Tables/Tables1';
import { Tables as Tables2 } from '@app/components/tables/Tables/Tables2';
import { HealthCard } from '@app/components/medical-dashboard/HealthCard/HealthCard';

const ChartsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.charts')}</PageTitle>
      <div style={{ display: 'flex', gap: '15px' }}>
        <div style={{ flex: 1 }}>
          <HealthCard />
        </div>
        <div style={{ flex: 1 }}>{/* <Tables /> */}</div>
      </div>
      <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
        <div style={{ flex: 1 }}>
          <HealthCard />;
        </div>
        <div style={{ flex: 1 }}>
          <Tables1 />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
        <div style={{ flex: 1 }}>
          <HealthCard />;
        </div>
        <div style={{ flex: 1 }}>{/* <Tables2 /> */}</div>
      </div>
    </>
  );
};

export default ChartsPage;
