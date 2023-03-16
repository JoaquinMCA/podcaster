import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Episode from "./pages/Episode";
import EpisodeList from "./pages/EpisodeList";
import Podcast from "./pages/Podcast";
import PodcastList from "./pages/PodcastList";
import RootLayout from "./pages/RootLayout";
import { LoadingContextProvider } from "./store/loading-context";
import { PodcastsContextProvider } from "./store/podcasts-context";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import NotFound from "./pages/NotFound";

const theme = createTheme({
  palette: {
    primary: {
      light: "#70abd9",
      main: "#4d97d0",
      dark: "#356991",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffcf33",
      main: "#ffc400",
      dark: "#b28900",
      contrastText: "#000",
    },
  },
});

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
    errorElement: <NotFound></NotFound>,
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoadingContextProvider>
        <PodcastsContextProvider>
          <RouterProvider router={router} />
        </PodcastsContextProvider>
      </LoadingContextProvider>
    </ThemeProvider>
  );
}

export default App;
