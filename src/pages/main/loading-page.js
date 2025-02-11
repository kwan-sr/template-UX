import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoadingPageContainer = () => {
  const history = useHistory();

  const routeChange = () =>{ 
    let path = '/#/Main2'; 
    window.location.assign(path);
    }

  useEffect(() => {
    // Set a timer for 3 seconds, then redirect to the next page
    const timer = setTimeout(() => {
      // Replace '/nextPage' with the actual route you want to navigate to
      routeChange("/#/Main2");
    }, 3000);

    // Clear the timer when the component is unmounted to prevent memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Loading results...</h2>
    </div>
  );
};

export default LoadingPageContainer;
