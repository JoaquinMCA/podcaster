import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import PodcastList from "./pages/PodcastList";
import Podcast from "./pages/Podcast";
import Episode from "./pages/Episode";
import EpisodeList from "./pages/EpisodeList";
import { LoadingContextProvider } from "./store/loading-context";

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
  return (
    <LoadingContextProvider>
      <RouterProvider router={router} />
    </LoadingContextProvider>
  );
}

export default App;
