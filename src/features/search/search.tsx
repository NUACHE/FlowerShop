import NavBar from "../../components/navbar";
import { useSearchParams, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import BuyFlowers from "../home/components/buyFlowers";
import { rawData } from "../../utils/interfaces";
import { Popover } from '@headlessui/react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { BsChevronDown } from 'react-icons/bs';
import MyModal from "../../components/dropdown";

function valuetext(value: number) {
    return `${value}°C`;
  }
const SearchPage = () => {

    const STEP = 0.1;
const MIN = 0;
const MAX = 100;
    
    const [data, setData] = useState<rawData[]>();
    const [filterInput, setFilterInput] = useState(false);
    const [searchResults, setSearchResults] = useState<rawData[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterCategory, setFilterCategory] = useState('All');


    console.log(searchParams.get('query'));
    const [value, setValue] = useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
    
    function sortData(value:string):void {
        console.log(value);
        setFilterCategory(value);
        console.log(`this is filtered ${filterCategory}`);
        var filteredValue: rawData[];
        if(data){
            filteredValue=   data.filter((cartItem: rawData) => cartItem.name.toLowerCase().includes(searchParams.get('query')!.toString().toLowerCase()));
            if(value !== 'All'){
            if(filteredValue){
         filteredValue = filteredValue.filter((cartItem: rawData) => cartItem.category.toLowerCase().includes(value.toString().toLowerCase()));
            }
        }
       
        setSearchResults(filteredValue);
        setFilterInput(true);
        }
   }

    useEffect(() => {
        fetch('http://localhost:8000/flowers').then(res => {
            return res.json();
        }).then(data => {
    //    setSearchParams({filter: searchedFlower!});
            console.log(data);
            setData(data);
            console.log(`searrhr worss ${searchParams.get('query')}`);
            if(searchParams.get('query') === '' || searchParams.get('query') === undefined || searchParams.get('query') === null){
              var  filteredValue = data;
              setSearchResults(filteredValue);
              setFilterInput(true);
            }else{
            var filteredValue = data.filter((cartItem: rawData) => cartItem.name.toLowerCase().includes(searchParams.get('query')!.toString().toLowerCase()));
            if(filterCategory !== 'All'){
                if(filteredValue){
             filteredValue = filteredValue.filter((cartItem: rawData) => cartItem.category.toLowerCase().includes(filterCategory.toString().toLowerCase()));
                }
            }
                setSearchResults(filteredValue);
                setFilterInput(true);

            // setData(data);
            // console.log('done beginning search')

            // search(searchedFlower!)
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
        <div className="lg:px-10 px-1 flex flex-row justify-between items-center h-10 bg-white border-t-2 overflow-x-scroll ">
        <div className="flex flex-none">
        <em>You searched : <strong>{searchParams.get('query')}</strong></em>
        </div>
        
        <MyModal />
        <Popover className="relative">
    <div className="flex bg-gray-300 px-4 py-0.5 rounded-3xl  text-black"><Popover.Button className="">Price </Popover.Button></div>

    <Popover.Panel className="fixed  mt-1 z-50 bg-gray-100 shadow">
      <div className="flex flex-col px-2">
      <Box sx={{ width: 200 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
      </div>

      
    </Popover.Panel>
  </Popover>

  

        {/* <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box> */}
        
        <div className="flex">
             <span className="lg:visible hidden">  <strong>Sort by  </strong>|    </span>

             <div className="w-2"></div>
             <div className="relative  lg:max-w-sm">
            <select onChange={(e)=>{ sortData(e.target.value)}} className="text-gray-500 bg-white   outline-none  focus:border-indigo-600">
               <option>All</option>
                <option>Annuals</option>
                <option>Perennials</option>
                <option>Biennials</option>
                
            </select>
        </div>
        </div>
        </div>
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