import {
  Image,
  VStack,
  Button,
  Heading,
  useToast,
  useMergeRefs,
  Box,
  useBoolean,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getSegmentation } from "../api";
import ChooseLabel from "./ChooseLabel";
import ChooseLabelSkeleton from "./ChooseLabelSkeleton";

interface IViewPhotosProps {
  imageUrl: string;
}

export default function ViewPhoto({ imageUrl }: IViewPhotosProps) {
  const navigate = useNavigate();
  const scrollReset = useRef<any>(null);
  const onMoveReset = () => {
    // setTimeout(() => {
    //   scrollReset.current?.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    //   });
    // }, 100);
    scrollReset.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.location.reload();
  };
  const scrollRef = useRef<any>(null);
  const onMoveElement = () => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const [skeletonFlag, setSkeletonFlag] = useBoolean(true);
  const [next, setNext] = useState(false);
  const [segImg, setSegImg] = useState("");
  // 많은 태그가 나오는 경우 해결 X
  const [labels, setLabels] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const toast = useToast();
  // 백엔드 구현 후 완료될 부분
  const getSegmentatedImage = useMutation(getSegmentation, {
    onSuccess: (data: any) => {
      toast({
        status: "success",
        title: "Complete!",
        position: "bottom",
        isClosable: true,
      });
      setNext(true);
      setSkeletonFlag.off();
    },
  });

  return (
    <VStack
      my="10"
      align={"center"}
      justifyContent={"space-between"}
      spacing="10"
      ref={scrollReset}
    >
      <Heading textAlign={"center"}>Selected Image</Heading>
      <Image rounded={"lg"} src={imageUrl} />
      <Button
        fontSize={25}
        w={400}
        h={"14"}
        size={"lg"}
        colorScheme={"teal"}
        variant="solid"
        onClick={() => {
          setNext(true);
          // 백엔드 구현 후 활성화될 부분
          getSegmentatedImage.mutate();

          // //skeleton 보기용 (임시)
          // setTimeout(() => {
          //   setSkeletonFlag.off();
          // }, 2000);

          onMoveElement();
        }}
      >
        Continue
      </Button>

      {next ? (
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
          {skeletonFlag ? (
            <ChooseLabelSkeleton />
          ) : (
            <ChooseLabel
              segImageUrl={imageUrl}
              labels={labels}
              onMoveReset={onMoveReset}
            />
          )}
        </VStack>
      ) : null}
    </VStack>
  );
}
