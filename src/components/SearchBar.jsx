import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";


const SearchBar = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setInputValue(event.target.value);
            onSearch(inputValue);
        }
    };

    const handleSearch = () => {
        onSearch(inputValue);
    };

    return (

        <div className="wrapper">
            <input type="text" value={inputValue} placeholder="Search any place" onChange={handleInputChange} onKeyDown={handleKeyDown} />
            <button onClick={handleSearch}><IoSearchOutline /></button>
        </div>

    );
};

export default SearchBar;
