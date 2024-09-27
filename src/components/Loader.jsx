import { useState } from "react";
import loader from "../assets/loader.gif"



const Loader=({isLoading})=>{
  let [color, setColor] = useState("#000");

  return (
    <div className="loader" style={{ display: isLoading ? "flex" : "none" }}>
       <img src={loader} alt="loader" loading={isLoading} className='' width={100} height={100} />
    </div>
  );
}


export default Loader


