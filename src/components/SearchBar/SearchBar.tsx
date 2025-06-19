import React, { useState } from "react";
import toast from "react-hot-toast";
import css from  "./SearchBar.module.css";

export default function SearchBar({onSubmit}) {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
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