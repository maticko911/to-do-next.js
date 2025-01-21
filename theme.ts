import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    colors: {
        brand: {
            50: "#1A1A1D",
            100: "#232323",
            200: "#393E46",
            300: "#3A3B3C",
            400: "#00BCD4",
            500: "#FF4C00",
            600: "#FFD700",
            700: "#7E7F7F",
            800: "#121212",
            900: "#000000",
        },
        neonBlue: "#00BCD4",
        neonPink: "#E9005C",
        neonGreen: "#39FF14",
        gold: "#FFD700",
    },
    fonts: {
        heading: `'Orbitron', sans-serif`,
        body: `'Poppins', sans-serif`,
    },
    styles: {
        global: {
            html: {
                height: "100%",
                margin: 0,
            },
            body: {
                bg: "black",
                color: "white",
                minHeight: "100vh",
                paddingBottom: "60px",
                margin: 0,
                fontFamily: `'Poppins', sans-serif`,
            },
            "*": {
                boxSizing: "border-box",
            },
        },
    },
    components: {
        Card: {
            baseStyle: {
                bgGradient: "linear(to-bl, brand.500, brand.600)",
                border: "2px solid",
                borderColor: "gold",
                borderRadius: "lg",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                padding: 6,
                transition: "all 0.3s ease-in-out",
                _hover: {
                    transform: "scale(1.05)",
                    boxShadow: "0 15px 40px rgba(255, 215, 0, 0.7)",
                    filter: "brightness(1.2)",
                },
            },
        },
        Heading: {
            baseStyle: {
                color: "white",
                textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
                letterSpacing: "0.05em",
            },
        },
        Text: {
            baseStyle: {
                color: "white",
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)",
                fontSize: "lg",
            },
        },
        Button: {
            baseStyle: {
                rounded: "full",
                fontWeight: "bold",
                fontFamily: `'Poppins', sans-serif`,
                transition: "all 0.2s ease-in-out",
            },
            variants: {
                arcane: {
                    bgGradient: "linear(to-bl, brand.400, neonPink)",
                    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                    _hover: {
                        bgGradient: "linear(to-tr, brand.500, neonPink)",
                        boxShadow: "0 4px 20px rgba(255, 78, 138, 0.8)",
                        transform: "scale(1.1)",
                    },
                },
                neonGreen: {
                    bg: "neonGreen",
                    color: "black",
                    _hover: {
                        bg: "#39FF14",
                        transform: "scale(1.1)",
                    },
                },
            },
        },
    },
});

export default theme;
