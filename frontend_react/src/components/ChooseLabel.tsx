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
  useBoolean,
} from "@chakra-ui/react";
import { useState } from "react";

interface IViewPhotosProps {
  imageUrl: string;
}

export default function ChooseLabel({ imageUrl }: IViewPhotosProps) {
  const [firstCheck, setFirstCheck] = useState(false);

  return (
    <VStack
      my="10"
      align={"center"}
      justifyContent={"space-between"}
      spacing="10"
    >
      <Heading textAlign={"center"}>Selected Image</Heading>
      <Image rounded={"lg"} src={imageUrl} />
      <Button
        fontSize={25}
        w={"25%"}
        h={"14"}
        size={"lg"}
        colorScheme={"teal"}
        variant="solid"
        onClick={() => {
          setFirstCheck(true);
        }}
      >
        Continue
      </Button>
    </VStack>
  );
}
