import React from "react";
import { useCalendarContext } from "./CalendarFunction";
import { format } from "date-fns";

function Event(event) {
  return (
    <div className="flex place-content-between bg-info-900 text-white rounded p-1 text-sm mb-1">
      {event.title}
    </div>
  );
}

export default function CalendarDesktopView() {
  const {
    nextMonth,
    prevMonth,
    currentMonthAndYear,
    setSelectedDay,
    canSetSelectedDay,
    classNamesForDays,
    events,
    eventsForDay,
    daysInMonth,
  } = useCalendarContext();

  function Day(day) {
    const events = eventsForDay(day);

    return (
      <div
        key={day.toString()}
        className={
          "border p-1 overflow-auto transition cursor-pointer duration-300 ease hover:bg-gray-200 "
        }
        onClick={canSetSelectedDay() && setSelectedDay(day)}
      >
        <div className="flex flex-col w-full mx-auto ">
          <div className=" text-center top h-4 w-full mb-2">
            <span
              className={
                "mx-auto flex h-6 w-6 items-center justify-center rounded-full" +
                classNamesForDays(day)
              }
            >
              {day.getDate()}
            </span>
          </div>
          <div className="bottom flex-grow h-24 py-1 w-full cursor-pointer">
            {events &&
              events.map((event) => <Event key={event.id} event={event} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-4 mt-4">
      <div className="wrapper bg-white rounded shadow w-full ">
        <div className="header flex justify-between border-b p-2">
          <h2 className="flex-auto font-semibold text-grey-900">
            {format(currentMonthAndYear, "MMMM yyyy")}
          </h2>{" "}
          <div className="flex items-center">
            <button
              className="flex justify-center p-1.5 text-gray-400 hover:text-gray-500"
              onClick={prevMonth}
            >
              <span className="sr-only">Prev Month</span>
              <FaChevronLeft
                className="w-5 h-5"
                aria-hidden="true"
              ></FaChevronLeft>
            </button>
            <button
              className="flex justify-center p-1.5 text-gray-400 hover:text-gray-500"
              onClick={nextMonth}
            >
              <span className="sr-only">Next Month</span>
              <FaChevronRight
                className="w-5 h-5"
                aria-hidden="true"
              ></FaChevronRight>
            </button>
          </div>
        </div>
        <div className="w-full grid grid-cols-7 mt-3 text-xs leading-6 text-center text-gray-500">
          <div className="p-2 border-r">Sun</div>
          <div className="p-2 border-r">Mon</div>
          <div className="p-2 border-r">Tue</div>
          <div className="p-2 border-r">Wen</div>
          <div className="p-2 border-r">Thu</div>
          <div className="p-2 border-r">Fri</div>
          <div className="p-2 border-r">Sat</div>
        </div>
        <div className="grid grid-cols-7 mt-2 text-sm">
          {daysInMonth.map((day) => (
            <Day key={day.toString()} day={day} />
          ))}
        </div>
      </div>
    </div>
  );
}
