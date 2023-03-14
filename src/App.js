import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import PodcastList from "./pages/PodcastList";
import Podcast from "./pages/Podcast";
import Episode from "./pages/Episode";
import EpisodeList from "./pages/EpisodeList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <PodcastList /> },
      {
        path: "podcast/:podcastId",
        element: <Podcast />,
        children: [
          {
            index: true,
            element: <EpisodeList />,
          },
          { path: "episode/:episodeId", element: <Episode /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
