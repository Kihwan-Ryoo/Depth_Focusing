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
  IconButton,
} from "@chakra-ui/react";
import { Mutation, useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { getBlurImage, getSegmentation } from "../api";
import GetBlurImage from "./GetBlurImage";
import GetBlurImageSkeleton from "./GetBlurImageSkeleton";
import { BiUndo } from "react-icons/bi";

interface IChooseLabelProps {
  segImageUrl: string;
  labels: number[];
  onMoveReset: any;
}

interface ILabels {
  check_labels: number[];
}

export default function ChooseLabel({
  segImageUrl,
  labels,
  onMoveReset,
}: IChooseLabelProps) {
  const scrollRef = useRef<HTMLImageElement>(null);
  const onMoveElement = () => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };
  const [skeletonFlag, setSkeletonFlag] = useBoolean(true);

  const { register, handleSubmit, watch } = useForm<ILabels>();
  const [next, setNext] = useState(false);
  const toast = useToast();
  const mutation = useMutation(getBlurImage, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "seg",
        position: "bottom-right",
      });
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
    >
      <Grid templateColumns={"5fr 1fr"}>
        <GridItem>
          <Image rounded={"lg"} src={segImageUrl} />
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
      <HStack spacing={20}>
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

            //skeleton 보기용 (임시)
            setTimeout(() => {
              setSkeletonFlag.off();
            }, 2000);

            onMoveElement();
          }}
        >
          Get Focusing Image
        </Button>
        <IconButton
          colorScheme={"red"}
          aria-label={"choose photo"}
          icon={<BiUndo size={"lg"} />}
          onClick={onMoveReset}
        />
      </HStack>
      {next ? (
        <VStack p={40}>
          <Heading textAlign={"center"} ref={scrollRef}>
            Blur Image
          </Heading>
          {skeletonFlag ? (
            <GetBlurImageSkeleton />
          ) : (
            <GetBlurImage blurImageURL={segImageUrl} />
          )}
        </VStack>
      ) : null}
    </VStack>
  );
}
