import { VStack, Heading, Spinner, Text } from "@chakra-ui/react";

export default function WatingPage() {
  return (
    <VStack justifyContent={"center"} minH="30vh">
      <Heading fontSize={40}>Loading...</Heading>
      <Text>Don't go anywhere.</Text>
      <Spinner size="lg" />
    </VStack>
  );
}
