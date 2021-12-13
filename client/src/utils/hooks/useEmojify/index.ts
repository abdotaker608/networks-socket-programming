import { emojify } from "react-emojione";

interface useEmojifyOptions {
  width?: number;
  height?: number;
}

interface useEmojifyReturn {
  (text: string): string;
}

const useEmojify = ({
  width = 24,
  height = 24,
}: useEmojifyOptions = {}): useEmojifyReturn => {
  const options = {
    style: { width, height },
  };

  return (text) => emojify(text, options);
};

export default useEmojify;
