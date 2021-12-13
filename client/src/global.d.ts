declare module "react-emojione" {
  import React from "react";

  export interface EmojifyOptions {
    convertShortnames?: boolean;
    convertUnicode?: boolean;
    convertAscii?: boolean;
    style?: React.CSSProperties;
    onClick?: (e: Event) => void;
  }

  export function emojify(text: string, options?: EmojifyOptions): string;
}
