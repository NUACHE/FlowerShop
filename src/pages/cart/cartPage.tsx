import Footer from "../../global-components/footer";
import NavBar from "../../global-components/navbar";
import CartItem from "./comps/cartItems";
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../features/counterSlice';
import { RootState } from '../../features/store';
import { useEffect } from "react";
import { addedObject } from "../../utils/interfaces";
import Swal from "sweetalert2";



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
            {cart.length < 1 ? <div className="flex justify-center mt-60">No Items Added to Cart</div>: <div className="flex flex-row justify-center flex-wrap mx-2 mt-5 ">

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

                    <button onClick={()=> Swal.fire({
                    
                    icon: 'success',
                    title: 'Order Completed',
                    showConfirmButton: false,
                    timer: 1500
                  }) } className="bg-orange-500  py-1 px-4 rounded-md m-2  text-white ">Checkout</button>
                </div>

            </div>}

        </div>
    );
}

export default CartPage;