import { Link } from "react-router-dom";
import {  useEffect,  } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../../features/counterSlice';
import { flowerDetails } from "../../../utils/interfaces";



const CartCard = (value:flowerDetails) => {
    const dispatch = useDispatch();
 const   {id:flowerId, name:flowerName, url:flowerUrl, date:flowerDate,title: flowerTitle,body: flowerBody, price:flowerPrice} = value.value;
 useEffect(()=>{
    console.log(value);
    console.log('sdsd');
},[])
    return ( <div className=" rounded-md font-sans bg-white">
    <div className="lg:h-70 flex md:flex:none flex-wrap py-5 px-5">
      

        <img src={`${flowerUrl}`} alt="" style={
                            {"height": "200px", "width":"auto",}
                        }  />
        <div className="lg:h-44 mx-5 lg:w-2/3 "  >
            <div className=" ">


                <div className="lg:mt-0 mt-4">
                   {flowerName}
                </div>
                <div className="text-sm mr-10 mt-4">
                    {flowerBody}
                </div>
                <div className="flex justify-between lg:mt-28 mt-5 ">
                    <div>
                        ${flowerPrice} / each
                    </div>
                    {/* Set flower quantity when adding to 1 */}
                    <div onClick={()=>dispatch(add({flowerId, flowerName, flowerUrl, flowerDate, flowerTitle, flowerBody, flowerPrice,'flowerQty':1  }))}>
                        <button className="px-2 bg-orange-400 text-sm rounded-sm flex py-0.5 text-white px-4 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/> </svg>
                             Buy
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>

    <div>

    </div>

</div> );
}
 
export default CartCard;