import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import PodcastList from "./pages/PodcastList";
import Podcast from "./pages/Podcast";
import Episode from "./pages/Episode";
import EpisodeList from "./pages/EpisodeList";
import { LoadingContextProvider } from "./store/loading-context";

import { createTheme, ThemeProvider } from "@mui/material/styles";

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
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoadingContextProvider>
        <RouterProvider router={router} />
      </LoadingContextProvider>
    </ThemeProvider>
  );
}

export default App;
