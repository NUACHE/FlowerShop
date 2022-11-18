import { addedObject, flowerDetails } from "../../../utils/interfaces";
import PreviewFlowers from "../../home/components/previewFlowers";

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


const Suggestions = (value:flowerDetails) => {
    const   {id, name, url, date, title, body, price, qty} = value.value;
 
    return ( 
    <div className="flex lg:justify-end justify-center">

    
    
    <div className="bg-white rounded-md w-72 mt-3 ">
        <p className="p-2">Maybe you like...</p>
        <div className="flex flex-wrap">
            
        <div className="p-1 m-1">
                        <PreviewFlowers flowerId={id} flowerName={name} flowerUrl={url} flowerDate={date} flowerTitle={title} flowerBody={body} flowerPrice={price} flowerQty={1} />
                    </div>
                    <div className="p-1 m-1">
                        <PreviewFlowers flowerId={id} flowerName={name} flowerUrl={url} flowerDate={date} flowerTitle={title} flowerBody={body} flowerPrice={price} flowerQty={1} />
                    </div>
                    <div className="p-1 m-1">
                        <PreviewFlowers flowerId={id} flowerName={name} flowerUrl={url} flowerDate={date} flowerTitle={title} flowerBody={body} flowerPrice={price} flowerQty={1} />
                    </div>
                    <div className="p-1 m-1">
                        <PreviewFlowers flowerId={id} flowerName={name} flowerUrl={url} flowerDate={date} flowerTitle={title} flowerBody={body} flowerPrice={price} flowerQty={1} />
                    </div>
        </div>
       
    </div>
    </div>
     );
}
 
export default Suggestions;