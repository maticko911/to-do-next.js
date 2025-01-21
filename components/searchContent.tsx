import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import classes from './searchContent.module.css';
import Card from './Card'

interface DataItem {
    id: string;
    image: string;
    title: string;
    description: string;
    author: string;
    timestamp: string;
}

const SearchContent: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredData, setFilteredData] = useState<DataItem[]>([]);

    useEffect(() => {
        const data = fetchTasksFromLocalStorage();

        if (searchQuery === "") {
            setFilteredData([]);
        } else {
            const result = data.filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.author.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredData(result);
        }
    }, [searchQuery]);

    const fetchTasksFromLocalStorage = () => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            return JSON.parse(storedTasks) as DataItem[];
        }
        return [];
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleUpdate = () => {
        const updatedTasks = fetchTasksFromLocalStorage();
        const result = updatedTasks.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(result);
    };

    return (
        <div className={classes.container}>
            <form className={classes.form}>
                <input
                    autoFocus
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    className={classes.input}
                />
                <Button className={classes.button}>
                    <FaSearch />
                </Button>
            </form>

            <div className={classes.results}>
                {filteredData.length === 0 && searchQuery !== "" ? (
                    <p className={classes.noResults}>No results found</p>
                ) : (
                    <div className={classes.cardContainer}>
                        {filteredData.map((item) => (
                            <Card
                                key={item.id}
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                description={item.description}
                                author={item.author}
                                timestamp={item.timestamp}
                                onUpdate={handleUpdate}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchContent;
