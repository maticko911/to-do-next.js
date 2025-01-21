"use client";

import React, { useState, useEffect } from "react";
import {
    Box,
    Center,
    Heading,
    Text,
    Button,
    SimpleGrid,
    Img,
    HStack,
    Flex,
} from "@chakra-ui/react";
import { BsArrowUpRight, BsHeart, BsHeartFill } from "react-icons/bs";
import Link from "next/link";

interface Task {
    id: string;
    author: string;
    title: string;
    description: string;
    image: string | ArrayBuffer | null;
    timestamp: string;
    liked: boolean;
}

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    const updateTaskLike = (id: string) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, liked: !task.liked } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    return (
        <Center py={12}>
            {tasks.length > 0 ? (
                <SimpleGrid
                    columns={[1, 2, 3]}
                    spacing={6}
                    width="full"
                    justifyItems="center"
                >
                    {tasks.map((task) => (
                        <Box
                            key={task.id}
                            w="full"
                            maxW="xs"
                            rounded="lg"
                            my={5}
                            mx={[0, 5]} // Dodajanje horizontalnega zunanjega roba za večje zaslone
                            overflow="hidden"
                            bg="gray.900"
                            border="1px"
                            borderColor="gray.700"
                            boxShadow="0 0 20px rgba(0, 188, 212, 0.8)" // Stalna neonska modra svetloba
                            transition="transform 0.3s ease, box-shadow 0.3s ease"
                        >
                            <Box h="200px" borderBottom="1px" borderColor="gray.700">
                                <Img
                                    src={
                                        typeof task.image === "string"
                                            ? task.image
                                            : "../public/kuhna.jpg"
                                    }
                                    roundedTop="lg"
                                    objectFit="cover"
                                    h="full"
                                    w="full"
                                    alt="Task Image"
                                    transition="transform 0.3s ease"
                                />
                            </Box>
                            <Box p={4}>
                                <Box
                                    bg="cyan.500"
                                    display="inline-block"
                                    px={2}
                                    py={1}
                                    color="white"
                                    mb={2}
                                >
                                    <Text fontSize="xs" fontWeight="medium">
                                        {task.author}
                                    </Text>
                                </Box>
                                <Heading color="white" fontSize="2xl" noOfLines={1}>
                                    {task.title}
                                </Heading>
                                <Text color="gray.400" noOfLines={2}>
                                    {task.description}
                                </Text>
                            </Box>
                            <HStack borderTop="1px" borderColor="gray.700">
                                <Flex
                                    p={4}
                                    alignItems="center"
                                    justifyContent="space-between"
                                    roundedBottom="lg"
                                    cursor="pointer"
                                    w="full"
                                >
                                    <Button>
                                        <Link href="/to-do">
                                            <Text fontSize="md" fontWeight="semibold">
                                                View more
                                            </Text>
                                        </Link>
                                    </Button>
                                    <BsArrowUpRight />
                                </Flex>
                                <Flex
                                    p={4}
                                    alignItems="center"
                                    justifyContent="space-between"
                                    roundedBottom="lg"
                                    borderLeft="1px"
                                    cursor="pointer"
                                    onClick={() => updateTaskLike(task.id)}
                                >
                                    {task.liked ? (
                                        <BsHeartFill fill="red" fontSize="24px" />
                                    ) : (
                                        <BsHeart fontSize="24px" />
                                    )}
                                </Flex>
                            </HStack>
                        </Box>
                    ))}
                </SimpleGrid>
            ) : (
                <Box textAlign="center" color="white">
                    <Text fontSize="xl" color="gray.400">
                        Add a task to start crushing your goals!
                    </Text>
                    <Link href="/to-do">
                        <Button variant="solid"
                                size="lg"
                                bg="pink.600"
                                color="white"
                                mt={2}
                                _hover={{
                                    bg: "pink.700",
                                    boxShadow: "0px 10px 20px rgba(255, 20, 147, 0.5)",
                                }}
                                borderRadius="full">
                            Add Task
                        </Button>
                    </Link>
                </Box>
            )}
        </Center>
    );
}
