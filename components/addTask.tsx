'use client';

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    Box,
    Button,
    Input,
    FormControl,
    FormLabel,
    Textarea,
    useToast,
    Center,
    SimpleGrid,
    Skeleton,
} from "@chakra-ui/react";
import { AnimatedCard } from "./motionbox";
import Card from "./Card";
import SearchContent from "./searchContent";

interface Task {
    id: string;
    author: string;
    title: string;
    description: string;
    image: string | ArrayBuffer | null;
    timestamp: string; // Timestamp is now a string representing the formatted date.
}

const AddTask = () => {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedTasks = localStorage.getItem("tasks");
            if (savedTasks) {
                setTasks(JSON.parse(savedTasks));
            }
            setLoading(false);
        }
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!author || !title || !description || !image) {
            toast({
                title: "Error",
                description: "All fields are required.",
                status: "error",
                duration: 750,
                isClosable: true,
            });
            return;
        }

        // Format the current date as MM/DD/YYYY
        const formattedDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        const newTask: Task = {
            id: uuidv4(),
            author,
            title,
            description,
            image,
            timestamp: formattedDate, // Use the formatted date
        };

        const updatedTasks = [...tasks, newTask];
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        setTasks(updatedTasks);
        setAuthor("");
        setTitle("");
        setDescription("");
        setImage(null);

        toast({
            title: "Task added!",
            description: "Your task has been successfully added.",
            status: "success",
            duration: 750,
            isClosable: true,
        });
    };

    return (
        <>
            <Center p={8} mt={2}>
                <Box
                    p={8}
                    w="100%"
                    maxW="md"
                    boxShadow="0 0 20px rgba(255, 255, 255, 0.8)"
                    borderRadius="lg"
                    bg="#1A202C"
                    border="1px solid #4A5568"
                    display="flex"
                    flexDirection="column"
                    gap={6}
                    textAlign="center"
                    fontFamily="'Roboto', sans-serif"
                    borderColor="white"
                >
                    <form onSubmit={handleSubmit}>
                        <FormControl mb={4}>
                            <FormLabel htmlFor="author" color="white" fontWeight="bold" fontSize="lg">
                                Author
                            </FormLabel>
                            <Input
                                id="author"
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                required
                                border="1px solid #4A5568"
                                bg="#2D3748"
                                color="white"
                                placeholder="Author"
                                _placeholder={{ color: "#A0AEC0" }}
                                _focus={{ borderColor: "#FF69B4" }} // Neon pink focus
                                p={4}
                            />
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel htmlFor="title" color="white" fontWeight="bold" fontSize="lg">
                                Title
                            </FormLabel>
                            <Input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                textTransform="uppercase"
                                border="1px solid #4A5568"
                                bg="#2D3748"
                                color="white"
                                placeholder="Task"
                                _placeholder={{ color: "#A0AEC0" }}
                                _focus={{ borderColor: "#FF69B4" }} // Neon pink focus
                                p={4}
                            />
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel htmlFor="description" color="white" fontWeight="bold" fontSize="lg">
                                Description
                            </FormLabel>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                border="1px solid #4A5568"
                                bg="#2D3748"
                                color="white"
                                placeholder="Describe task..."
                                _placeholder={{ color: "#A0AEC0" }}
                                _focus={{ borderColor: "#FF69B4" }} // Neon pink focus
                                p={4}
                            />
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel htmlFor="image" color="white" fontWeight="bold" fontSize="lg">
                                Image
                            </FormLabel>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                                border="1px solid #4A5568"
                                bg="#2D3748"
                                color="white"
                                placeholder="logo.png"
                                _focus={{ borderColor: "#FF69B4" }} // Neon pink focus
                                p={1}
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            width="full"
                            borderRadius="md"
                            bg="#FF69B4"
                            color="white"
                            _hover={{
                                bg: "#FF1493",
                                boxShadow: "0px 0px 20px rgba(255, 20, 147, 0.9)", // Neon effect on hover
                            }}
                            p={4}
                        >
                            Add Task
                        </Button>
                    </form>
                </Box>
            </Center>

            <Box mt={6} textAlign="center">
                <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
                    Saved Tasks:
                </h2>

                {tasks.length > 0 && <SearchContent />}

                {loading ? (
                    <SimpleGrid
                        columns={[1, 2, 3]}
                        spacing={6}
                        justifyItems="center"
                        alignItems="center"
                    >
                        {[...Array(6)].map((_, index) => (
                            <Box key={index}>
                                <Skeleton height="300px" width="100%" maxW="300px" borderRadius="md" />
                            </Box>
                        ))}
                    </SimpleGrid>
                ) : tasks.length > 0 ? (
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <SimpleGrid
                            columns={[1, 2, 3]}
                            spacing={6}
                            width="full"
                        >
                            {tasks.map((task) =>
                                task.author && task.title && task.description && task.image ? (
                                    <AnimatedCard key={task.id}>
                                        <Card
                                            id={task.id}
                                            author={task.author}
                                            image={task.image}
                                            title={task.title}
                                            description={task.description}
                                            timestamp={task.timestamp}
                                            onUpdate={() => {
                                                const updatedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
                                                setTasks(updatedTasks);
                                            }}
                                        />
                                    </AnimatedCard>
                                ) : null
                            )}
                        </SimpleGrid>
                    </Box>
                ) : (
                    <p>No tasks available. Please add a task. And start crushing your goals! 🚀 </p>
                )}
            </Box>
        </>
    );
};

export default AddTask;
