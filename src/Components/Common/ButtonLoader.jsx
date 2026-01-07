import React, { useState, useEffect } from 'react'
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import LoadingBar from "react-top-loading-bar";
import { ThreeDots } from "react-loader-spinner";

export default function ButtonLoader(props) {
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
      {" "}
      <LoadingBar
        color='#0d6efd'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />{" "}
      <ThreeDots
        height={props?.height ?? "20"}
        width={props?.width ?? "20"}
        radius="9"
        color={props?.color ?? "#fff"}
        ariaLabel="three-dots-loading"
        wrapperClassName=""
        visible={true}
      />
      {toast.error(props.error, {
        position: "top-center",
        hideProgressBar: false,
        autoClose: 3000,
        progress: undefined,
        toastId: "",
      })}
    </React.Fragment>
  )
}
