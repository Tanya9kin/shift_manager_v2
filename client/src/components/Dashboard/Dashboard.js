import React, { useState } from "react";
import CalendarMobile from "./CalendarMobileView";
import CalendarDesktop from "./CalendarDesktopView";
import DayOverview from "./DayOverview";
import DayOverviewContextProvider from "./DayOverviewFunction";
import { useCalendarContext } from "./CalendarFunction";
import { Flex, Separator } from "@radix-ui/themes";

export default function Dashborad() {
  const mql = window.matchMedia("(max-width: 1200px)");
  const { selectedDayEvents } = useCalendarContext();
  const [mobileView, setMobileView] = useState(mql.matches);

  mql.addEventListener("change", (e) => {
    setMobileView(mql.matches);
  });

  return (
    <Flex justify="center" gap="1" wrap="wrap">
      {mobileView ? <CalendarMobile /> : <CalendarDesktop />}
      <Separator orientation="vertical" />
      <DayOverviewContextProvider selectedDayEvents={selectedDayEvents}>
        <DayOverview />
      </DayOverviewContextProvider>
    </Flex>
  );
}
