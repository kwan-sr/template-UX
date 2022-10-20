import React, { useEffect, useState } from "react";
import './style.css'


// this is how you create a separate component
function PredictionContainer({ currentPrediction }) {
    // store the prediction message to display 
    const [predMessage, setPredMessage] = useState("");


    useEffect(() => {
        setPredMessage("The AI assistant suggests this image corresponds to a(n) ")
    }, []);


    return (
        <div className="column-container">
            <div className="prediction-container"> 
                You can create boxes to separate some information
                <p> {predMessage} <pre>{currentPrediction} </pre></p>
            </div> 
        </div>
    )
}

export default PredictionContainer;