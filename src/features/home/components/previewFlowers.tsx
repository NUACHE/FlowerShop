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


const PreviewFlowers = ({flowerId, flowerName, flowerUrl, flowerDate, flowerTitle, flowerBody, flowerPrice, flowerQty}:flowers) => {
    return (   <Link to={`/details/${flowerId}`} state={{flowerId, flowerName, flowerUrl, flowerDate, flowerTitle, flowerBody, flowerPrice, flowerQty}}><div  style={{  
        backgroundImage: "url(" + `${flowerUrl}` + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }} className={`h-32 bg-cover rounded-md w-32 bg-${flowerName}`}>

    </div></Link>  );
}
 
export default PreviewFlowers;