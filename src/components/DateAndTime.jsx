import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

export default function BasicDateTimePicker() {
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleDateTimeChange = (newDateTime) => {
    setSelectedDateTime(newDateTime);

    if (newDateTime) {
      const formattedDateTime = newDateTime.format("YYYY-MM-DD HH:mm:ss");
      console.log(formattedDateTime, 'Selected DateTime');
    }
  };

 

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <DateTimePicker
          label="Book your service"
          value={selectedDateTime}
          onChange={handleDateTimeChange}
          // shouldDisableDate={shouldDisableDate}
          // shouldDisableTime={shouldDisableTime}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
