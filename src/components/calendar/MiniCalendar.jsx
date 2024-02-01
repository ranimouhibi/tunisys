import React, { useState } from "react";
import Calendar from "react-calendar";
import Card from "components/card";
import "react-calendar/dist/Calendar.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "assets/css/MiniCalendar.css";

const MiniCalendar = () => {
  const [value, onChange] = useState(new Date());

  // Custom styles for the Calendar component
  const calendarStyles = {
    backgroundColor: "red", // Set the background color to red
    color: "white", // Set the text color to white (or any other color that contrasts well with red)
    borderRadius: "8px", // Add some border-radius for a rounded look
  };

  return (
    <div>
      <Card extra="flex w-full h-full flex-col px-3 py-3">
        <Calendar
          onChange={onChange}
          value={value}
          prevLabel={<MdChevronLeft className="ml-1 h-6 w-6 " />}
          nextLabel={<MdChevronRight className="ml-1 h-6 w-6 " />}
          view={"month"}
          style={calendarStyles} // Apply the custom styles to the Calendar component
        />
      </Card>
    </div>
  );
};

export default MiniCalendar;
