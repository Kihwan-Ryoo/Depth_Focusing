import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import GithubConfirm from "./routes/GithubConfirm";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import UploadPhotos from "./routes/UploadPhotos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "social",
        children: [
          {
            path: "github",
            element: <GithubConfirm />,
          },
        ],
      },
      {
        path: "users/:userPk/photos",
        element: <UploadPhotos />,
      },
    ],
  },
]);

export default router;
