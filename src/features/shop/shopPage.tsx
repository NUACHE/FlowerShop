import Footer from "../../components/footer";
import NavBar from "../../components/navbar";
import CartCard from "./comp/cartCard";
import Suggestions from "./comp/suggestions";
import { useLocation } from 'react-router-dom'
import {  useEffect, useState } from "react";
import BuyFlowers from "../home/components/buyFlowers";
import { rawData } from "../../utils/interfaces";

const ShopPage = () => {
    const [data, setData] = useState<rawData[]> () ;
    const [filterInput, setFilterInput] = useState(false);
   const [searchResults, setSearchResults] = useState<rawData[]>([]);

useEffect(() => {
    fetch('http://localhost:8000/flowers').then(res =>{
      return  res.json();
    }).then(data=>{
        console.log(data);
      
        setData(data);
    })
},[]);

function search(e:string){
    if(data){
    if(e === ''){
        setFilterInput(false)
    }else{
        setFilterInput(true)
    
  

   
   var    filteredValue =   data.filter((cartItem:rawData)=> cartItem.name.toLowerCase().includes( e.toLowerCase()) );
        setSearchResults(filteredValue);

        
    }
}


   

}
   
    return (<div>
        <NavBar />
        <div className="mx-2 lg:mx-20 mt-5">
            <div className="h-screen ">
                <div>
                <div className="container pt-1 max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-2 mb-5 rounded shadow-md text-black w-full">
                
                <div className="flex justify-center">
                    <input
                        type="text"
                        className="block focus:ring-1 focus:ring-orange-500 focus:outline-none border border-grey-light w-full lg:w-1/2 p-2 rounded "
                        name="fullname"
                        placeholder="Search..."
                  
                        onChange={(e) => search(e.target.value)}
                    />
                  
                </div>
                
                
                


            </div>


        </div>
                </div>
                <div className="flex flex-wrap justify-center ">

                    {filterInput &&searchResults.map((flower:rawData)=>{
                    return (
                      <div className="lg:my-5 my-1 mx-5 " key={flower.id}>
                        <BuyFlowers  flowerId={flower.id} flowerName={flower.name} flowerUrl={flower.url} flowerDate={flower.date} flowerTitle={flower.title} flowerBody={flower.body} flowerPrice={flower.price} flowerQty={1}/>
                        </div>
                      
                    )
                })}
                {filterInput && searchResults.length<1 && <div>No Item Found</div>}
                {!filterInput && data&& data.map((flower:rawData)=>{
                    return (
                      <div className="lg:my-5 my-1  mx-5" key={flower.id}>
                        <BuyFlowers flowerId={flower.id} flowerName={flower.name} flowerUrl={flower.url} flowerDate={flower.date} flowerTitle={flower.title} flowerBody={flower.body} flowerPrice={flower.price} flowerQty={1}/>
                        </div>
                      
                    )
                })}
                </div>
           

            </div>

        </div>
       
    </div>);
}

export default ShopPage;