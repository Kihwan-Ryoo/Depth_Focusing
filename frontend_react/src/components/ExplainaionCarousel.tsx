import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {
  Box,
  Image,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ExplainaionCarousel() {
  const { toggleColorMode } = useColorMode();
  const guideColor = useColorModeValue("gray.100", "gray.700");
  return (
    <Box w={"60%"} bgColor={guideColor} justifyItems={"center"} rounded="xl">
      <Box p={5}></Box>
      <Carousel width="100%" infiniteLoop={true} showIndicators={false}>
        <Box>
          <Image
            boxSize="md"
            objectFit={"contain"}
            src="https://imagedelivery.net/QuZC_XPqQ0puEDGDCfsphg/8c3ddd44-8c73-41e0-b979-71a9064dfa00/public"
          />
          <Text fontSize={20} fontStyle="italic" mt={10}>
            Select the image you want
          </Text>
          <Text fontSize={20} fontStyle="italic" mt={10}>
            If you want to get a good quality photo,
          </Text>
          <Text fontSize={20} fontStyle="italic">
            recommended that the photo size does not exceed (사진크기).
          </Text>
          <Text></Text>
        </Box>
        <Box>
          <Image
            gridColumn={"auto"}
            boxSize="md"
            objectFit="contain"
            src="https://imagedelivery.net/QuZC_XPqQ0puEDGDCfsphg/a5542224-a080-409d-8025-182ed8439000/public"
          />
          <Text fontSize={20} fontStyle="italic" mt={10} mb={4}>
            You will get segmentation image & label
          </Text>
          <Text fontSize={20} fontStyle="italic">
            Choose label you want to get focus
          </Text>
          <Text fontSize={20} fontStyle="italic">
            Dont' Worry about missing label!
          </Text>
          <Text fontSize={20} fontStyle="italic">
            Our blur skill is not at all
          </Text>
        </Box>

        <Box>
          <Image
            gridColumn={"auto"}
            boxSize="md"
            objectFit="contain"
            src="https://imagedelivery.net/QuZC_XPqQ0puEDGDCfsphg/edb3ee16-48ff-4ee5-2593-7c2b88f01200/public"
          />
          <Text fontSize={20} fontStyle="italic" p={10}>
            Get Focus Image
          </Text>
          <Link to={"users/1/photos"}>
            <Text fontSize={30} color="red.200" fontWeight={"semibold"}>
              Upload Image
            </Text>
          </Link>
          <Text color={"gray.500"} mt={5}>
            or Click your profile
          </Text>
        </Box>
      </Carousel>
    </Box>
  );
}
