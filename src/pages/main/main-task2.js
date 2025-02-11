import React, { Component, useState, useEffect } from "react";
import { Button, Modal } from 'antd'
import "antd/dist/antd.css";
import "./main.css";
import pixel_attributed1 from "../../components/word-image-1.jpeg"
import pixel_attributed2 from "../../components/word-image-2.jpeg"
import pixel_attributed3 from "../../components/word-image-3.jpeg"
import ex_dys1 from "../../components/dysgraphic1.png"
import ex_dys2 from "../../components/dysgraphic2.png"
import ex_typ from "../../components/neurotypical.png"
import img_plchldr from "../../components/image-placeholder.png"
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );



const HoverableDiv = ({handleMouseOver, handleMouseOut}) => {

    const pred_class = "Spatial Dysgraphia"

    return (
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <b><u>{pred_class}</u></b>
        </div>
    );
};


function Main2Container() {

    const [text, setText] = useState("");
    const [imageData, setImageData] = useState([]);
    const [currentImage, setCurrentImage] = useState("");
    const [currentPrediction, setCurrentPrediction] = useState("");
    const [visible, setVisible] = useState(false);
    const [imageCount, setImageCount] = useState(0);
    const [taskTime, setTaskTime] = useState((Date.now() + 1000 * 1000));
    const [currentTime, setCurrentTime] = useState(0);
    const [moveToSurvey, setMoveToSurvey] = useState(false);
    const [render, setRender] = useState(false);


    const handleDisplayInfo=()=>{
        console.log('opening popup')
        setVisible(true);
    };
    
    const handleCancel = () => {
        setVisible(!visible);
    };


    const HoverText = () => {
        return (
            <Modal
            visible={true}
            title="Full model predictions"
            centered
            footer={null}
            onCancel={handleCancel}
        >
            <div className="pop-container">
                <div>
                    <Bar data={data} options={options} />
                </div>
            </div>
        </Modal>
        );
      };


    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const data = {
        labels: ['Neurotypical','Motor dysgraphia','Spatial dysgraphia','Phonological dysgraphia','Executive functioning dysgraphia'
        ], // X-axis labels
        datasets: [
        {
            label: 'Model prediction', // Label for the bar chart
            data:  [42, 61,78,13,29],
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
            borderColor: 'rgba(75, 192, 192, 1)', // Border color
            borderWidth: 1, // Border width
        },
        ],
    };
    const options = {
        responsive: true, // Make the chart responsive
        plugins: {
            title: {
            display: true,
            text: 'Model Predictions', // Title of the chart
            },
        },
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
            let image_name = data['imgs'][0].name
            setCurrentImage(image_name)
            console.log(image_name)
            setCurrentPrediction(data['imgs'][0].label);
            setRender(true);
            setTaskTime(Date.now())
        });
    }, []);    


    return (
      <>
       {render ?

            <div className="container">

            

            <div className="title">Dysgraphia At-Home Screening</div>
            <div>
                <h1>Results:</h1>
                <h2>Your child’s profile matches those with 
                    <div>
                        <HoverableDiv
                            handleMouseOver={handleMouseOver}
                            handleMouseOut={handleMouseOut}
                        />
                        {isHovering && <HoverText />}
                    </div>
                </h2>
                
                <p>Spatial dysgraphia is a type of learning disability that affects a person's ability to write legibly and organize their writing in a spatially appropriate manner. It is characterized by:</p>
                <ol>
                    <li> <b>Inconsistent spacing:</b> words and letters are spaced irregularly, with some too close and some too far apart.</li>
                    
                    <div className="img-frame">
                        <img className="image-inner" src={pixel_attributed1} alt="pixel-attributed handwriting"/>
                        <Button className="btn-2" onClick={handleDisplayInfo}>
                            Click for more information
                        </Button>
                    </div>

                    <br></br>
                    <br></br>

                    <li> <b>Misaligned writing:</b> writing does not stay on the line and may slant upwards or downwards.</li>

                    <div className="img-frame">
                        <img className="image-inner" src={pixel_attributed2} alt="pixel-attributed handwriting"/>
                        <Button className="btn-2" onClick={handleDisplayInfo}>
                            Click for more information
                        </Button>
                    </div>

                    <br></br>
                    <br></br>

                    <li> <b>Poor placement of text:</b> letters or words may crowd together or overlap.</li>

                    <div className="img-frame">
                        <img className="image-inner" src={pixel_attributed3} alt="pixel-attributed handwriting"/>
                        <Button className="btn-2" onClick={handleDisplayInfo}>
                            Click for more information
                        </Button>
                    </div>

                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </ol>
            </div>

            <Modal
                    visible={visible}
                    title="Additional information"
                    centered
                    footer={null}
                    onCancel={handleCancel}
                >
                    <div className="pop-container">
                        <h2>Inconsistent spacing in <b><u>spatial dysgraphia.</u></b></h2>
                        <p>Some misaligned writing or slanting of letters and words on the line is expected of young children. It is a concern when the problem persists over time despite practice, or the issue is not age-appropriate.</p>
                        <p>Here are some examples of handwriting from children your age, with and without spatial dysgraphia:</p>

                        <br></br>
                        <br></br>

                        <div className="column-container">
                            <div className="left-column">
                                <p>Neurotypical:</p>
                                <img className="image-inner" src={ex_typ} alt="example handwriting from neurotypical child"/>
                                <img className="image-inner" src={img_plchldr} alt="a placeholder for other model-retrieved images"/>
                                <img className="image-inner" src={img_plchldr} alt="a placeholder for other model-retrieved images"/>
                                <img className="image-inner" src={img_plchldr} alt="a placeholder for other model-retrieved images"/>
                            </div>
                            <div className="right-column">
                                <p>Dysgraphic:</p>
                                <img className="image-inner" src={ex_dys1} alt="example handwriting from dysgraphia"/>
                                <img className="image-inner" src={img_plchldr} alt="a placeholder for other model-retrieved images"/>
                                <img className="image-inner" src={img_plchldr} alt="a placeholder for other model-retrieved images"/>
                                <img className="image-inner" src={img_plchldr} alt="a placeholder for other model-retrieved images"/>
                            </div>
                        </div>

                        <p><u>These images are obtained by retrieving the most similar images to the uploaded image from each category (dysgraphic, neurotypical). These images are part of our database and has been categorized by healthcare professionals specializing in dysgraphia.</u></p>

                        
                    </div>
                </Modal>


            </div>

        :
            <> 
            <h1> Loading ...</h1>
            </>
        }
      </>
       
      );
}


export default Main2Container;