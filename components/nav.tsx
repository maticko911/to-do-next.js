"use client"

import {
    Box,
    Flex,
    HStack,
    IconButton,
    Button,
    useDisclosure,
    Stack,
    Link as ChakraLink,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import React, { useState, useEffect } from 'react';
import Link from "next/link";

const Links = ['about-us'];

const NavLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <ChakraLink
        as={Link}
        href={href}
        px={6}
        py={3}
        rounded="md"
        fontSize="lg"
        fontWeight="bold"
        textTransform="uppercase"
        color="white"
        letterSpacing="1.5px"
        _hover={{
            textDecoration: 'none',
            bgGradient: 'linear(to-r, #e9005c, #ff0099)',
            color: 'black',
            transform: 'scale(1.1)',
            transition: 'all 0.3s ease-in-out',
            boxShadow: '0 0 15px rgba(233, 0, 92, 0.7)',
        }}
    >
        {children}
    </ChakraLink>
);

export default function Nav(): React.JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [show, setShow] = useState(true);
    const [prevScrollY, setPrevScrollY] = useState(0);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > prevScrollY && currentScrollY > 50) {
            setShow(false);
        } else {
            setShow(true);
        }

        setPrevScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollY]);

    return (
        <>
            <Box
                bgGradient="linear(to-r, #1e1e2f, #2a2a3e)"
                px={6}
                py={4}
                position="fixed"
                top={5}
                left={5}
                right={5}
                zIndex={1000}
                borderRadius="full"
                boxShadow="0 8px 20px rgba(0, 0, 0, 0.5)"
                display={show ? 'block' : 'none'}
                transition="all 0.3s ease-in-out"
            >
                <Flex h={16} alignItems="center" justifyContent="space-between">
                    <IconButton
                        size="md"
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label="Open Menu"
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                        bg="transparent"
                        color="white"
                        _hover={{
                            bg: 'rgba(255, 255, 255, 0.1)',
                        }}
                    />
                    <HStack spacing={8} alignItems="center">
                        <Link href="/">
                            <Box
                                fontSize="2xl"
                                fontWeight="bold"
                                color="white"
                                textShadow="0 4px 15px rgba(0, 255, 255, 0.8)"
                                _hover={{
                                    transform: 'scale(1.1)',
                                    transition: 'all 0.3s ease-in-out',
                                }}
                            >
                                To-Do App
                            </Box>
                        </Link>
                    </HStack>
                    <Flex alignItems="center">
                        <HStack as="nav" spacing={6} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link} href={`/${link.toLowerCase()}`}>
                                    {link}
                                </NavLink>
                            ))}
                        </HStack>
                        <Button
                            variant="solid"
                            size="sm"
                            colorScheme="neonBlue"
                            borderRadius="full"
                            px={6}
                            fontWeight="bold"
                            bgGradient="neonBlue"
                            color="white"
                            textShadow="0 4px 15px rgba(0, 0, 0, 0.4)"
                            _hover={{
                                transform: 'scale(1.1)',
                                boxShadow: '0 8px 20px rgba(233, 0, 92, 0.8)',
                            }}
                        >
                            <Link href="/to-do">
                                GET STARTED
                            </Link>
                        </Button>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }} bg="rgba(30, 30, 47, 0.95)" borderRadius="md">
                        <Stack as="nav" spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link} href={`/${link.toLowerCase()}`}>
                                    {link}
                                </NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
