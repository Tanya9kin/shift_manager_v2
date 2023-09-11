import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

export default function Navbar() {
  return (
    <Flex direction="row" width="100%" gap="2" align="center">
      <Button variant="soft">
        <a href="/dashboard">Dashboard</a>
      </Button>
      <Button variant="soft">Team</Button>
      <Button variant="soft">New Event</Button>
      <Button variant="soft">New Month</Button>
      <Button variant="soft">Publish</Button>
    </Flex>
  );
}
