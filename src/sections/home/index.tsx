"use client";
import ColorSchemeToggle from "@/components/ColorSchemeToggle";
import CustomQuote from "@/components/CustomQuote";
import WelcomeComponent from "@/components/Welcome";
import { Button, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function HomeView() {
  const router = useRouter();

  return (
    <Stack>
      <WelcomeComponent />
      <CustomQuote
        source={
          "Thoughts disentangle themselves when they pass through the lips and fingertips."
        }
        quote={"Dawson Trotman"}
      />
      <Button variant="filled" onClick={() => router.push("/notes")}>
        Button
      </Button>
    </Stack>
  );
}
