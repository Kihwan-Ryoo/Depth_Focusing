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
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ListFormat } from "typescript";
import { getSegmentation } from "../api";

interface IChooseLabelProps {
  imageUrl: string;
  labels: number[];
}

interface ILabels {
  check_labels: number[];
}

export default function ChooseLabel({ imageUrl, labels }: IChooseLabelProps) {
  const [firstCheck, setFirstCheck] = useState(false);
  const { register, handleSubmit } = useForm<ILabels>();

  return (
    <VStack
      my="10"
      align={"center"}
      justifyContent={"space-between"}
      spacing="10"
      p={20}
    >
      <Heading textAlign={"center"}>Selected label</Heading>
      <Grid templateColumns={"5fr 1fr"}>
        <GridItem>
          <Image rounded={"lg"} src={imageUrl} />
        </GridItem>
        <GridItem>
          <FormControl>
            <VStack spacing={5} align={"center"}>
              {labels?.map((label: number) => (
                <Checkbox size={"lg"} {...register("check_labels")}>
                  {label}
                </Checkbox>
              ))}
            </VStack>
          </FormControl>
        </GridItem>
      </Grid>

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
