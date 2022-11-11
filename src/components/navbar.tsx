import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Link } from "react-router-dom";

const NavBar = () => {
  const cart = useSelector((state: RootState) => state.counter.cart)

  return (<nav className="w-full h-12 bg-white flex items-center lg:px-10 px-2 justify-between">
    <Link to={'/'} >
      <div className='flex-none' >
        <span className="text-orange-500 font-semibold lg:text-lg text-sm">Flower</span>
        <span className="text-black font-semibold lg:text-lg text-sm"> Shop</span>
      </div>
    </Link>
    <div className=" flex-none">
      <Link to={'/'}>
        <span className={" font-normal text-md lg:px-3 px-1 " + (window.location.pathname === '/' ? "text-orange-500" : "text-black")}>Home</span>
      </Link>
      <Link to={'/shop'}>
        <span className={"  font-normal text-md lg:px-3 px-1 " + (window.location.pathname === '/shop' ? "text-orange-500" : "text-black")}> Shop</span>
      </Link>
      <Link to={'/admin'}>
        <span className={"  font-normal text-md lg:px-3 px-1 " + (window.location.pathname === '/admin' ? "text-orange-500" : "text-black")}> Admin</span>

      </Link>

    </div>
    <Link to={'/cart'}>
      <div className="">
        <strong className="relative inline-flex items-center rounded border border-transparent px-2.5 py-1.5 text-xs font-medium">
        {cart.length > 0 &&  <span className="absolute -top-1 -right-1 h-4 w-5 rounded-full bg-red-600 flex justify-center items-center items"><span className='text-white'>{cart.length}</span></span>}
          <AiOutlineShoppingCart className={" "+  (window.location.pathname === '/cart' ? "text-orange-500" : "text-black")} size={"20px"}  />
        </strong>
      </div>
    </Link>
  </nav>);
}

export default NavBar;