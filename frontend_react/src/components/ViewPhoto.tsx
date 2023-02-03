import {
  Image,
  VStack,
  Button,
  Heading,
  useToast,
  Box,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { getSegmentation } from "../api";
import ChooseLabel from "./ChooseLabel";

interface IViewPhotosProps {
  imageUrl: string;
}

export default function ViewPhoto({ imageUrl }: IViewPhotosProps) {
  const [next, setNext] = useState(false);
  const [segImg, setSegImg] = useState("");
  // 많은 태그가 나오는 경우 해결 X
  const [labels, setLabels] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const toast = useToast();
  // 백엔드 구현 후 완료될 부분
  // const getSegmentatedImage = useMutation(getSegmentation, {
  //   onSuccess: (data: any) => {
  //     toast({
  //       status: "success",
  //       title: "Complete!",
  //       position: "bottom",
  //       isClosable: true,
  //     });
  //     setNext(true);
  //   },
  // });

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
        w={400}
        h={"14"}
        size={"lg"}
        colorScheme={"teal"}
        variant="solid"
        onClick={() => {
          setNext(true);
          // 백엔드 구현 후 활성화될 부분
          // getSegmentatedImage.mutate();
        }}
      >
        Continue
      </Button>
      {next ? <ChooseLabel imageUrl={imageUrl} labels={labels} /> : null}
    </VStack>
  );
}
