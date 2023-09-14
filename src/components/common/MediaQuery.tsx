import {
  Avatar,
  Wrap,
  WrapItem,
  Text,
  ResponsiveValue,
} from "@chakra-ui/react";
import { GoVerified } from "react-icons/go";
import { getFirstWord } from "../../utilities/format";
import { User } from "../../hooks/useUser";

interface Props {
  onClick?: () => void;
  user: User | undefined;
  size?:
    | ResponsiveValue<
        | (string & {})
        | "sm"
        | "md"
        | "lg"
        | "xl"
        | "2xl"
        | "2xs"
        | "xs"
        | "full"
      >
    | undefined;
  time?: string;
}

const UserAvatar = ({ user, onClick, size = "xs", time }: Props) => {
  return (
    <Wrap
      cursor="pointer"
      marginTop={1}
      onClick={onClick}
      justifyContent="space-between"
      alignItems="center"
      w="100%"
    >
      <WrapItem>
        <Avatar size={size} name={user?.name} src={user?.avatar} />
      </WrapItem>
      <WrapItem display="flex" alignItems="center">
        <Text marginRight={1}>{getFirstWord(user?.name)}</Text>
        {user?.isVerified && <GoVerified size={10} color="orange" />}
      </WrapItem>
      <WrapItem marginLeft="auto">
        {time && <Text fontSize=".85rem">{time}</Text>}
      </WrapItem>
    </Wrap>
  );
};

export default UserAvatar;