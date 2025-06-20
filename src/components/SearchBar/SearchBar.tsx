import React, { useState } from "react";
import toast from "react-hot-toast";
import css from  "./SearchBar.module.css";


interface SearchBarProps {
    onSubmit: (query: string) => void;
}

export default function SearchBar({onSubmit} : SearchBarProps) {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.trim() === "") {
            toast.error ("Oops! Please type something to search");
            return;
        }
        onSubmit(inputValue);
        setInputValue("");
       
    };

    return (
        <header className={css.header}>
          <form onSubmit={handleSubmit}> 
            <input
               type="text"
               autoComplete="off"
               autoFocus
               placeholder="Search images and photos"
               value={inputValue}
               onChange={handleChange}
               className={css.input}
            />
            <button type="submit" className={css.button}>Search</button>
           </form>
        </header>

    );
}