"use client";

import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    Icon,
    createIcon,
} from "@chakra-ui/react";
import Link from "next/link";
import Tasks from "../../components/tasks";
import React, { useState, useEffect } from "react";
import classes from "./page.module.css";

export default function Home() {
    const [tasks, setTasks] = useState<any[]>([]);

    // Naložimo naloge iz localStorage
    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    // Preštej naloge v localStorage
    const activeTasksCount = tasks.length;

    return (
        <>
            <Container maxW={"full"} padding={0} position="relative" bg="black">
                <Stack
                    as={Box}
                    textAlign={"center"}
                    spacing={{base: 6, md: 10}}
                    py={{base: 48, md: 80}}
                    mt={{base: 0, sm: 0}}
                    position="relative"
                    height="80vh"
                    justify="center"
                    align="center"
                    bgImage="linear-gradient(45deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7))"
                    bgSize="cover"
                    bgPosition="center"
                >
                    <Heading
                        fontWeight={900}
                        fontSize={{base: "5xl", sm: "6xl", md: "7xl"}} //
                        fontFamily={"heading"}
                        lineHeight={"120%"}
                        color="white"
                        textTransform="uppercase"
                        letterSpacing="3px"
                        textShadow="0 0 20px rgba(233, 0, 92, 0.6), 0 0 50px rgba(233, 0, 92, 0.6)"
                    >
                        Unlock Your Potential <br/>
                        <Text as={"span"} color={"#E9005C"}>
                           with Our Futuristic To-Do App
                        </Text>
                    </Heading>

                    <Text
                        fontSize={"xl"}
                        fontFamily={"body"}
                        color="white"
                        maxW="lg"
                        mx="auto"
                        textShadow="0 0 15px rgba(0, 0, 0, 0.6), 0 0 25px rgba(233, 0, 92, 0.8)"
                    >
                        Maximize your productivity, conquer your tasks, and own your day.
                        It’s time to make it happen.
                    </Text>

                    <Stack
                        direction={"row"}
                        spacing={6}
                        align={"center"}
                        justify={"center"}
                        position="relative"
                    >
                        <Button
                            variant="solid"
                            size="lg"
                            bg="pink.600"
                            color="white"
                            _hover={{
                                bg: "pink.700",
                                boxShadow: "0px 10px 20px rgba(255, 20, 147, 0.5)",
                            }}
                            borderRadius="full"
                        >
                            <Link href="/to-do">Get Started</Link>
                        </Button>
                        <Button
                            variant="link"
                            fontSize="lg"
                            color="white"
                            _hover={{
                                textDecoration: "underline",
                                color: "pink.600",
                            }}
                        >
                            <Link href="/about-us">Learn More</Link>
                        </Button>

                        <Box position="absolute" right="-50px" top="20px">
                            <Icon as={Arrow} color={"#E9005C"} w={71}/>
                            <Text
                                fontSize={"lg"}
                                fontFamily={"heading"}
                                position={"absolute"}
                                right={"-125px"}
                                top={"-15px"}
                                transform={"rotate(10deg)"}
                                color={"red.500"}
                                textShadow="1px 1px 10px rgba(0, 0, 0, 0.5)"
                            >
                                Start NOW!
                            </Text>
                        </Box>
                    </Stack>
                </Stack>

                <div className={classes.second}>
                    <Heading
                        fontWeight={900}
                        fontSize={{base: "2xl", sm: "4xl", md: "5xl"}}
                        fontFamily={"heading"}
                        color="white"
                        lineHeight={"110%"}
                        textShadow="1px 1px 3px rgba(0, 0, 0, 0.6)"
                    >

                        <Text
                            as={"span"}
                            color={"#E9005C"}
                            fontWeight={700}
                            textShadow="0 0 20px rgba(233, 0, 92, 0.6), 0 0 50px rgba(233, 0, 92, 0.6)"
                            fontSize="4xl"
                        >
                            {activeTasksCount === 0
                                ? "NO"
                                : activeTasksCount === 1
                                    ? "1"
                                    : `${activeTasksCount}`
                            }
                            <br/>
                            <Text
                                as={"span"}
                                fontWeight={700}
                                fontSize="3xl"
                                color="white"
                            >
                                ACTIVE TASKS{" "}
                            </Text>
                            <br/>
                            <Text
                                as={"span"}
                                color={"#E9005C"}
                                fontWeight={700}
                                textShadow="0 0 20px rgba(233, 0, 92, 0.6), 0 0 50px rgba(233, 0, 92, 0.6)"
                            >
                                RIGHT NOW!
                            </Text>
                        </Text>
                    </Heading>

                    <Tasks/>
                </div>
            </Container>
            <footer className={classes.footer}>
                <p className={classes.footerText}>© 2025 Our Task Management App - All Rights Reserved</p>
            </footer>
        </>
    );
}

const Arrow = createIcon({
    displayName: "Arrow",
    viewBox: "0 0 72 24",
    path: (
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M63.7071 11.7071C64.0976 11.3166 64.0976 10.6834 63.7071 10.2929L56.7071 3.29289C56.3166 2.90237 55.6834 2.90237 55.2929 3.29289C54.9024 3.68342 54.9024 4.31658 55.2929 4.70711L61.5858 11L55.2929 17.2929C54.9024 17.6834 54.9024 18.3166 55.2929 18.7071C55.6834 19.0976 56.3166 19.0976 56.7071 18.7071L63.7071 11.7071ZM0 11.5H62V10.5H0V11.5Z"
        />
    ),
});
