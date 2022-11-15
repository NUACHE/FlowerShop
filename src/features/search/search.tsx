import NavBar from "../../components/navbar";
import { useSearchParams, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import BuyFlowers from "../home/components/buyFlowers";
import { rawData } from "../../utils/interfaces";

const SearchPage = () => {
    
    const [data, setData] = useState<rawData[]>();
    const [filterInput, setFilterInput] = useState(false);
    const [searchResults, setSearchResults] = useState<rawData[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams.get('search'));
    
    

    useEffect(() => {
        fetch('http://localhost:8000/flowers').then(res => {
            return res.json();
        }).then(data => {
    //    setSearchParams({filter: searchedFlower!});
            console.log(data);
            console.log(`searrhr worss ${searchParams.get('search')}`);
            if(searchParams.get('search') === '' || searchParams.get('search') === undefined || searchParams.get('search') === null){
              var  filteredValue = data;
              setSearchResults(filteredValue);
              setFilterInput(true);
            }else{
            var filteredValue = data.filter((cartItem: rawData) => cartItem.name.toLowerCase().includes(searchParams.get('search')!.toString().toLowerCase()));
                setSearchResults(filteredValue);
                setFilterInput(true);

            // setData(data);
            // console.log('done beginning search')

            // search(searchedFlower!)
            }
        })
    }, [searchParams.get('search')]);

    function search(e: string) {
        
        console.log(e);
        console.log('starting search ');
        if (data) {
            console.log(data);
            if (e === '') {
                setFilterInput(false)
            } else {
                




                


            }
        }
        




    }

    return (<div>
        <NavBar />
        <div className="mx-2 lg:mx-20 mt-5">
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

export default SearchPage;