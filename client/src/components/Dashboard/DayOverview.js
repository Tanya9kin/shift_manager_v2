import React, { useState, useEffect } from "react";
import {
  Flex,
  Button,
  Text,
  Card,
  Section,
  Container,
  Box,
  Heading,
  Select,
} from "@radix-ui/themes";
import * as Accordion from "@radix-ui/react-accordion";
import { useCalendarContext } from "./CalendarFunction";
import { FaChevronDown } from "react-icons/fa";
import { format } from "date-fns";
import Position from "./Position";
import { useDayOverviewContext } from "./DayOverviewFunction";

export default function DayOverview() {
  const { selectedDay, editMode, toggleEditMode, selectedDayEvents } =
    useCalendarContext();
  const { handleSaveChanges, handleSubmit, control } = useDayOverviewContext();

  function handleClick(formValues) {
    console.log("handleClick");
    if (editMode) {
      handleSaveChanges(formValues);
      console.log(`formValues: ${JSON.stringify(formValues)}`);
    }

    toggleEditMode();
  }

  function Event({ event }) {
    return (
      <Accordion.Item className="AccordionItem" value="item-1">
        <Heading className="AccordionHeader">
          <Accordion.Trigger className="AccordionTrigger">
            <Flex align="center" direction="row" justify="between" width="100%">
              <Text as="p" size="2" className="capitalize">
                {event.title}
              </Text>
              <FaChevronDown className="AccordionChevron" />
            </Flex>
          </Accordion.Trigger>
        </Heading>
        <Accordion.Content className="AccordionContent">
          {event.getPositions().map((position, index) => (
            <Position
              key={position.id}
              positionKey={position.id}
              position={position}
            />
          ))}
        </Accordion.Content>
      </Accordion.Item>
    );
  }

  function EventsAccordion() {
    return (
      <Accordion.Root
        className="AccordionRoot"
        type="single"
        defaultValue="item-1"
        collapsible
      >
        {selectedDayEvents &&
          selectedDayEvents.map((event) => (
            <Event key={event.title} event={event} />
          ))}
      </Accordion.Root>
    );
  }

  return (
    <Container py={{ initial: "3", md: "0" }} px="3">
      <form onSubmit={handleSubmit(handleClick)}>
        <Flex direction="row" justify="between" align="center">
          <Heading as="h3" mb="2">
            Day Overview of {format(selectedDay, "dd MM yyyy")}
          </Heading>

          <Button type="submit" color={editMode ? "green" : "blue"}>
            {editMode ? "Save" : "Edit"}
          </Button>
        </Flex>
        <EventsAccordion />
      </form>
    </Container>
  );
}
