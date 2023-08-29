import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  SimpleGrid,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  useAppColorMode,
  useCurrentUser,
  useProfileUser,
  useReload,
  useTimestamp,
} from "../hooks";
import { empty, format } from "../utilities";
import { ProfileActivities, PageContainer } from "../components";
import usersApi from "../services/users";

const ProfilePage = () => {
  const { profileUser, setProfileUser } = useProfileUser();
  const navigate = useNavigate();
  const { getDate } = useTimestamp();
  const params = useParams();
  const isTheUser = useCurrentUser(params.userId);
  const { accentColor } = useAppColorMode();
  const { info, isLoading, request } = useReload(
    profileUser,
    empty.user,
    usersApi.getUser
  );

  useEffect(() => {
    request();
  }, []);

  const {
    _id,
    aboutMe,
    isAdmin,
    isVerified,
    timestamp,
    avatar,
    name,
    username,
    otherAccounts,
  } = info;

  const editProfile = () => {
    navigate(`edit`);
    setProfileUser(info);
  };

  const navigateToListings = () => {
    navigate("listings");
  };

  const navigateToRequests = () => {
    navigate("requests");
  };

  const Aside = (
    <ProfileActivities
      userId={_id}
      visibility="lg"
      onListingsClick={navigateToListings}
      onRequestsClick={navigateToRequests}
    />
  );

  return (
    <PageContainer Aside={Aside}>
      <Container maxW="container.lg" py={8}>
        <Flex direction={{ base: "column", md: "row" }}>
          <Avatar name={name} src={avatar} />
          <Box ml={{ md: 8 }}>
            {isLoading ? (
              <SkeletonText />
            ) : (
              <>
                <Text fontSize="2xl" fontWeight="bold" mb={0}>
                  {name}
                </Text>
                <Text color={accentColor} fontStyle="italic">
                  {username}
                </Text>
              </>
            )}
            {isVerified && <Badge colorScheme="green">VERIFIED</Badge>}
            {isAdmin && (
              <Badge colorScheme="orange" marginLeft={3}>
                ADMIN
              </Badge>
            )}
            <Text mt={2}>Joined on {getDate(timestamp)}</Text>
          </Box>
        </Flex>
        <Divider my={6} />
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Stack spacing={2}>
            <Text fontWeight="bold" fontSize="1.5rem">
              About Me
            </Text>
            {isLoading ? <SkeletonText /> : <Text>{aboutMe}</Text>}
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="bold" fontSize="1.5rem">
              Contact Information
            </Text>
            <Text>Phone: {format.phoneNumber(otherAccounts.whatsapp)}</Text>
          </Stack>
        </SimpleGrid>
        {isTheUser && (
          <Button marginTop={3} onClick={editProfile}>
            Edit Profile
          </Button>
        )}
        <Divider my={6} />
        <ProfileActivities
          onListingsClick={navigateToListings}
          onRequestsClick={navigateToRequests}
          userId={_id}
        />
      </Container>
    </PageContainer>
  );
};

export default ProfilePage;
