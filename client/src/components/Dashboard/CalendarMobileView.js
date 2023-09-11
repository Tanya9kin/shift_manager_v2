import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useCalendarContext } from "./CalendarFunction";
import { format, parse, startOfToday } from "date-fns";
import { EventClass, PositionToFill, Role } from "../../classes/EventClass";
import {
  Flex,
  Grid,
  Text,
  IconButton,
  Badge,
  Separator,
  Container,
  Button,
  Heading,
  Box,
} from "@radix-ui/themes";

export default function CalendarMobileView() {
  const {
    setSelectedDay,
    selectedDay,
    canSetSelectedDay,
    classNamesForDays,
    prevMonth,
    nextMonth,
    firstDaySelectedMonth,
    dateHasEvents,
    daysInMonth,
    createNewEventMutation,
    allPositionsFull,
  } = useCalendarContext();

  function onClick() {
    const newEvent = new EventClass(null, "test event", startOfToday(), [
      new PositionToFill(
        "test position",
        new Role("instructor", "bachata"),
        null,
        null
      ),
    ]);
    createNewEventMutation.mutate(newEvent);
  }

  function Day({ day }) {
    return (
      <Button
        variant="soft"
        color="gray"
        size="3"
        onClick={() => (canSetSelectedDay() ? setSelectedDay(day) : null)}
      >
        <Flex direction="column" justify="center" gap="1">
          <Text
            className={
              "mx-auto flex h-6 w-6 items-center justify-center rounded-full" +
              classNamesForDays(day)
            }
          >
            {format(day, "d")}
          </Text>
          <Badge
            justify="end"
            color={allPositionsFull(day) ? "green" : "orange"}
            variant="solid"
            className={dateHasEvents(day) ? "visible" : "invisible"}
          ></Badge>
        </Flex>
      </Button>
    );
  }

  return (
    <Container px="3" width="max-content">
      <Flex
        py={{ initial: "3", md: "0" }}
        px="2"
        align="center"
        justify="space-between"
      >
        <Heading as="h3">{format(firstDaySelectedMonth, "MMMM yyyy")}</Heading>
        {/* <button onClick={onClick}>Create New Test Event</button> */}
        <Flex gap="2">
          <Button variant="ghost" color="gray" onClick={prevMonth}>
            <span className="sr-only">Prev Month</span>
            <FaChevronLeft
              className="w-5 h-5 hover:text-gray-700"
              aria-hidden="true"
            ></FaChevronLeft>
          </Button>
          <Button variant="ghost" color="gray" onClick={nextMonth}>
            <span className="sr-only">Next Month</span>
            <FaChevronRight
              className="w-5 h-5 hover:text-gray-700"
              aria-hidden="true"
            ></FaChevronRight>
          </Button>
        </Flex>
      </Flex>
      <Grid columns="7" justify="center" align="center" gap="3">
        <Text align="center">S</Text>
        <Text align="center">M</Text>
        <Text align="center">T</Text>
        <Text align="center">W</Text>
        <Text align="center">T</Text>
        <Text align="center">F</Text>
        <Text align="center">S</Text>
      </Grid>
      <Separator my="1" size="4" />
      <Grid
        columns="7"
        gapX="1"
        gapY="2"
        style={{ justifyItems: "center" }}
        height="max-content"
      >
        {daysInMonth.map((day) => (
          <Box key={day.toString()}>
            <Day day={day} />
          </Box>
        ))}
      </Grid>
    </Container>
  );
}
