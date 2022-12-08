import { extendTheme, StyleFunctionProps, theme as base, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
    useSystemColorMode: false,
    initialColorMode: "light",
};

const extendedTheme = {
    fonts: {
        heading: `Inter, ${base.fonts.heading}`,
        body: `Inter, ${base.fonts.body}`,
        monospace: "Menlo, monospace",
    },
    // colors: {
    //     brand: {
    //         400: "#0BC5EA",
    //         600: "#00A3C4",
    //     }
    // },
    // styles: {
    //     global: (props: StyleFunctionProps) => ({
    //         body: {
    //             bg: mode("#FFFFFF", "#1a202c")(props)
    //         }
    //     }),
    // },
    components: {
        Button: {
            variants: {
                primary: (props: StyleFunctionProps) => ({
                    bg: "cyan.400",
                    fontWeight: "light",
                    textColor: "white",
                    _hover: {
                        bg: "cyan.500",
                        textColor: "white",
                        _disabled: {
                            bg: "cyan.400",
                            fontWeight: "light",
                            textColor: "white",
                        },
                    },
                    _active: {
                        bg: "cyan.500",
                    },
                    _disabled: {
                        bg: "cyan.400",
                        fontWeight: "light",
                        textColor: "white",
                    },
                }),
            }
        }
    }
};

const theme = extendTheme(extendedTheme, config);

export default theme;