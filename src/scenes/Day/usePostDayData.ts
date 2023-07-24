import { useEffect, useState } from "react";
import { useCreateDayMutation } from "../../state/api";
import { DataRow } from "../Day/types";

type UsePostDayDataProps = {
  tableData: DataRow[];
  date: string | undefined;
};

function usePostDayData({ tableData, date }: UsePostDayDataProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // =============   Create Day Post request =============
  const [createDay, { isLoading, error, isSuccess }] = useCreateDayMutation();

  // Handle the submission of day details
  const handleCreateDay = () => {
    if (!date || !tableData) return;
    createDay({ products: tableData, date });
  };

  // useEffects for updating notification messages
  useEffect(() => {
    if (error) {
      if ("status" in error) {
        setErrorMessage("Error. Please try again later..");
      }
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      setSuccessMessage(`Day details have been Updated.`);
    }
  }, [isSuccess]);

  const handleCloseSnackbar = (name: "success" | "error") => {
    if (name === "error") {
      setErrorMessage("");
    } else {
      setSuccessMessage("");
    }
  };

  return {
    handleCreateDay,
    handleCloseSnackbar,
    successMessage,
    errorMessage,
    updating: isLoading,
  };
}

export default usePostDayData;
