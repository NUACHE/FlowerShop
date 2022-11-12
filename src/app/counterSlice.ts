import { createSlice } from "@reduxjs/toolkit";
import { original } from 'immer'
import Swal from 'sweetalert2'
import { addedObject } from "../utils/interfaces";

export interface CounterState {
    value: number;
    cart: addedObject[];
    numberofFlowers:number;
    totalPrice: number;
    totalCount:number;
}



const initialState : CounterState = {
    value: 0,
    totalCount: 0,
    cart:localStorage.getItem('cart') === null?  []: localStorage.getItem('cart') === ''? []:  JSON.parse(localStorage.getItem('cart')!) ,
    numberofFlowers: localStorage.getItem('totalQuantity') === null?  0: localStorage.getItem('totalQuantity') === ''? 0:  JSON.parse(localStorage.getItem('totalQuantity')!) ,
    totalPrice: localStorage.getItem('totalPrice') === null?  0: localStorage.getItem('totalPrice') === ''? 0:  JSON.parse(localStorage.getItem('totalPrice')!) ,
}

function containsObject(obj: addedObject, list: addedObject[]) {
    console.log(`contains ${JSON.stringify(obj)}`)
    var i;
    for (i = 0; i < list.length; i++) {

        if ((list[i].flowerId) === (obj.flowerId)) {
            console.log(true);
            return true;
        }
    }
    console.log(JSON.stringify(list));
    console.log(JSON.stringify(obj));

    return false;
}

function findIfValid(obj: string, list: addedObject[]) {
    var i;
    for (i = 0; i < list.length; i++) {

    console.log(list[i].flowerId)
    console.log(obj)

        if (list[i].flowerId === obj) {
            console.log(true);
            return list[i].flowerId;
        }
    }
    // console.log(JSON.stringify(list));
    // console.log(JSON.stringify(obj));
    console.log(false);

    return false;
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, value) => {

            //Find if item is valid and then increase quantity
            if(findIfValid(value.payload, state.cart) !== false){
                var index = findIfValid(value.payload, state.cart);
                console.log(`this is ${index}`)
                var cartItem:addedObject = state.cart.find((b: { flowerId: string; }) => b.flowerId === index.toString())!;
              
                if (cartItem) {
                   
                    cartItem.flowerQty += 1
                }
                //initialize states
                state.numberofFlowers = 0;
                state.totalPrice = 0;

                //update total amount of items
                for (let i = 0; i < state.cart.length; i++) {
                    const quantity:number = state.cart[i].flowerQty;
                    const price = parseInt( state.cart[i].flowerPrice)
                    console.log(quantity);
                    state.numberofFlowers += (quantity);
                    state.totalPrice += ( quantity * price );

                    
                }

                console.log('done');
                console.log(state.numberofFlowers);
                  //update local storage
                  localStorage.setItem("cart", JSON.stringify(state.cart)); 
                   //update local storage
                   localStorage.setItem("totalQuantity", JSON.stringify(state.numberofFlowers)); 
                    //update local storage
                  localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice)); 

                
             
    
            }
        
            
        },
        decrement: (state, value) => {
            if(findIfValid(value.payload, state.cart) !== false){
                var index = findIfValid(value.payload, state.cart);
                console.log(`this is ${index}`)
                var cartItem = state.cart.find((b: { flowerId: string; }) => b.flowerId === index.toString());
              
                if (cartItem) {
                    if(cartItem.flowerQty >1){
                   
                    cartItem.flowerQty -= 1
                    }
                }
              //initialize states
              state.numberofFlowers = 0;
              state.totalPrice = 0;

                //decrease total amount of items
                for (let i = 0; i < state.cart.length; i++) {
                    const quantity:number = state.cart[i].flowerQty;
                    const price = parseInt( state.cart[i].flowerPrice)
                    console.log(quantity);
                    state.numberofFlowers += (quantity);

                    state.totalPrice += ( quantity * price );
                    
                }

                  //update local storage
                  localStorage.setItem("cart", JSON.stringify(state.cart)); 
                    //update local storage
                    localStorage.setItem("totalQuantity", JSON.stringify(state.numberofFlowers)); 
                    //update local storage
                  localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice)); 
    
            }    
        },
        add: (state, cartItem) => {
         

            if (containsObject(cartItem.payload, state.cart) === true) {
                Swal.fire('Item already added to cart')
            } else {

                state.cart.push(cartItem.payload);
                
                //initialize states
                state.numberofFlowers = 0;
                state.totalPrice = 0;

                //update total amount of items
                for (let i = 0; i < state.cart.length; i++) {
                    const quantity:number = state.cart[i].flowerQty;
                    const price = parseInt( state.cart[i].flowerPrice)
                    console.log(quantity);
                    state.numberofFlowers += (quantity);
                    state.totalPrice += ( quantity * price );

                    
                }
                  //update local storage
                  localStorage.setItem("cart", JSON.stringify(state.cart)); 
                    //update local storage
                    localStorage.setItem("totalQuantity", JSON.stringify(state.numberofFlowers)); 
                    //update local storage
                  localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice)); 

                Swal.fire({
                    
                    icon: 'success',
                    title: 'Item has been added',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }


        },
        remove: (state, value) => {
            if(findIfValid(value.payload, state.cart) !== false){
                var id = findIfValid(value.payload, state.cart);
                console.log(`this is ${id}`)
                //find item with id
                var cartItem = state.cart.find((b: { flowerId: string; }) => b.flowerId === id.toString());
              
                if (cartItem) {
                   
                    

                    //filter out items without that id

               state.cart =    state.cart.filter((cartItem:addedObject)=> cartItem.flowerId !== id);
                }
               
                //initialize states
                state.numberofFlowers = 0;
                state.totalPrice = 0;

                //update total amount of items
                for (let i = 0; i < state.cart.length; i++) {
                    const quantity:number = state.cart[i].flowerQty;
                    const price = parseInt( state.cart[i].flowerPrice)
                    console.log(quantity);
                    state.numberofFlowers += (quantity);
                    state.totalPrice += ( quantity * price );

                    
                }
                //update local storage
                localStorage.setItem("cart", JSON.stringify(state.cart)); 
                  //update local storage
                  localStorage.setItem("totalQuantity", JSON.stringify(state.numberofFlowers)); 
                  //update local storage
                localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice)); 
    
            }
        }


    }
})

export const { increment, decrement, add, remove, } = counterSlice.actions

export default counterSlice.reducer