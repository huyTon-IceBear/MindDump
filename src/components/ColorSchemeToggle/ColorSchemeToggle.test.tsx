import { render, screen, userEvent } from "@/test-utils";
import ColorSchemeToggle from ".";

describe("ColorSchemeToggle component", () => {
  it("renders the icon", () => {
    render(<ColorSchemeToggle />);
    const icon = screen.getByLabelText("Toggle color scheme");
    expect(icon).toBeInTheDocument();
  });

  it("light icon is visible when color scheme is light", async () => {
    render(<ColorSchemeToggle />);
    const toggleButton = screen.getByLabelText("Toggle color scheme");

    // Check initial state (dark mode by default)
    expect(screen.getByLabelText("Moon Icon")).toBeVisible();
    await userEvent.click(toggleButton);
    expect(screen.getByLabelText("Sun Icon")).toBeVisible();
  });
});
