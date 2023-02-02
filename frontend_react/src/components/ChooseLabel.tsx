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
  Input,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ListFormat } from "typescript";
import { getSegmentation } from "../api";

interface IViewPhotosProps {
  imageUrl: string;
  labels: object;
}

export default function ChooseLabel({ imageUrl, labels }: IViewPhotosProps) {
  const [firstCheck, setFirstCheck] = useState(false);

  return (
    <VStack
      my="10"
      align={"center"}
      justifyContent={"space-between"}
      spacing="10"
    >
      <Heading textAlign={"center"}>Selected label</Heading>
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
      ></Button>
    </VStack>
  );
}
