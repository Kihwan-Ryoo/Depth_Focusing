import { FaHome, FaMoon, FaSun } from "react-icons/fa";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";

import useUser from "../lib/useUser";

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
  const onLogOut = async () => {
    const toastId = toast({
      title: "Login out",
      status: "loading",
      position: "bottom-right",
    });
    setTimeout(() => {
      toast.update(toastId, {
        status: "success",
        title: "Done",
        description: "Success Logout",
      });
    }, 5000);
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
              </MenuList>
            </Menu>
          )
        ) : null}
      </Flex>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
    </Stack>
  );
}
