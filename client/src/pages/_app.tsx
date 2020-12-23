import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import "./style.css";
import "swiper/swiper-bundle.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";

const customTheme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
});

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
