import { useState } from "react";
import { Box } from "@chakra-ui/react";

import { Heading, Text } from "../components";
import { useNoGrid, useNotifications } from "../hooks";
import NotificationComp from "../components/Notification";
import TextSwitch from "../components/common/TextSwitch";

const NotificationsPage = () => {
  const { notifications } = useNotifications();
  const [filterIndex, setFilterIndex] = useState(0);
  useNoGrid();

  const filters = ["All", "Unread"];

  const filtered =
    filters[filterIndex].toLowerCase() === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  return (
    <Box>
      <TextSwitch labels={filters} onSwitch={setFilterIndex} />
      <Heading my={2} textAlign="center" fontSize="1.25rem">
        Amazing Notifications
      </Heading>
      {filtered.length ? (
        filtered.map((notification, index) => (
          <NotificationComp {...notification} key={index} />
        ))
      ) : (
        <Text textAlign="center" marginTop={20}>
          You don't have any
        </Text>
      )}
    </Box>
  );
};

export default NotificationsPage;
