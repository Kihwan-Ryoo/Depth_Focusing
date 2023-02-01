import {
  Box,
  Image,
  VStack,
  Text,
  Button,
  HStack,
  Stack,
  Checkbox,
  Heading,
} from "@chakra-ui/react";

interface IViewPhotosProps {
  imageUrl: string;
}

export default function ViewPhoto({ imageUrl }: IViewPhotosProps) {
  return (
    <VStack
      my="10"
      align={"center"}
      justifyContent={"space-between"}
      spacing="10"
    >
      <Heading textAlign={"center"}>Selected Image</Heading>
      <Image rounded={"lg"} src={imageUrl} />
      <Button w={"20%"} size={"lg"} colorScheme={"teal"} variant="solid">
        Continue
      </Button>
    </VStack>
  );
}
