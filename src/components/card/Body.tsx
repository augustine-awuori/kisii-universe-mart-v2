import { ReactNode } from "react";
import { CardBody } from "@chakra-ui/react";

import useAppColorMode from "../../hooks/useAppColorMode";

interface Props {
  children: ReactNode;
}

const Body = ({ children }: Props) => {
  const { isDarkMode } = useAppColorMode();

  return (
    <CardBody backgroundColor={isDarkMode ? "inherit" : "gray.200"}>
      {children}
    </CardBody>
  );
};

export default Body;
