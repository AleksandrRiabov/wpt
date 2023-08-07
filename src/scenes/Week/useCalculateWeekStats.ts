type Props = {
  data: {
    cases: number;
    pallets: number;
    name: string;
  }[];
};

const useCalculateWeekStats = ({ data }: Props) => {
  const { totalCases, totalPallets } = data.reduce(
    (totals, entry) => {
      totals.totalCases += entry.cases;
      totals.totalPallets += entry.pallets;
      return totals;
    },
    { totalCases: 0, totalPallets: 0 }
  );

  const averageCases = totalCases / data.length;
  const averagePallets = totalPallets / data.length;

  return { totalCases, totalPallets, averageCases, averagePallets };
};

export default useCalculateWeekStats;
