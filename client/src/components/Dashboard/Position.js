import React, { forwardRef } from "react";
import { useCalendarContext } from "./CalendarFunction";
import { Card, Flex, Text, Box, Select } from "@radix-ui/themes";
import { useDayOverviewContext } from "./DayOverviewFunction";
import { Controller } from "react-hook-form";

export default function Position({ position, positionKey }) {
  const { editMode } = useCalendarContext();

  function SelectField() {
    const { getTeamMembersForPosition, control } = useDayOverviewContext();
    const { data, isLoading, isFetched } = getTeamMembersForPosition(position);

    return (
      <Controller
        name={positionKey}
        control={control}
        defaultValue={position.filled_by_id}
        render={({ field: { onChange, value, ref } }) => (
          <Select.Root value={value} inputRef={ref} onValueChange={onChange}>
            <Select.Trigger />
            {isLoading && "loading..."}
            <Select.Content>
              <Select.Item value={null}>Not filled</Select.Item>
              {isFetched &&
                data.map((member) => (
                  <Select.Item value={member.id} key={member.id}>
                    {member.getFullName()}
                  </Select.Item>
                ))}
            </Select.Content>
          </Select.Root>
        )}
      />
    );
  }

  return (
    <Card variant="surface">
      <Flex gap="1" align="center" justify="between" direction="row">
        <Box>
          <Text as="p" size="2" weight="bold">
            {position.title}
          </Text>
          <Text as="p" size="1" className="capitalize">
            {position.getName()}
          </Text>
        </Box>
        <Box>
          {editMode ? (
            <SelectField />
          ) : (
            <Text as="p" size="2" weight="bold">
              {position.filled_by_name || "Not filled"}
            </Text>
          )}
        </Box>
      </Flex>
    </Card>
  );
}
