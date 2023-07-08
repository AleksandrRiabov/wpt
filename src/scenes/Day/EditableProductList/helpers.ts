import { parse, format, addDays, subDays } from "date-fns";

export const palletsToTrailers = (pallets: number) => {
  if (!pallets || isNaN(pallets)) return 0;
  const trailers = Math.floor(pallets / 26);
  const palletsBalance = +(pallets % 26).toFixed(1);

  const balance = palletsBalance > 0 ? `& ${palletsBalance}p` : "";
  return `${trailers}t ${balance}`;
};

export const countExpectedPallets = (cases: number, coefficient: number) => {
  if (!cases || !coefficient || isNaN(cases) || isNaN(coefficient)) return 0;
  return +(cases / coefficient).toFixed(1);
};

interface FormattedDates {
  current: string;
  previous: string;
  next: string;
}

export const getFormattedDateWithAdjacentDays = (
  date: string | undefined
): FormattedDates => {
  try {
    if (!date) return { current: "No Date", previous: "", next: "" };

    const dateObject = parse(date, "dd-MM-yyyy", new Date());
    if (isNaN(dateObject.getTime())) {
      // Invalid date input
      return { current: "Invalid Date", previous: "", next: "" };
    }

    const formattedDate = (d: Date) => format(d, "EEEE dd-MM-yyyy");

    const previousDate = subDays(dateObject, 1);
    const nextDate = addDays(dateObject, 1);

    const formattedCurrentDate = formattedDate(dateObject);
    const formattedPreviousDate = format(previousDate, "dd-MM-yyyy");
    const formattedNextDate = format(nextDate, "dd-MM-yyyy");

    return {
      current: formattedCurrentDate,
      previous: formattedPreviousDate,
      next: formattedNextDate,
    };
  } catch (error) {
    // Handle any parsing or formatting errors here
    console.error("Error occurred while formatting date:", error);
    return { current: "Error Occurred", previous: "", next: "" };
  }
};
