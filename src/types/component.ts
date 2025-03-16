import { UploadedImage } from "./note";

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
    speed: number;
    delay: number;
};

export interface TypeWriterProps {
  text: string | string[];
  speed: number;
  onComplete?: () => void;
  skip?: boolean;
};

export interface EmptyNoteProps {
  description?: string;
  icon?: React.ReactNode;
}

export interface CarouselProps {
  sliderData: UploadedImage[];
  onDelete: (imageID: string) => void;
  canEdit?: boolean;
}

export interface ImageDropzoneProps {
  onDrop: (files: UploadedImage[]) => void;
}
export interface ImageLightboxProps {
  onClose: () => void;
  images: UploadedImage[];
  selectedIndex?: number;
}
