import Footer from "../../components/footer";
import NavBar from "../../components/navbar";
import CartItem from "./comps/cartItems";
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../app/counterSlice';
import { RootState } from '../../app/store';
import { useEffect } from "react";
import { addedObject } from "../../utils/interfaces";



const CartPage = () => {
    const cart = useSelector((state: RootState) => state.counter.cart)
    const flower = cart[0];
    const value = useSelector((state: RootState) => state.counter.value);
    const totalFlowers = useSelector((state: RootState) => state.counter.numberofFlowers);
    const totalPrice = useSelector((state: RootState) => state.counter.totalPrice);
    const dispatch = useDispatch();

    
    return (
        <div>
            <NavBar />
            <div className="flex flex-row justify-center flex-wrap mx-2 mt-5 ">

                <div className="flex w-5/6 lg:w-4/6  mb-5">


                    <div className="bg-white rounded-md">
                        {cart.map((cartItem: addedObject) => {

                            return (
                            <div  key={cartItem.flowerId}>
                            <CartItem key={cartItem.flowerId} flowerId={cartItem.flowerId} flowerName={cartItem.flowerName} flowerUrl={cartItem.flowerUrl} flowerDate={cartItem.flowerDate} flowerTitle={cartItem.flowerTitle} flowerBody={cartItem.flowerBody} flowerPrice={cartItem.flowerPrice} flowerQty={cartItem.flowerQty} />
                            <hr/>
                            </div>
                            )

                        })}





                    </div>





                </div>
                <div className="rounded-md bg-white ml-2 h-full mb-4 px-4 flex flex-col items-center">
                    <p className="py-2">Subtotal for {totalFlowers} item(s): ${totalPrice}</p>

                    <button className="bg-orange-500  py-1 px-4 rounded-md m-2  text-white ">Checkout</button>
                </div>

            </div>

        </div>
    );
}

export default CartPage;