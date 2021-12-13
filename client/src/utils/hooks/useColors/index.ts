import { useToken } from "@chakra-ui/react";
import chroma from "chroma-js";

//Shall be valid functions that could be called on chroma prototype
export interface FilterOptions {
  alpha?: number;
}

const useColors = (
  ...args: string[] | [...colors: string[], filters: FilterOptions]
): string[] => {
  //split colors and filters (if given)
  let colors: string[];
  let filters: FilterOptions | null = null;

  //apply any filter effects if given
  if (typeof args[args.length - 1] !== "string") {
    //filter objects given, apply chroma filters
    filters = args[args.length - 1] as FilterOptions;
    colors = args.slice(0, args.length - 1) as string[];
  } else colors = args as string[]; //all arguments are colors

  //Fetch the color given from chakra theme
  let themeColors = useToken("colors", colors) as string[];

  //apply filters if there are any
  if (filters) {
    const alpha = filters.alpha; //transparency

    if (alpha) {
      themeColors = themeColors.map((color) =>
        chroma(color).alpha(alpha).toString()
      );
    }
  }

  //return back the resolved theme color
  return themeColors;
};

export default useColors;
