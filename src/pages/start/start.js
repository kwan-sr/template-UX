import React, { Component,useState } from "react";
import {Button, Modal} from 'antd'
// import { useHistory} from "react-router";

import "./start.css";

function StartContainer() {
    // let history = useHistory();
    const [agree, setAgree] = useState(false);

    const checkboxHandler = () => {
      setAgree(!agree);
    }
  
    const routeChange = () =>{ 
      let path = '/#/Instructions'; 
      // history.push(path);
      window.location.assign(path);
      console.log('moving to instructions page')
    }


    return (
      <div className="Home">
        <div className="lander">
            <h1>Dysgraphia At-home Screening</h1>
            <h2> This app is for you if... </h2>
            
            <p> You <b>worry</b> that your child or student might have <b>dysgraphia</b>.</p>
            <p> You are not ready or <b>don’t have the resources to get professional diagnosis</b>.</p>
            <p> You want a <b>personalized recommendation</b> before alerting the child or the family of any potential condition.</p>

            <div>
                <input type="checkbox" id="agree" onChange={checkboxHandler} />
                <label htmlFor="agree"> This app uses AI to provide analysis according to a database of children’s handwriting. It is not meant to replace formal diagnosis.</label>
            </div>

            <br></br>

            <Button disabled={!agree} variant="btn btn-success" onClick={routeChange}>
                Continue
            </Button>
        </div>
      </div>
      );
}

export default StartContainer;