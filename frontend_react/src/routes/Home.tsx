import {
  Box,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <VStack my={100} align={"center"}>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Text fontSize={"9xl"}>No Items...</Text>
    </VStack>
  );
}
