export interface Statistic {
  id: number;
  value: number;
  prevValue: number;
  unit: '条';
}

export const getStatistics = (): Promise<Statistic[]> => {
  return new Promise((res) => {
    setTimeout(() => {
      res([
        {
          id: 1,
          value: 2890,
          prevValue: 2850,
          unit: '条',
        },
        {
          id: 2,
          value: 2862,
          prevValue: 2833,
          // unit: 'kg',
          unit: '条',
        },
        {
          id: 3,
          value: 28,
          prevValue: 27,
          //   unit: 'kg',
          unit: '条',
        },
        {
          id: 4,
          value: 78,
          prevValue: 90,
          // unit: 'kg',
          unit: '条',
        },
      ]);
    }, 0);
  });
};
