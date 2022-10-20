
import React, { Component } from "react";
import { HashRouter, Router, Switch, Route} from 'react-router-dom';

import StartContainer from './pages/start/start';
import InstructionsContainer from './pages/instr/instructions';
import MainContainer from "./pages/main/main";
import SurveyContainer from "./pages/survey/survey"


export default class Routes extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={StartContainer} />
                    <Route path="/Instructions" component={InstructionsContainer} />
                    <Route path="/Main" component={MainContainer} />
                    <Route path="/Survey" component={SurveyContainer} />
                </Switch>
            </HashRouter>

        )
    }
}