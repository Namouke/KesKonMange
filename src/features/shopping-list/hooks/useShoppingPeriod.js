import { useEffect, useState } from "react";

function useShoppingPeriod() {
  const [startDate, setStartDate] = useState(
    () => localStorage.getItem("shoppingStartDate") || "",
  );

  const [endDate, setEndDate] = useState(
    () => localStorage.getItem("shoppingEndDate") || "",
  );

  function handleStartDateChange(event) {
    const newStartDate = event.target.value;

    setStartDate(newStartDate);

    if (endDate && endDate < newStartDate) {
      setEndDate("");
    }
  }

  function resetShoppingPeriod() {
    setStartDate("");
    setEndDate("");
  }

  useEffect(() => {
    localStorage.setItem("shoppingStartDate", startDate);
    localStorage.setItem("shoppingEndDate", endDate);
  }, [startDate, endDate]);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleStartDateChange,
    resetShoppingPeriod,
  };
}

export default useShoppingPeriod;
