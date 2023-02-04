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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ListFormat } from "typescript";
import { getSegmentation } from "../api";
import GetBlurImage from "./GetBlurImage";

interface IChooseLabelProps {
  imageUrl: string;
  labels: number[];
  scrollRef: any;
}

interface ILabels {
  check_labels: number[];
}

export default function ChooseLabel({
  imageUrl,
  labels,
  scrollRef,
}: IChooseLabelProps) {
  const { register, handleSubmit, watch } = useForm<ILabels>();
  const [next, setNext] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  useEffect(() => {}, [imageLoading]);
  const toast = useToast();
  const mutation = useMutation(getSegmentation, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "seg",
        position: "bottom-right",
      });
      // navigate(`/rooms/${data.id}`);
    },
  });

  const onSubmit = (data: ILabels) => {
    console.log("asd");
    mutation.mutate(data);
  };
  return (
    <VStack
      my="10"
      align={"center"}
      justifyContent={"space-between"}
      spacing="10"
      p={20}
    >
      <Heading textAlign={"center"} ref={scrollRef}>
        Selected label
      </Heading>
      <Grid templateColumns={"5fr 1fr"}>
        <GridItem>
          <Image rounded={"lg"} src={imageUrl} />
        </GridItem>
        <GridItem>
          <VStack
            ml={20}
            spacing={5}
            align={"center"}
            onSubmit={handleSubmit(onSubmit)}
          >
            {labels?.map((label: number) => (
              <FormControl key={label}>
                <Checkbox size={"lg"} {...register(`check_labels.${label}`)}>
                  {label}
                </Checkbox>
              </FormControl>
            ))}
          </VStack>
        </GridItem>
      </Grid>
      {/* <Text>{watch()}</Text> */}

      <Button
        fontSize={25}
        w={400}
        h={"14"}
        size={"lg"}
        colorScheme={"teal"}
        variant="solid"
        type="submit"
        onClick={() => {
          setNext(true);
        }}
      >
        Get Focusing Image
      </Button>
      {next ? <GetBlurImage /> : null}
    </VStack>
  );
}
