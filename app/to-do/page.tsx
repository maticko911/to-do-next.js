"use client"

import React from 'react'
import { Box, Heading, Text, } from "@chakra-ui/react";


import cappuchino from '../../public/cappuchino.jpg'
import knjiga_postelja from '../../public/knjiga_postelja.jpg'
import kuhna from '../../public/kuhna.jpg'
import AddTask from "../../components/addTask";
import classes from "./page.module.css";

const tasks = [
    { id: 1, author: "Matic", title: "Naloga 1", description: "Dokončaj postavitev aplikacije.", img: knjiga_postelja, date: "" },
    { id: 2, author: "Žanet", title: "Naloga 2", description: "Dodaj funkcionalnosti za to-do.", img: kuhna, date: "" },
    { id: 3, author: "Mia", title: "Naloga 3", description: "Poskrbi za animacije.", img: cappuchino, date: "" },
];

const Page = () => {
    return (
        <>

            <Box p={8} mt={28} mb={4}>
                <Heading
                    mb={6}
                    fontFamily="heading"
                    textAlign="center"
                    color="white"
                    fontSize="4xl"
                    textTransform="uppercase"
                    letterSpacing="4px"
                    textShadow="2px 2px 10px rgba(0, 188, 212, 0.8), 0 0 15px rgba(0, 188, 212, 0.6)"
                >
                    To-Do List
                </Heading>

                {tasks.length === 0 ? (
                    <Text fontSize="xl" textAlign="center" color="gray.500" mb={8}>
                        Add a task to get started!
                    </Text>
                ) : (
                    <AddTask />
                )}
            </Box>

            <footer className={classes.footer}>
                <p className={classes.footerText}>© 2025 Our Task Management App - All Rights Reserved</p>
            </footer>
        </>
    );
};

export default Page;
