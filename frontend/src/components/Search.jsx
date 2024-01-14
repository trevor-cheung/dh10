import React from "react";
import Logo from "../assets/Group_4.svg"
import { useEffect, useState } from 'react';

import { Button, InputGroup, Input, InputGroupText, ButtonGroup } from 'reactstrap'
const Search = ({ onSubmit }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(inputValue)
        setInputValue('');
    };

    return <div>
        <InputGroup >
            <Input placeholder="Enter Item Here" style={{ color: 'inherit' }} onChange={handleChange} />
            <Button outline color="success" onClick={handleSubmit}>
                Go
            </Button>
        </InputGroup>

    </div>


};
export default Search;