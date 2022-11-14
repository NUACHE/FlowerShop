import Footer from "../../components/footer";
import NavBar from "../../components/navbar";
import CartCard from "./comp/cartCard";
import Suggestions from "./comp/suggestions";
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react";
import BuyFlowers from "../home/components/buyFlowers";
import { rawData } from "../../utils/interfaces";

const ShopPage = () => {
    const [data, setData] = useState<rawData[]>();
    const [filterInput, setFilterInput] = useState(false);
    const [searchResults, setSearchResults] = useState<rawData[]>([]);

    useEffect(() => {
        fetch('http://localhost:8000/flowers').then(res => {
            return res.json();
        }).then(data => {
            console.log(data);

            setData(data);
        })
    }, []);

    function search(e: string) {
        if (data) {
            if (e === '') {
                setFilterInput(false)
            } else {
                setFilterInput(true)




                var filteredValue = data.filter((cartItem: rawData) => cartItem.name.toLowerCase().includes(e.toLowerCase()));
                setSearchResults(filteredValue);


            }
        }




    }

    return (<div>
        <NavBar />
        <div className="mx-2 lg:mx-20 mt-1">
            <div className="h-screen ">
                
                <div className="flex flex-wrap justify-center ">

                    {filterInput && searchResults.map((flower: rawData) => {
                        return (
                            <div className="lg:my-5 my-1 mx-5 " key={flower.id}>
                                <BuyFlowers flowerId={flower.id} flowerName={flower.name} flowerUrl={flower.url} flowerDate={flower.date} flowerTitle={flower.title} flowerBody={flower.body} flowerPrice={flower.price} flowerQty={1} />
                            </div>

                        )
                    })}
                    {filterInput && searchResults.length < 1 && <div>No Item Found</div>}
                    {!filterInput && data && data.map((flower: rawData) => {
                        return (
                            <div className="lg:my-5 my-1  mx-5" key={flower.id}>
                                <BuyFlowers flowerId={flower.id} flowerName={flower.name} flowerUrl={flower.url} flowerDate={flower.date} flowerTitle={flower.title} flowerBody={flower.body} flowerPrice={flower.price} flowerQty={1} />
                            </div>

                        )
                    })}
                </div>


            </div>

        </div>

    </div>);
}

export default ShopPage;