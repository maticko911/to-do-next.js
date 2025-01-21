import {
    Badge,
    Box,
    Center,
    Heading,
    HStack,
    IconButton,
    Img,
    Input,
    Stack,
    Text,
    Textarea,
    useToast
} from "@chakra-ui/react";
import {FaCheck, FaEdit, FaTrash} from "react-icons/fa";
import {useEffect, useState} from "react";

interface CardProps {
    id: string;
    image: string | ArrayBuffer | null;
    author: string;
    title: string;
    description: string;
    timestamp: string;
    onUpdate: () => void;
}


export default function Card({
                                 id,
                                 title,
                                 author,
                                 description,
                                 image,
                                 timestamp,
                                 onUpdate,
                             }: CardProps) {
    const [mounted, setMounted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(description);
    const toast = useToast();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const handleDelete = () => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        const updatedTasks = savedTasks.filter((task: any) => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        toast({
            title: "Task deleted",
            description: "The task has been successfully deleted.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });

        onUpdate();
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        const updatedTasks = savedTasks.map((task: any) =>
            task.id === id
                ? { ...task, title: editedTitle, description: editedDescription }
                : task
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        toast({
            title: "Task updated",
            description: "The task has been successfully updated.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });

        setIsEditing(false);
        onUpdate();
    };

    return (
        <Center py={3}>
            <Box
                w={["full", "xs"]}
                rounded={"lg"}
                my={5}
                mx="auto"
                overflow={"hidden"}
                bgGradient="linear(to-br, black, #1A1A1D)"
                border={"1px solid"}
                borderColor="#00BCD4"
                boxShadow={"0 5px 15px rgba(0, 255, 255, 0.4)"}
                animation={`3s infinite alternate`}
                transition="transform 0.3s ease-in-out"
                _hover={{
                    transform: "scale(1.05)",
                    boxShadow: "0 10px 30px rgba(0, 255, 255, 0.6)",
                }}
            >
                <Box h={"200px"} borderBottom={"1px"} borderColor="#00BCD4">
                    {image && typeof image === "string" ? (
                        <img
                            src={image}
                            alt="Task Image"
                            style={{ objectFit: "cover", width: "100%", height: "100%" }}
                            onError={(e) =>
                                (e.currentTarget.src = "/default-image.jpg")
                            }
                        />
                    ) : (
                        <Img
                            src="/default-image.jpg"
                            roundedTop={"lg"}
                            objectFit="cover"
                            h="full"
                            w="full"
                            alt={"Default Blog Image"}
                        />
                    )}
                </Box>

                <Box px={4} py={1}>
                    <Badge colorScheme="red" fontSize="sm" borderRadius="full">
                        NEW
                    </Badge>
                </Box>
                <Box p={4}>
                    {isEditing ? (
                        <Input
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            fontSize="2xl"
                            bg="black"
                            color="#00BCD4"
                            borderColor="#39FF14"
                            mb={2}
                        />
                    ) : (
                        <Heading
                            fontSize={"2xl"}
                            noOfLines={1}
                            color="#00BCD4"
                            textShadow="0 0 10px #39FF14"
                        >
                            {title}
                        </Heading>
                    )}
                    {isEditing ? (
                        <Textarea
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                            bg="black"
                            color="white"
                            borderColor="#39FF14"
                            mb={2}
                        />
                    ) : (
                        <Text
                            color={"gray.300"}
                            noOfLines={2}
                            textShadow="0 0 5px rgba(0, 0, 0, 0.7)"
                        >
                            {description}
                        </Text>
                    )}
                </Box>

                <Text color={"gray.500"} fontSize="sm">
                    Date: {new Date(timestamp).toLocaleDateString("en-US")}
                </Text>

                <Stack mt={6} direction={"row"} spacing={4} align={"center"} px={4}>
                    <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                        <Text fontWeight={600}>Author: {author}</Text>
                        <Text color={"gray.500"}></Text>
                    </Stack>
                </Stack>

                <HStack
                    borderTop={"1px"}
                    borderColor="#00BCD4"
                    p={2}
                    justify="space-between"
                >
                    {isEditing ? (
                        <IconButton
                            aria-label="Save Task"
                            icon={<FaCheck />}
                            onClick={handleSave}
                            colorScheme="green"
                            bgGradient="linear(to-r, #39FF14, #00BCD4)"
                            _hover={{
                                bgGradient: "linear(to-l, #39FF14, #00BCD4)",
                                transform: "scale(1.1)",
                            }}
                        />
                    ) : (
                        <IconButton
                            aria-label="Edit Task"
                            icon={<FaEdit />}
                            onClick={handleEdit}
                            bgGradient="linear(to-r, #00BCD4, #39FF14)"
                            color="black"
                            _hover={{
                                bgGradient: "linear(to-l, #00BCD4, #39FF14)",
                                transform: "scale(1.1)",
                            }}
                        />
                    )}
                    <IconButton
                        aria-label="Delete Task"
                        icon={<FaTrash />}
                        onClick={handleDelete}
                        bgGradient="linear(to-r, #E9005C, #FF4C00)"
                        color="black"
                        _hover={{
                            bgGradient: "linear(to-l, #FF4C00, #E9005C)",
                            transform: "scale(1.1)",
                        }}
                    />
                </HStack>
            </Box>
        </Center>
    );
}
