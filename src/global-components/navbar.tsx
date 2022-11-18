import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';
import { createSearchParams, Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

const NavBar = () => {
  const cart = useSelector((state: RootState) => state.counter.cart)
  const [search, setSearch] = useState(false);
  const [input, setInput] = useState('');
  const { searchedFlower } = useParams<string>();
  

  useEffect(() => {
if(window.location.pathname.includes( '/products/') === true){
   
   console.log(`searched here ${searchedFlower}`);
 
   setSearch(true);

  

   setInput(searchedFlower!);

   console.log(`flower is here ${searchedFlower}`)

}
}, []);

  return (<nav className="w-full h-12 bg-white flex items-center lg:px-10 px-2 justify-between">
    <Link to={'/'} >
      <div className='flex-none' >
        <span className="text-orange-500 font-semibold lg:text-lg text-sm">Flower</span>
        <span className="text-black font-semibold lg:text-lg text-sm"> Shop</span>
      </div>
    </Link>
    
{search &&<form>
    <div className="flex">
       
        <div className="relative lg:w-80">
            <input onChange={(e)=>setInput(e.target.value)} value={`${input}`} type="search" id="search-dropdown" className="focus:ring-2 focus:ring-orange-500 focus:outline-none rounded-lg ring-2 ring-orange-500 block p-2 w-full z-20 text-sm text-gray-900 bg-gray-50 border-" placeholder="Search flowers..." />
            <Link to={ input === ''? {pathname: '/'}: {pathname: input !== ''?  `/products` : '/',   search: createSearchParams({
              query: input,
              page : '1'
            }).toString()}}>
            <button type="submit" onSubmit={(e)=>e.preventDefault} className="absolute top-0 right-0 p-2 text-sm font-medium text-white bg-orange-500 rounded-r-md  hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span className="sr-only">Search</span>
            </button>
            </Link>
        </div>
    </div>
</form>}


   {!search&& <div className=" flex-none">
      <Link to={'/'}>
        <span className={" font-normal text-md lg:px-3 px-1 " + (window.location.pathname === '/' ? "text-orange-500" : "text-black")}>Home</span>
      </Link>
      <Link to={'/products'}>
        <span className={"  font-normal text-md lg:px-3 px-1 " + (window.location.pathname === '/products' ? "text-orange-500" : "text-black")}> Products</span>
      </Link>
      <Link to={'/admin'}>
        <span className={"  font-normal text-md lg:px-3 px-1 " + (window.location.pathname === '/admin' ? "text-orange-500" : "text-black")}> Admin</span>

      </Link>

    </div>}
   
      <div className="flex">
      <strong className="hover:cursor-pointer relative inline-flex items-center rounded border border-transparent px-2.5 py-1.5 text-xs font-medium">
      
      <AiOutlineSearch onClick={()=>{ setSearch(!search); 
        var pattern1 = /[can]/
        console.log('na'.match(new RegExp(pattern1, 'g'))?.length);}} className={" "+  (search === true ? "text-orange-500" : "text-black") } size={"20px"} />
      </strong>
      <Link to={'/cart'}>
        <strong className="relative inline-flex items-center rounded border border-transparent px-2.5 py-1.5 text-xs font-medium">
        {cart.length > 0 &&  <span className="absolute -top-1 -right-1 h-4 w-5 rounded-full bg-red-600 flex justify-center items-center items"><span className='text-white'>{cart.length}</span></span>}
          <AiOutlineShoppingCart className={" "+  (window.location.pathname === '/cart' ? "text-orange-500" : "text-black")} size={"20px"}  />
        </strong>
        </Link>
      </div>
    
  </nav>);
}

export default NavBar;