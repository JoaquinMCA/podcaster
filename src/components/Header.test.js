import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoadingContext from "../store/loading-context";
import Header from "./Header";

const notLoading = {
  loading: false,
  loadingHandler: () => {},
};

const loading = {
  loading: true,
  loadingHandler: () => {},
};

describe("Header component", () => {
  test("Renders main link and not loading", () => {
    render(
      <BrowserRouter>
        <LoadingContext.Provider value={notLoading}>
          <Header />
        </LoadingContext.Provider>
      </BrowserRouter>
    );

    const linkElement = screen.getByText(/Podcaster/i);
    expect(linkElement).toBeInTheDocument();

    const loaderElements = document.getElementsByClassName("loader");
    expect(loaderElements.length).toBe(0);
  });

  test("Renders main link and loading", () => {
    render(
      <BrowserRouter>
        <LoadingContext.Provider value={loading}>
          <Header />
        </LoadingContext.Provider>
      </BrowserRouter>
    );

    const linkElement = screen.getByText(/Podcaster/i);
    expect(linkElement).toBeInTheDocument();

    const loaderElements = document.getElementsByClassName("loader");
    expect(loaderElements.length).toBe(1);
  });
});
