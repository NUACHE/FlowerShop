import Footer from "../../components/footer";
import NavBar from "../../components/navbar";
import CartCard from "./comp/cartCard";
import Suggestions from "./comp/suggestions";
import { useLocation, useParams } from 'react-router-dom'
import {  useEffect, useState,  } from "react";
import { rawData } from "../../utils/interfaces";

const FlowerDetails = () => {
    const location = useLocation()

    const {id} = useParams();
    const [flower, setFlower] = useState<rawData>();

    useEffect(() => {
        fetch('http://localhost:8000/flowers/' + id).then(res =>{
          return  res.json();
        }).then(data=>{
            console.log(data);
          
            setFlower(data);

            console.log(data);
        })
    },[]);
 
  
    return (<div>
        <NavBar />
     { flower &&  <div className="lg:mx-20 mx-4 mt-5">
            <div className="h-full ">
                <CartCard value={flower} />
                <Suggestions  value={flower}/>

            </div>

        </div>
}
       
    </div>);
}

export default FlowerDetails;