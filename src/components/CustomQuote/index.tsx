import { CustomQuoteProps } from "@/types/component";
import { Blockquote } from "@mantine/core";

export default function CustomQuote({ source, quote }: CustomQuoteProps) {
  return (
    <Blockquote color="blue" cite={source} mt="xl">
      {quote}
    </Blockquote>
  );
}
