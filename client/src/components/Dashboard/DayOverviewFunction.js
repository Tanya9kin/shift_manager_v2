import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useForm, useFormState } from "react-hook-form";
import { TeamMember } from "../../classes/TeamMemberClass";
import { useCalendarContext } from "./CalendarFunction";
import { EventClass } from "../../classes/EventClass";

const DayOverviewContext = createContext();
export function useDayOverviewContext() {
  return useContext(DayOverviewContext);
}

const teamApi = axios.create({ baseURL: "http://localhost:5000/api/team" });
const eventsApi = axios.create({ baseURL: "http://localhost:5000/api/events" });

async function fetchTeamMembersForPosition(position) {
  console.log(
    `fetching team members for position ${position.getCategory()} ${position.getStyle()}`
  );
  return teamApi
    .get(`/${position.getCategory()}/${position.getStyle()}`)
    .then((res) => res.data.map((member) => TeamMember.fromRaw(member)));
}

export default function DayOverviewContextProvider({
  children,
  selectedDayEvents,
}) {
  function getTeamMembersForPosition(position) {
    return useQuery({
      queryKey: ["teamMembers", position],
      queryFn: () => fetchTeamMembersForPosition(position),
      enabled: !!position,
    });
  }

  //edit handling
  const eventsPositions = selectedDayEvents.map((event) => event.positions);
  const positions = eventsPositions.flat();

  const teamMemberForPosition = positions.map((position) => {
    return { position: position, teamMemberId: position.filled_by_id };
  });

  const defaultData = Object.fromEntries(
    teamMemberForPosition.map(({ position, teamMemberId }) => [
      position.id,
      teamMemberId || "",
    ])
  );

  function updatePositions(formValues) {
    return useQuery({
      queryKey: "updateEvent",
      queryFn: () => eventsApi.put(`/${selectedDayEvents[0].id}`, formValues),
    });
  }

  // console.log(defaultData);
  const form = useForm({ defaultValues: defaultData });
  const { register, control, handleSubmit, formState, errors, setValue } = form;

  function handleSaveChanges(formValues) {
    console.log("handleSaveChanges");
    console.log(JSON.stringify(formValues));

    updatePositions(formValues);
  }

  return (
    <DayOverviewContext.Provider
      value={{
        getTeamMembersForPosition,
        register,
        control,
        handleSubmit,
        formState,
        errors,
        handleSaveChanges,
        setValue,
      }}
    >
      {children}
    </DayOverviewContext.Provider>
  );
}
