import React, { useState, useEffect } from "react";
import { Spinner } from "reactstrap";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoadingBar from "react-top-loading-bar";

const Loader = (props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increase progress until it reaches 100%
      if (progress < 100) {
        setProgress(progress + 5);
      } else {
        // If progress reaches 100%, clear the interval and reset progress
        clearInterval(interval);
        setProgress(0);
      }
    }, 100); // Adjust the interval duration as needed
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [progress]);
  return (
    <React.Fragment>
      <LoadingBar
        color="#0d6efd"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />{" "}
      <div className="d-flex justify-content-center mx-2 mt-2">
        <Spinner color="primary"> Loading... </Spinner>
      </div>
      {toast.error(props.error, {
        position: "top-center",
        hideProgressBar: false,
        autoClose: 3000,
        progress: undefined,
        toastId: "",
      })}
    </React.Fragment>
  );
};

export default Loader;
