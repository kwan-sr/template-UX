import React, { Component,useState } from "react";
import {Button, Modal, Checkbox} from 'antd'
import "./instructions.css";

function InstructionsContainer() {

    const [agree, setAgree] = useState(false);

    const checkboxHandler = () => {
        setAgree(!agree);
    }

    const routeChange = () =>{ 
        let path = '/#/Main'; 
        window.location.assign(path);

    }


    return (
      <div className="container">
        <h1>Page for instructions</h1> 

        <div className="text"> 
            Read the following instructions to complete the study:
            <ol>
                <li> Instruction No. 1</li>
                <li> Instruction No. 2</li>
            </ol> 
        </div>

        <div className="text"> 
            <Checkbox onChange={checkboxHandler} style={{fontSize:"20px", textAlign: 'left', alignSelf: 'stretch'}}>
                This is how you can add a checkbox.
            </Checkbox> 
        </div>

        <div className="text"> 
            <Button disabled={!agree} variant="btn btn-success" onClick={routeChange}>
                Start
            </Button>
        </div>

      </div>
      );
}

export default InstructionsContainer;