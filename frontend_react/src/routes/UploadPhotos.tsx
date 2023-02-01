import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { createPhoto, getUploadURL, uploadImage } from "../api";
import ProtectedPage from "../components/ProtectedPage";
import ViewPhoto from "../components/ViewPhoto";

interface IForm {
  file: FileList;
}

interface IUploadURLResponse {
  id: string;
  uploadURL: string;
}

export default function UploadPhotos() {
  const { register, handleSubmit, watch, reset } = useForm<IForm>();
  const { userPk } = useParams();
  const toast = useToast();
  const [imageUrl, setImageUrl] = useState("");
  const createPhotoMutation = useMutation(createPhoto, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "Image uploaded",
        isClosable: true,
        position: "bottom-right",
      });
    },
  });
  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      if (userPk) {
        setImageUrl(`${result.variants[0]}`);
        createPhotoMutation.mutate({
          description: " ",
          file: `https://imagedelivery.net/aSbksvJjax-AUC7qVnaC4A/${result.id}/public`,
          userPk,
        });
      }
    },
  });
  const uploadURLMutation = useMutation(getUploadURL, {
    onSuccess: (data: IUploadURLResponse) => {
      uploadImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch("file"),
      });
    },
  });
  const onSubmit = (data: any) => {
    uploadURLMutation.mutate();
  };
  return (
    <ProtectedPage>
      {createPhotoMutation.isSuccess ? (
        <ViewPhoto imageUrl={imageUrl} />
      ) : (
        <>
          <Box
            pb={40}
            mt={10}
            px={{
              base: 10,
              lg: 40,
            }}
          >
            <Container>
              <Heading textAlign={"center"}>Upload a Photo</Heading>
              <VStack
                as="form"
                onSubmit={handleSubmit(onSubmit)}
                spacing={5}
                mt={10}
              >
                <FormControl>
                  <Input {...register("file")} type="file" accept="image/*" />
                </FormControl>
                <Button
                  isLoading={
                    createPhotoMutation.isLoading ||
                    uploadImageMutation.isLoading ||
                    uploadURLMutation.isLoading
                  }
                  type="submit"
                  w="full"
                  colorScheme={"teal"}
                >
                  Upload photos
                </Button>
              </VStack>
            </Container>
          </Box>
        </>
      )}
    </ProtectedPage>
  );
}