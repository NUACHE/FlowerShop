import PreviewFlowers from "./components/previewFlowers";
import BuyFlowers from "./components/buyFlowers";
import LatestPosts from "./components/latestPosts";
import Footer from "../../global-components/footer";
import NavBar from "../../global-components/navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addedObject, rawData } from "../../utils/interfaces";





const Home = () => {
    const [data, setData] = useState<rawData[]>();

    useEffect(() => {
        fetch('http://localhost:8000/flowers').then(res => {
            return res.json();
        }).then(data => {
            console.log(data);

            setData(data);
        })
    }, []);


    return (<div className="">
        <NavBar />        <div className="mx-2 lg:mx-20 ">
            <div className="flex mt-5 flex-wrap ">



                <div className="lg:w-2/5 w-full px-5">
                    <h1 className="text-5xl font-normal  flex justify-evenly">

                        Flowers, 🌻 what the world needs

                    </h1>
                    <div className="flex flex-wrap lg:flex-none justify-between lg:justify-none" >
                        <p className="font-semibold text-sm text-gray-400 mt-10">
                            Browse hundreds of flowers
                        </p>
                        
                    </div>
                </div>

                {/* Preview */}

                {data && <div className="lg:w-3/5 w-full flex flex-wrap  justify-center mt-10 lg:mt-0 ">
                    {data.slice(5, 10).map((flower: rawData) => {
                        return (

                            <div className="p-1 " key={flower.id} >
                                <PreviewFlowers flowerId={flower.id} flowerName={flower.name} flowerUrl={flower.url} flowerDate={flower.date} flowerTitle={flower.title} flowerBody={flower.body} flowerPrice={flower.price} flowerQty={1} />
                            </div>

                        )
                    })}

                </div>}

            </div>

            {/* Best sellers */}
            <fieldset className="border-t border-slate-300   lg:mt-10 lg:mx-10 mx-1 mt-4">
                <legend className="lg:mx-auto mx-auto   px-4 text-black text-2xl italic">Best Sellers</legend>
                <div className=" flex flex-wrap lg:flex-none  justify-center mt-4">
                    {data && data.slice(0, 5).map((flower: rawData) => {
                        return (

                            <BuyFlowers key={flower.id} flowerId={flower.id} flowerName={flower.name} flowerUrl={flower.url} flowerDate={flower.date} flowerTitle={flower.title} flowerBody={flower.body} flowerPrice={flower.price} flowerQty={1} />


                        )
                    })}


                </div>
            </fieldset>

            {/* Latest Posts */}

            <fieldset className="border-t border-slate-300  lg:mt-10 lg:mx-10 mx-1 mt-4 pb-10">
                <legend className="mx-auto px-4 text-black text-2xl italic">Latest Posts</legend>
                <div className="flex flex-wrap lg:flex-none justify-center mt-4">
                    {data && data.slice(0, 6).map((flower: rawData) => {
                        return (
                            <LatestPosts key={flower.id} flowerId={flower.id} flowerName={flower.name} flowerUrl={flower.url} flowerDate={flower.date} flowerTitle={flower.title} flowerBody={flower.body} flowerPrice={flower.price} flowerQty={1} />

                        )
                    })

                    }
                </div>
            </fieldset>

        </div>
        <Footer />

    </div>);
}

export default Home;