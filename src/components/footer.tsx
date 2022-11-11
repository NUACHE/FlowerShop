import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className=" bg-stone-600 flex items-start flex-row  py-5 lg:px-10 px-2 ">
            <div className="w-1/3  flex flex-col justify-center">

                <div className=" ">
                    <span className="text-orange-500 font-semibold text-lg ">Flower</span>
                    <span className="text-white font-semibold text-lg"> Shop</span>
                </div>
                <div className=" text-white font-thin ">
                    More info cuz this box had to get filled
                </div>
            </div>
            <div className="w-1/3  flex flex-col items-center justify-center text-white ">
                
                    <Link to={'/'}>
                        <div>
                            Home
                        </div>
                    </Link>
                    <Link to={'/shop'}>
                        <div>
                            Shop
                        </div>
                    </Link>
                    <Link to={'/cart'}>
                        <div>
                            Cart
                        </div>
                    </Link>

               


            </div>
            <div className="w-1/3  overflow-hidden flex flex-col justify-center items-center">

           
<div className=" text-white font-thin">
Contact
</div>
<div className="  overflow-wrap text-white font-thin">
f@mail.com
</div>
<div className=" text-white font-thin">
0551110000
</div>
<div className=" text-white font-thin">
Flower Ville
</div>
</div>

            
        </footer>
    );
}

export default Footer;