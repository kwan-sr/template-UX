import React, { Component,useState, useEffect } from "react";
import {Button, Modal, Checkbox} from 'antd'
import "./instructions.css";

function InstructionsContainer() {

    const [task, setTask] = useState(0);

    const [textInput, setTextInput] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [age_years, setSelectedOption1] = useState('');
    const [age_months, setSelectedOption2] = useState('');

    const handleTextChange = (event) => {
        const inputText = event.target.value;
        setTextInput(inputText);
        setIsButtonEnabled(inputText.trim().length > 0); // Enable button only if text is entered
    };

    const routeChange = () =>{ 
            let path = '/#/Main1'; 
            window.location.assign(path);
    }

    const handleChange1 = (event) => {
        setSelectedOption1(event.target.value);
    }

    const handleChange2 = (event) => {
        setSelectedOption2(event.target.value);
    }

    // connect with the backend to randomize the task 
    useEffect(() => {
        fetch('http://localhost:8080/setup')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(data['task_number']);
            setTask(data['task_number']);
            // send user id as well
            localStorage.setItem('user-id', data['user_id']);
            console.log(localStorage)
        });
    }, []);

     // Handle form submission
    const handleSubmit = async () => {
        //TODO: set up user ID because I don't have anything to retrieve yet
        const userId = 0; // Retrieve user ID
        // const formData = new FormData();
        // formData.append('user_id', userId);
        // formData.append('age_years', age_years);
        // formData.append('age_months', age_months);
        // formData.append('concerns', textInput);

        // Send data to the backend
        fetch('http://localhost:8080/responsesData', {
            method: 'POST',
            body: JSON.stringify({
                user_id: userId,
                age_years: age_years,
                age_months: age_months,
                concerns: textInput
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(response => response.json())
            .then(message => {
              console.log(message)
            })
    };

    


    return (
      <div className="container">
        <h1>Dysgraphia At-Home Screening</h1> 

        <div className="text"> 
            *Enter your child's age below:
        </div>

        <div>
                <label htmlFor="dropdown">Years:</label>
                <select
                    id="dropdown"
                    value={age_years}
                    onChange={handleChange1}
                >
                    <option value="">-- Select an option --</option>
                    <option value="Under 2">Under 2</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="More than 10">More than 10</option>
                </select>
        </div>

        <br></br>

        <div>
                <label htmlFor="dropdown">Months:</label>
                <select
                    id="dropdown"
                    value={age_months}
                    onChange={handleChange2}
                >
                    <option value="">-- Select an option --</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                </select>
        </div>

        <br></br>

        <div className="text"> 
        Your child is {age_years} years and {age_months} months old.
        </div>

        <br></br>

        <div>
            <div className="text">
                Please tell us about your concerns: <span className="required">*</span>
            </div>
            <textarea
                id="concerns"
                name="concerns"
                rows="4"
                cols="50"
                placeholder="Enter your concerns here..."
                value={textInput}
                onChange={handleTextChange}
                required
            ></textarea>

            <br />
            

            <button
                disabled={!isButtonEnabled} variant="btn btn-success"  // Disable the button if no text is entered
                onClick={() => {
                    routeChange();
                    handleSubmit(); //Submit inputs to backend when clicking next.
                  }}
            >
                Next
            </button>
        </div>

      </div>
      );
}

export default InstructionsContainer;