export interface HealthFactor {
  value: number;
  name: string;
  description: string;
}

export const healthChartData: HealthFactor[] = [
  {
    value: 3,
    name: '水',
    description: 'medical-dashboard.health.lifestyle.description',
  },
  {
    value: 9,
    name: '汽',
    description: 'medical-dashboard.health.ecology.description',
  },
  {
    value: 15,
    name: '电',
    description: 'medical-dashboard.health.genetics.description',
  },
  {
    value: 1,
    name: '煤',
    description: 'medical-dashboard.health.medicine.description',
  },
];

// export const healthChartData: HealthFactor[] = [
//   {
//     value: 50,
//     name: 'medical-dashboard.health.lifestyle.title',
//     description: 'medical-dashboard.health.lifestyle.description',
//   },
//   {
//     value: 20,
//     name: 'medical-dashboard.health.ecology.title',
//     description: 'medical-dashboard.health.ecology.description',
//   },
//   {
//     value: 20,
//     name: 'medical-dashboard.health.genetics.title',
//     description: 'medical-dashboard.health.genetics.description',
//   },
//   {
//     value: 10,
//     name: 'medical-dashboard.health.medicine.title',
//     description: 'medical-dashboard.health.medicine.description',
//   },
// ];
