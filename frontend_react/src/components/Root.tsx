import { HStack, Button, Box } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function Root() {
  return (
    <Box>
      <HStack
        justifyContent={"space-between"}
        py={5}
        px={10}
        borderBottomWidth={1}
      >
        <Box color="gray.900">
          <Link to={"/"}>
            <FaHome size={"48"} />
          </Link>
        </Box>
        <HStack spacing={2}>
          <Button>Log in</Button>
          <Button colorScheme={"red"}>Sign up</Button>
        </HStack>
      </HStack>
      <Outlet />
    </Box>
  );
}
