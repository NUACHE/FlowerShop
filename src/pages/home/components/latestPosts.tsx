import { Link } from "react-router-dom";

interface flowers{
    flowerId: string,
    flowerName?:string,
    flowerUrl: string,
    flowerDate: string,
    flowerTitle:string,
    flowerBody:string,
    flowerPrice:string,
    flowerQty: number,
}

const LatestPosts = ({flowerId, flowerName, flowerUrl, flowerDate, flowerTitle, flowerBody, flowerPrice, flowerQty} :flowers) => {
    return (
        <Link to={`/details/${flowerId}`} state={{flowerId, flowerName, flowerUrl, flowerDate, flowerTitle, flowerBody, flowerPrice, flowerQty}}>
                        
    <div className=" w-52 bg-white rounded-sm mx-3 lg:mt-0 mt-10">

        <div className=" text-xs p-0.5 mt-0.5 flex items-center justify-end">{flowerDate}</div>

        <div className=" rounded-sm flex justify-center">
            <div style={{  
        backgroundImage: "url(" + `${flowerUrl}` + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }} className="h-32 w-52 bg-green-200 rounded-sm  ">

            </div>


        </div>
        <div className="pl-2 text-xs font-semibold py-2 ">{flowerTitle}</div>
        
            <div className="text-xs px-2 font-normal text-stone-500 mt-1 mb-1">{flowerBody}
            </div>


       
        <div className="px-2 mt-1 mb-1 text-xs flex font-semibold justify-end  ">
           Read more


        </div>
    </div>
    </Link>);
}

export default LatestPosts;