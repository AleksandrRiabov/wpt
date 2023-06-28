import { useEffect, useState } from "react";
import { GetTrailersDataResponse } from "../../state/types";
import { useUpdateTrailerMutation } from "../../state/api";

type Props = {
  id: string | undefined;
  editTrailerData: GetTrailersDataResponse | undefined;
};

function useHandlePost({ id, editTrailerData }: Props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [updateTrailer, { isLoading, error, isSuccess }] =
    useUpdateTrailerMutation();

  // Handle the submission of trailer details
  const handlePostTrailerDetails = async () => {
    if (!id || !editTrailerData) return;
    await updateTrailer({ id, details: editTrailerData });
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
      setSuccessMessage(
        `Trailer ${editTrailerData?.trailerNumber} has been Updated.`
      );
    }
  }, [isSuccess, editTrailerData?.trailerNumber]);

  const handleCloseSnackbar = (name: "success" | "error") => {
    if (name === "error") {
      setErrorMessage("");
    } else {
      setSuccessMessage("");
    }
  };

  return {
    handlePostTrailerDetails,
    handleCloseSnackbar,
    successMessage,
    errorMessage,
    updating: isLoading,
  };
}

export default useHandlePost;
