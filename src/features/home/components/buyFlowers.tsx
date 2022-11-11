
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { add } from '../../../app/counterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

interface flowers{
    flowerId: string,
    flowerName?:string,
    flowerUrl: string,
    flowerDate: string,
    flowerTitle:string,
    flowerBody:string,
    flowerPrice:string,
    flowerQty: 1,
}

const BuyFlowers = ({flowerId, flowerName, flowerUrl, flowerDate, flowerTitle, flowerBody, flowerPrice, flowerQty} :flowers) => {
    const dispatch = useDispatch();

    
   
    return ( 
      
        <div className="  bg-white rounded-sm mx-3 lg:mt-0 mt-10">
                        <div className=" rounded-sm flex justify-center">
                        <Link to={`/details/${flowerId}`} state={{flowerId, flowerName, flowerUrl, flowerDate, flowerTitle, flowerBody, flowerPrice, flowerQty}}>
                        <img src={`${flowerUrl}`} alt="" style={
                            {"height": "140px", "width":"200px",}
                        }  className="flex-none  bg-slate-100" />
                        </Link>


                        </div>
                        <div className="pl-2 text-sm py-2 ">{flowerName}</div>
                        <div className="px-2 py-1 mt-1 mb-1 text-sm flex justify-between ">
                            <div className="text-xs">${flowerPrice}</div>
                            <div className="text-xs  flex text-orange-500 hover:cursor-pointer" onClick={()=>dispatch(add({flowerId, flowerName, flowerUrl, flowerDate, flowerTitle, flowerBody, flowerPrice,flowerQty   }))}> <AiOutlineShoppingCart size={"14px"} /> Add to cart</div>

                        </div>
                    </div>
                    
     );
}
 
export default BuyFlowers;