import React, { Component, useState, useEffect } from "react";
import {Button, Modal, Checkbox, Input, Radio} from 'antd'
import "./main.css";

import PredictionContainer from '../../components/predictionContainer'

function MainContainer() {

    const [complete, setComplete] = useState(false);
    const [text, setText] = useState("");
    const [choice, setChoice] = useState(0);
    const [imageData, setImageData] = useState([]);
    const [currentImage, setCurrentImage] = useState("");
    const [currentPrediction, setCurrentPrediction] = useState("");
    const [visible, setVisible] = useState(false);
    const [imageCount, setImageCount] = useState(1);
    const [showPrediction, setShowPrediction] = useState(false);
    const [taskTime, setTaskTime] = useState((Date.now() + 1000 * 1000));

    const [currentTime, setCurrentTime] = useState(0);
    const [moveToSurvey, setMoveToSurvey] = useState(false);

    const [render, setRender] = useState(false);

    let totalImages = 3;

    const routeChange = () =>{ 
        //save the data
        sendData({'total_time': taskTime,
                  'image_order': 0,
                  'text_input': 0,
                  'answers': 0})

        let path = '/#/Survey'; 
        window.location.assign(path);

    }

    const sendData = (obj) => {
        fetch('http://localhost:8080/create', {
          method: 'POST',
          body: JSON.stringify({
            content: obj
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(response => response.json())
          .then(message => {
            console.log(message)
            // getLastestTodos();
          })
      } 

    const nextChange = () =>{
        if (text==="" | choice<1) {
            alert("Please make sure to complete all the fields!");
        } else {
            setText("");
            setChoice(0); 
            let count = imageCount + 1;
            setImageCount(count);
            setCurrentImage(imageData[count].name)
            setCurrentPrediction(imageData[count].label)
            if (count === totalImages) {
                setMoveToSurvey(true);
            }
        }
    }

    const onChangeInput = e => {
        setText(e.target.value);
    };

    const onChangeMultiple= e => {
        setChoice(e.target.value);

    };

    const handlePredict=()=>{
        setShowPrediction(true);
        
    };

    const handleDisplayInfo=()=>{
        setVisible(true);
    };
    
    const handleCancel = () => {
        setVisible(false);
    };

    // testing communication with backend
    useEffect(() => {
        fetch('http://0.0.0.0:8080/time').then(res => 
        res.json()).then(data => {
            setCurrentTime(data.time);
            console.log(data.time)
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
            setCurrentImage("../../Data/" + data['imgs'][1].name)
            console.log("../../Data/" + data['imgs'][1].name)
            console.log(currentImage)
            setCurrentPrediction(data['imgs'][1].label);
            setRender(true);
        });
    }, []);


    // update image

    useEffect(() => {


    }, []);
    



    return (
      <>
       {render ?

            <div className="container">
            <div className="title">Main experiment</div>
            <div className="column-container"> 
            <div className="left-column"> 
                <p> This is how you load an image:</p>
                <div><img className="image-inner" src={currentImage}/></div>
                <p> 1/ {totalImages} Images</p>
            </div>

            <div className="right-column"> 
            <b> You can present the outcomes of the algorithms on this side:</b>
            
            <Button className="btn-1"  onClick={()=>{handlePredict()}}>
                Get a prediction
            </Button>

            { showPrediction ?
                <PredictionContainer 
                    currentPrediction={currentPrediction}
                />
            :
                <>
                </>
            }

            <Button className="btn-2" onClick={()=>{handleDisplayInfo()}}>
                Open pop-up window
            </Button>
            <Modal
                visible={visible}
                title="Additional information"
                footer={null}
                onCancel={()=>{handleCancel()}}
                style={{ width: "1000px"}}
            >
                <div>
                    This is how you add a pop-up window

                </div>
            </Modal>


            <div className="draw-instr">
                <t> This is how you create a text box:</t>
            </div>
            <t> 
                <Input size="large" rows={1} onChange={onChangeInput} required/>
            </t>

            <div className="draw-instr">
                <t> This is how you can ask a multiple choice question.</t>
            </div>    
                <Radio.Group onChange={onChangeMultiple} value={choice}>
                    <Radio value={1}> <t> Option 1</t></Radio>
                    <Radio value={2}> <t> Option 2</t></Radio>
                    <Radio value={3}> <t> Option 3</t></Radio>
                </Radio.Group>

            </div>
            </div>


            <div className="button-container"> 
            <Button variant="btn btn-success"  style={{marginLeft:"70%"}}  onClick={nextChange}>
                Next
            </Button>
            </div>

            {(moveToSurvey) && 
            <div className="button-container"> 
                <Button disabled={!moveToSurvey} variant="btn btn-success" onClick={routeChange}>
                    Survey
                </Button>
            </div>
            }

            </div>

        :
            <> 
            <h1> Loading ...</h1>
            </>
        }
      </>
       
      );
}

export default MainContainer;