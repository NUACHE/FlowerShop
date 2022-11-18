import NavBar from "../../global-components/navbar";
import { useSearchParams, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import BuyFlowers from "../home/components/buyFlowers";
import { rawData } from "../../utils/interfaces";
import MyModal from "../../global-components/dropdown";
import ReactPaginate from 'react-paginate';
import Pagination from "@mui/material/Pagination";
import { current } from "@reduxjs/toolkit";



const SearchPage = () => {



    const [data, setData] = useState<rawData[]>();
    const [filterInput, setFilterInput] = useState(false);
    const [searchResults, setSearchResults] = useState<rawData[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterCategory, setFilterCategory] = useState<String>('All');
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [totalTables, setTotalTables] = useState<number>(1);
    const numberPerPage = 8;








    async function sortByCategory(value: string, data: rawData[]) {
        var filteredValue: rawData[];
        if (value !== 'All') {
            filteredValue = data.filter((cartItem: rawData) => cartItem.category.toLowerCase().includes(value.toString().toLowerCase()));
            setSearchResults(filteredValue);
            setFilterInput(true);

        }
        else {
            filteredValue = data;
            console.log(`the whole data is ${filteredValue}`)
            setSearchResults(filteredValue);

            setFilterInput(true);
        }

        return filteredValue;
    }

    async function sortByRange(rangeOfValues: number[], processedData: rawData[]) {
        console.log(`this is the processedData ${processedData}`)
        var filteredValue: rawData[];
        filteredValue = processedData.filter((cartItem: rawData) => (parseInt(cartItem.price) >= rangeOfValues[0]) && parseInt(cartItem.price) <= rangeOfValues[1]);
        setSearchResults(filteredValue);
        setTotalTables(Math.ceil(filteredValue.length / numberPerPage));

        setFilterInput(true);
    }


    async function sortData(value: string, rangeVal: number[]) {
        setCurrentIndex(1);
        console.log(`this is for rangeVal ${rangeVal} the first is ${rangeVal[0]} and second is ${rangeVal[1]} and a data of ${value}`);
        if (data) {
            console.log(data)

            if (searchParams.get('query') !== null) {
                setSearchParams({

                    query: searchParams.get('query')!.toString(),
                    page: currentIndex.toString(),
                    category: value,
                    range: rangeVal.toString()
                });
            } else {
                setSearchParams({

                    category: value,
                    range: rangeVal.toString()
                });
            }

            console.log(`new params ${value} `)
            console.log(`new range ${rangeVal}`)
            if (value !== null) {
                var sortedResults = await sortByCategory(value, data);
                if (rangeVal !== null) {

                    await sortByRange(rangeVal, sortedResults);

                }
            }



        }

    }

    const handlePageClick = (event: any) => {

    };

    useEffect(() => {
        fetch('http://localhost:8000/flowers').then(res => {
            return res.json();
        }).then(async data => {

            if (searchParams.get('query') === '' || searchParams.get('query') === undefined || searchParams.get('query') === null) {
                var filteredValue = data;
                setTotalTables(Math.ceil(data.length / numberPerPage));
                setSearchResults(filteredValue);
                setData(filteredValue);
                setFilterInput(true);
            } else {
                console.log(`what is wrong`)
                var filteredValue = data.filter((cartItem: rawData) => {
                    var pattern1 = `\[${cartItem.name.toLowerCase()}\]`;
                    if (searchParams.get('query')!.toString().toLowerCase().match(new RegExp(pattern1, 'g'))?.length! >= searchParams.get('query')!.toString().length) {
                        console.log(`tadaaa ${cartItem.name}`);
                        return cartItem;

                    }
                })
                setData(filteredValue);
                setSearchResults(filteredValue);
                setTotalTables(Math.ceil(filteredValue.length / numberPerPage));
                console.log(`the filter category is ${filterCategory}`)
                if (searchParams.get('category') !== null) {
                    console.log(searchParams.get('category'))
                    var seivedResults = await sortByCategory(searchParams.get('category')!, filteredValue);
                    if (searchParams.get('range') !== null) {
                        console.log(searchParams.get('range'))
                        sortByRange(searchParams.get('range')!.split(',').map(Number)!, seivedResults)
                    }
                }



            }
        })
    }, [searchParams.get('query')]);

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
        <div className="lg:px-10 px-1 flex flex-row justify-between items-center h-10 bg-white border-t-2  ">
            <div className="flex flex-none">
                <em>{searchParams.get('query') === null ? 'Displaying All Flowers' : 'You searched :'} <strong>{searchParams.get('query')}</strong></em>
            </div>

            <MyModal handle={(data: string, rangeVal: number[]) => { sortData(data, rangeVal); }} />

        </div>
        <div className="mx-2 lg:mx-20 mt-5">
            <div className=" h-96 flex flex-col justify-between">

                <div className="flex flex-wrap justify-center ">

                    {filterInput && searchResults.slice(((currentIndex - 1) * numberPerPage), numberPerPage * currentIndex).map((flower: rawData) => {
                        return (
                            <div className="lg:my-5 my-1 mx-5 " key={flower.id}>
                                <BuyFlowers flowerId={flower.id} flowerName={flower.name} flowerUrl={flower.url} flowerDate={flower.date} flowerTitle={flower.title} flowerBody={flower.body} flowerPrice={flower.price} flowerQty={1} />
                            </div>

                        )
                    })}
                    {filterInput && searchResults.length < 1 && <div>No Item Found</div>}
                    {!filterInput && data && data.slice(((currentIndex - 1) * numberPerPage), numberPerPage * currentIndex).map((flower: rawData) => {
                        return (
                            <div className="lg:my-5 my-1  mx-5" key={flower.id}>
                                <BuyFlowers flowerId={flower.id} flowerName={flower.name} flowerUrl={flower.url} flowerDate={flower.date} flowerTitle={flower.title} flowerBody={flower.body} flowerPrice={flower.price} flowerQty={1} />
                            </div>

                        )
                    })}
                </div>

                <div className="flex justify-center pt-20  pb-5">


                    <Pagination page={currentIndex} defaultPage={1} count={totalTables} variant="outlined" shape="rounded" color="primary" onChange={(e, value) => { console.log(value); setCurrentIndex(value) }} />

                </div>
            </div>

        </div>


    </div>);
}



export default SearchPage;