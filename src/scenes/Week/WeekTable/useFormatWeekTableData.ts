import { addDays, format } from "date-fns";

type Props = {
  startDate: Date | null;
  data: {
    cases: number;
    pallets: number;
    name: string;
  }[];
};

const useFormatWeekTableData = ({ startDate, data }: Props) => {
  // Function to initialize the table data with default values for each day of the week
  const inintiateTableData = (startDate: Date | null) => {
    // Check if startDate is null or undefined
    if (!startDate) return;

    // Create an empty object to store data for each day of the week
    const weekDays: Record<
      string,
      { date: string; cases: number; pallets: number }
    > = {};

    // Loop through 7 days of the week
    for (let i = 0; i < 7; i++) {
      // Calculate the date for the current day of the week
      const dayDate = addDays(startDate, i);
      // Format the date as "dd-MM-yyyy"
      const dayDateString = format(dayDate, "dd-MM-yyyy");
      // Initialize the data for the current day with default values
      weekDays[dayDateString] = { date: dayDateString, cases: 0, pallets: 0 };
    }
    // Return the initialized weekDays object
    return weekDays;
  };

  // Function to format the table data with provided cases, pallets, and name information
  const formatTableData = (
    startDate: Date | null,
    data: {
      cases: number;
      pallets: number;
      name: string;
    }[]
  ) => {
    // Initialize table data using the inintiateTableData function
    const tableData = inintiateTableData(startDate);

    // Check if tableData is null or undefined
    if (!tableData) return;

    // Iterate through the provided data
    data.forEach((date) => {
      // Update the tableData with cases and pallets information for the corresponding date
      tableData[date.name] = { ...tableData[date.name], ...date };
    });

    // Convert the tableData object into an array of formatted data
    const formatedData = Object.values(tableData);

    // Return the formatted data
    return formatedData;
  };

  const weekTableData = formatTableData(startDate, data);

  return { weekTableData };
};

export default useFormatWeekTableData;
