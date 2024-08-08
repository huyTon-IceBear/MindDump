"use client";
import ColorSchemeToggle from "@/components/ColorSchemeToggle";
import CustomInput from "@/components/CustomInput";
import CustomQuote from "@/components/CustomQuote";
import WelcomeComponent from "@/components/Welcome";
export default function HomeView() {
  return (
    <>
      <ColorSchemeToggle />
      <WelcomeComponent />
      <CustomQuote
        source={
          "Thoughts disentangle themselves when they pass through the lips and fingertips."
        }
        quote={"Dawson Trotman"}
      />
      <CustomInput />
    </>
  );
}
