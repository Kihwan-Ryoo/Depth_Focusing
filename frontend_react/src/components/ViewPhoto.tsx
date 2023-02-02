import { Image, VStack, Button, Heading, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { getSegmentation } from "../api";
import ChooseLabel from "./ChooseLabel";

interface IViewPhotosProps {
  imageUrl: string;
}

export default function ViewPhoto({ imageUrl }: IViewPhotosProps) {
  const [firstCheck, setFirstCheck] = useState(false);
  const [segImg, setSegImg] = useState("");
  const [labels, setLabels] = useState({ test1: "1", test2: "2", test3: "3" });
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
  //     setFirstCheck(true);
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
        w={"25%"}
        h={"14"}
        size={"lg"}
        colorScheme={"teal"}
        variant="solid"
        onClick={() => {
          setFirstCheck(true);
          // 백엔드 구현 후 활성화될 부분
          // getSegmentatedImage.mutate();
        }}
      >
        Continue
      </Button>
      {firstCheck ? <ChooseLabel imageUrl={imageUrl} labels={labels} /> : null}
    </VStack>
  );
}
