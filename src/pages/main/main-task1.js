import React, { Component, useState, useEffect } from "react";
import {Button, Modal, Checkbox, Input, Radio} from 'antd'
import "antd/dist/antd.css";
import "./main.css";
import ImageUpload from "../../components/ImageUpload"

import PredictionContainer from '../../components/predictionContainer'

function Main1Container() {
    const [text, setText] = useState("");
    const [task, setTask] = useState(0);
    const [choice, setChoice] = useState(0);
    const [tmpUser, setTmpUser] = useState(0);
    const [imageData, setImageData] = useState([]);
    const [currentImage, setCurrentImage] = useState("");
    const [currentPrediction, setCurrentPrediction] = useState("");
    const [imageCount, setImageCount] = useState(0);
    const [showPrediction, setShowPrediction] = useState(false);
    const [taskTime, setTaskTime] = useState((Date.now() + 1000 * 1000));

    const [currentTime, setCurrentTime] = useState(0);
    const [moveToSurvey, setMoveToSurvey] = useState(false);

    const [render, setRender] = useState(false);

    let totalImages = 3;
    const baseImgUrl = "./";

    const routeChange = () =>{ 
        let path = '/#/Loading'; 
        window.location.assign(path);
    }

    const nextChange = () =>{
        if (choice<1) {
            alert("Please make sure to complete all the fields!");
        } else {
            let count = imageCount + 1;
            // save data
            let data = {
                q_id: currentImage,
                user_id: tmpUser,
                ans: choice,
                input: text, 
                time: ((Date.now() - taskTime) / 1000).toFixed(3)
            };
            console.log(data)
            sendData(data)
            if (count >= totalImages) {
                console.log('done with images')
                setMoveToSurvey(true);
            } else {
                // reinitialize variables
                setChoice(0); 
                setText("")
                setImageCount(count);
                setCurrentImage(imageData[count].name);
                setCurrentPrediction(imageData[count].label);
                setTaskTime(Date.now())
                setShowPrediction(false);
            }
        }
    }

    const sendData = (obj) => {
        fetch('http://localhost:8080/responsesData', {
          method: 'POST',
          body: JSON.stringify(obj),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(response => response.json())
          .then(message => {
            console.log(message)
          })
      } 


    const onChangeMultiple= e => {
        setChoice(e.target.value);

    };

    const onChangeInput = e => {
        setText(e.target.value);
    };

    const handlePredict=()=>{
        setShowPrediction(true);
    };

    // testing communication with backend
    useEffect(() => {
        fetch('http://0.0.0.0:8080/time').then(res => 
        res.json()).then(data => {
            setCurrentTime(data.time);
            console.log(data.time)
        });
        }, []);

    // create a new user here 
    useEffect(() => {
        fetch('http://localhost:8080/setup_main')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(data['task_number']);
            setTask(data['task_number']);
            // send user id as well
            setTmpUser(data['user_id'])
        });
    }, []);
    

    // initialize image
    useEffect(() => {
        console.log('getting images')
        fetch('http://localhost:8080/imageInfo')
        .then(response => response.json())
        .then(data => {
            console.log(data['imgs']);
            setImageData(data['imgs']);
            let image_name = data['imgs'][0].name
            setCurrentImage(image_name)
            console.log(image_name)
            setCurrentPrediction(data['imgs'][0].label);
            setRender(true);
            setTaskTime(Date.now())
        });
    }, []);



    return (

        <div className="container">

            <h1>Dysgraphia At-Home Screening</h1> 

            <div className="title">Upload a clear picture of your child's handwriting:</div>

            <div>
                <p> (typically school work)</p>
                <ImageUpload />
            </div>

            <br></br>

            <div>
                <button
                    variant="btn btn-success"  // Disable the button if no text is entered
                    onClick={routeChange}
                >
                Next
                </button>
            </div>
        </div>

        
    );
}

export default Main1Container;