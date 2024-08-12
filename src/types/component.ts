export interface CustomQuoteProps {
    source: string;
    quote: string;
};

export interface CustomInputProps {
    onComplete: (note: string) => void;
};

export interface LogoProps {
    size?: "small" | "normal" | "large";
};
  