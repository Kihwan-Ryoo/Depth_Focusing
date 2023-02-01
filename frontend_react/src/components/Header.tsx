import { FaHome, FaMoon, FaSun } from "react-icons/fa";
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
  Text,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";

import useUser from "../lib/useUser";
import { logOut } from "../api";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser();
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("gray.900", "gray.50");
  const Icon = useColorModeValue(FaMoon, FaSun);
  const toast = useToast();
  const queryClient = useQueryClient();
  const onLogOut = async () => {
    const toastId = toast({
      title: "Log out",
      status: "loading",
      position: "bottom-right",
    });
    await logOut();
    queryClient.refetchQueries(["me"]);
    toast.update(toastId, {
      status: "success",
      title: "Done!",
      description: "See you later!",
    });
  };

  return (
    <Stack
      align={"center"}
      justifyContent={"space-between"}
      py={5}
      px={40}
      borderBottomWidth={1}
      direction={{
        sm: "column",
        md: "row",
      }}
      spacing={{
        sm: 4,
        md: 0,
      }}
    >
      <Box color={logoColor}>
        <Link to={"/"}>
          <FaHome size={"48"} />
        </Link>
      </Box>
      <HStack>
        <Text as="i" fontSize={45} fontWeight="bold">
          Get Focus in your Image
        </Text>
      </HStack>
      <Flex gap={2} alignItems="center">
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<Icon />}
        />
        {!userLoading ? (
          !isLoggedIn ? (
            <Button onClick={onLoginOpen}>Log in</Button>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar name={user?.name} src={user?.avatar} size={"md"} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onLogOut}>Log out</MenuItem>
                <Link to={"/users/1/photos"}>
                  <MenuItem>Upload Photo</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          )
        ) : null}
      </Flex>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
    </Stack>
  );
}
