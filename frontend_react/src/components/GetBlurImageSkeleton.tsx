import { Box, Heading, HStack, Skeleton, VStack } from "@chakra-ui/react";

export default function ChooseLabelSkeleton() {
  return (
    <VStack p={10}>
      <HStack spacing={"16"} mb="12">
        <Skeleton w={"600px"} h={"420px"} rounded="lg" />
      </HStack>
      <HStack spacing={20}>
        <Skeleton rounded={"lg"} w={200} h={"14"} />
        <Skeleton rounded={"lg"} w={200} h={"14"} />
      </HStack>
    </VStack>
  );
}
