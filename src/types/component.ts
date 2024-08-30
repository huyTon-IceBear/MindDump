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
  
export interface StarsGroupProps {
    screenWidth: number;
    // color: string;
    // density: number;
    speed: number;
    delay: number;
};

export interface TypeWriterProps {
  text: string | string[];
  speed: number;
  onComplete?: () => void;
};