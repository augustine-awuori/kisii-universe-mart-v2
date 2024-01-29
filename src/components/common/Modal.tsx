import { ReactNode } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

import { Button, Text } from "../../components";
import { fontFamily } from "../../data/typography";

interface Props {
  title?: string;
  subTitle?: string;
  isOpen: boolean;
  isLoading?: boolean | undefined;
  content: ReactNode;
  primaryBtnLabel?: string;
  secondaryBtnLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  onModalClose: () => void;
}

function AppModal({
  content,
  isOpen,
  isLoading,
  onModalClose,
  onPrimaryClick,
  onSecondaryClick,
  primaryBtnLabel,
  secondaryBtnLabel,
  subTitle,
  title,
}: Props) {
  const { onClose } = useDisclosure();

  const handlePrimaryClick = () => {
    onClose();
    if (onPrimaryClick) onPrimaryClick();
  };

  const handleSecondaryClick = () => {
    if (isLoading) return;

    onClose();

    onSecondaryClick ? onSecondaryClick() : onModalClose();
  };

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onModalClose}
      size="sm"
    >
      <ModalOverlay />
      <ModalContent
        mx={{ base: 4, md: "auto" }}
        width={{ base: "100%", md: "auto" }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        fontFamily={fontFamily}
      >
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody textAlign="left" w="100%" mb={2}>
          {subTitle && (
            <Text fontWeight="bold" mb="1rem">
              {subTitle}
            </Text>
          )}
          {content}
        </ModalBody>
        <ModalFooter w="100%">
          {primaryBtnLabel && (
            <Button
              colorScheme="orange"
              isLoading={isLoading}
              mr={3}
              onClick={handlePrimaryClick}
              leftIcon={<CheckIcon />}
              type="submit"
              w="100%"
            >
              {primaryBtnLabel}
            </Button>
          )}
          {secondaryBtnLabel && (
            <Button
              disabled={isLoading}
              onClick={handleSecondaryClick}
              leftIcon={<CloseIcon />}
              variant="ghost"
              w="100%"
            >
              {secondaryBtnLabel}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AppModal;
