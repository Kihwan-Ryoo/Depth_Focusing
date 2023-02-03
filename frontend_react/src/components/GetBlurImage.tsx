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
  Grid,
  GridItem,
  FormControl,
  useToast,
  CheckboxGroup,
} from "@chakra-ui/react";
import { Mutation, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ListFormat } from "typescript";

interface ILabels {
  check_labels: number[];
}

export default function ChooseLabel() {
  const toast = useToast();

  return (
    <VStack
      my="10"
      align={"center"}
      justifyContent={"space-between"}
      spacing="10"
      p={40}
    >
      <Heading textAlign={"center"}>Blur Image</Heading>
      <Image rounded={"lg"} src="#" />
      <HStack spacing={20}>
        <Button
          fontSize={25}
          w={200}
          h={"14"}
          size={"lg"}
          colorScheme={"teal"}
          variant="solid"
          type="submit"
        >
          Save
        </Button>
        <Button
          fontSize={25}
          w={200}
          h={"14"}
          size={"lg"}
          colorScheme={"teal"}
          variant="solid"
          type="submit"
        >
          Retry
        </Button>
      </HStack>
    </VStack>
  );
}
