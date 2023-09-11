import React, { useState, useContext, useEffect, createContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { EventClass, PositionToFill, Role } from "../../classes/EventClass";
import axios from "axios";
import {
  isEqual,
  isSameDay,
  format,
  startOfWeek,
  startOfToday,
  isSameMonth,
  eachDayOfInterval,
  getYear,
  parse,
  endOfWeek,
  endOfMonth,
  getMonth,
  isToday,
  startOfMonth,
  subMonths,
  addMonths,
  parseISO,
} from "date-fns";

const CalendarContext = createContext();
export function useCalendarContext() {
  return useContext(CalendarContext);
}

const api = axios.create({ baseURL: "http://localhost:5000/api/calendar" });

async function fetchEvents(month, year) {
  console.log(`fetching events for month ${month + 1} of year ${year}`);
  return api
    .get(`/${year}/${month + 1}`)
    .then((res) => res.data.map((event) => EventClass.fromRaw(event)));
}

export default function CalendarContextProvider({ children }) {
  // console.log("CalendarContextProvider");
  const [editMode, setEditMode] = useState(false);
  const [today, setToday] = useState(startOfToday());
  const [selectedDay, setSelectedDay] = useState(today);
  const [firstDaySelectedMonth, setFirstDaySelectedMonth] = useState(
    startOfMonth(today)
  );

  const [daysInMonth, setDaysInMonth] = useState(
    eachDayOfInterval({
      start: startOfWeek(firstDaySelectedMonth),
      end: endOfWeek(endOfMonth(firstDaySelectedMonth)),
    })
  );

  const [selectedDayEvents, setSelectedDayEvents] = useState([]);

  useEffect(() => {
    setDaysInMonth(
      eachDayOfInterval({
        start: startOfWeek(firstDaySelectedMonth),
        end: endOfWeek(endOfMonth(firstDaySelectedMonth)),
      })
    );
  }, [firstDaySelectedMonth]);

  useEffect(() => {
    isFetchedEvents && setSelectedDayEvents(eventsForDay(selectedDay));
  }, [selectedDay, events]);

  const {
    data: events,
    isLoading: isLoadingEvents,
    isFetched: isFetchedEvents,
  } = useQuery({
    queryKey: [
      "events",
      getMonth(firstDaySelectedMonth),
      getYear(firstDaySelectedMonth),
    ],
    queryFn: () =>
      fetchEvents(
        getMonth(firstDaySelectedMonth),
        getYear(firstDaySelectedMonth)
      ),
    enabled: !!firstDaySelectedMonth, // Enable query only if firstDayCurrentMonth is truthy
  });

  function dateHasEvents(day) {
    return (
      isFetchedEvents && events.some((event) => isSameDay(day, event.date))
    );
  }

  function nextMonth() {
    setFirstDaySelectedMonth((curr) => addMonths(curr, 1));
  }

  function prevMonth() {
    setFirstDaySelectedMonth((curr) => subMonths(curr, 1));
  }

  function canSetSelectedDay() {
    return !editMode;
  }

  function classNamesForDays(day) {
    const dayIsToday = isToday(day);
    const dayIsSelected = isEqual(day, selectedDay);
    const dayFromCurrentMonth = isSameMonth(day, firstDaySelectedMonth);

    if (dayFromCurrentMonth && !dayIsToday && !dayIsSelected) {
      return "  text-gray-900";
    } else if (!dayIsToday && !dayIsSelected) {
      return " text-gray-400";
    } else if (!dayIsToday && dayIsSelected) {
      return " text-white bg-gray-900/60 font-semibold";
    } else if (dayIsToday && dayIsSelected) {
      return " bg-blue-500 text-white font-semibold";
    } else if (dayIsToday && !dayIsSelected) {
      return " text-blue-500 font-semibold";
    }
  }

  function eventsForDay(day) {
    // isFetchedEvents && events.map((event) => console.log(event));
    return events && events.filter((event) => isSameDay(day, event.date));
  }

  function allPositionsFull(day) {
    const daysEvents = eventsForDay(day);
    if (!daysEvents) return false;
    return (
      daysEvents.length ===
      daysEvents.filter((event) => event.positionsFull()).length
    );
  }

  const createNewEventMutation = useMutation({
    mutationFn: (newData) => api.post("/event", newData),
  });

  function toggleEditMode() {
    setEditMode((prev) => !prev);
  }

  return (
    <CalendarContext.Provider
      value={{
        dateHasEvents,
        isLoadingEvents,
        isFetchedEvents,
        events,
        daysInMonth,
        selectedDay,
        setSelectedDay,
        firstDaySelectedMonth,
        nextMonth,
        prevMonth,
        classNamesForDays,
        canSetSelectedDay,
        eventsForDay,
        createNewEventMutation,
        editMode,
        toggleEditMode,
        allPositionsFull,
        selectedDayEvents,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
