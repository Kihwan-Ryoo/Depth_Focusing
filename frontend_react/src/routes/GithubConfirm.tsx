import { Heading, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogIn } from "../api";
import WatingPage from "../components/WatingPage";

export default function GithubConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      const status = await githubLogIn(code);
      if (status === 200) {
        toast({
          status: "success",
          title: "Welcome",
          description: "Log In Using Github",
        });
        queryClient.refetchQueries(["me"]);
        navigate("/users/1/photos");
      }
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  // return (
  //   <VStack justifyContent={"center"} minH="70vh">
  //     <Heading>Processing log in...</Heading>
  //     <Text>Don't go anywhere.</Text>
  //     <Spinner size="lg" />
  //   </VStack>
  // );
  return <WatingPage />;
}
