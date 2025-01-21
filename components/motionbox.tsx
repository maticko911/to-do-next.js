import { motion, isValidMotionProp, MotionProps } from "framer-motion";
import { Box, BoxProps, chakra, shouldForwardProp } from "@chakra-ui/react";
import React from "react";

type MotionBoxProps = BoxProps & MotionProps;

export const MotionBox = motion(
    chakra(Box, {
        shouldForwardProp: (prop) =>
            isValidMotionProp(prop) || shouldForwardProp(prop),
    })
);

export const AnimatedCard: React.FC<MotionBoxProps> = ({ children, ...props }) => {
    return (
        <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            {...props}
        >
            {children}
        </MotionBox>
    );
};
