import React from "react";
import Logo from "../assets/Group_4.svg"

import { Button, InputGroup, Input, InputGroupText, ButtonGroup } from 'reactstrap' 
const Search = () => {
    return <div>
        <InputGroup >
    <Input placeholder="Enter Item Here" style={{ color: 'inherit' }}/>
   <Button outline color="success">
    Go
   </Button>
  </InputGroup>

    </div>


};
export default Search;