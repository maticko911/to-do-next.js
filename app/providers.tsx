"use client"

import React from "react";
import { ChakraProvider} from "@chakra-ui/react";
import theme from "../theme";

const Providers = ({children}: {children: React.ReactNode}) => {
    return (
        <ChakraProvider theme={theme}>
            {children}
        </ChakraProvider>
    )
}
export default Providers
