import {
  Box,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import ExplainaionCarousel from "../components/ExplainaionCarousel";

export default function Home() {
  return (
    <VStack my={100} align={"center"}>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Heading mb={5}>
        <Text>Upload Guide</Text>
      </Heading>
      <ExplainaionCarousel />

      {/* <Text fontSize={"9xl"}>No Items...</Text> */}
    </VStack>
  );
}
