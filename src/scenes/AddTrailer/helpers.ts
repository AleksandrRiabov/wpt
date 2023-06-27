import { FormState } from "./types";
import { format } from "date-fns";

type GeneratRefArguments = {
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  trailerNumber: string;
  contractor: string;
  deliveryDate: Date;
};

// Generates Reference for the trailer if contractor is JCARRION.
// Reference made from Delivery Date + digits from trailer number
export const generateJcarrionReference = ({
  setFormState,
  trailerNumber,
  contractor,
  deliveryDate,
}: GeneratRefArguments) => {
  if (contractor === "JCARRION" && trailerNumber.length > 7) {
    const formattedDeliveryDate = format(deliveryDate, "dd-MM-yy")
      .split("-")
      .join("");
    const newReference = `${formattedDeliveryDate}${trailerNumber.slice(1, 5)}`;

    setFormState((prevState: FormState) => ({
      ...prevState,
      reference: newReference,
    }));
  }
};
