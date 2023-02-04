import { Box, Heading, HStack, Skeleton, VStack } from "@chakra-ui/react";

export default function ChooseLabelSkeleton() {
  return (
    <VStack>
      <HStack spacing={"16"} mb="12">
        <Skeleton w={"600px"} h={"420px"} rounded="lg" />
        <Skeleton rounded={"lg"} w={"100px"} h={"420px"} mb={3} />
      </HStack>
      <Skeleton rounded={"lg"} w={400} h={"14"} />
    </VStack>
  );
}
