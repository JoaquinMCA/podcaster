import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn Podcaster header link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Podcaster/i);
  expect(linkElement).toBeInTheDocument();
});
