import { useState } from "react";
import loader from "../assets/loader.gif";
import { BounceLoader } from "react-spinners";

const Loader = ({ isLoading }) => {
  let [color, setColor] = useState("#FFD03E");

  return (
    <div
      className="loader"
      style={{
        display: isLoading ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "#ffffff", 
        zIndex: 1000,
      }}
    >
     
      <BounceLoader color={color} loading={isLoading} size={50} />
    </div>
  );
};

export default Loader;
