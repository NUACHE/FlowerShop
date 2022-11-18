import { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { decrement, increment, remove } from '../../../features/counterSlice';
import { RootState } from '../../../features/store';

interface flowers {
  flowerId: string,
  flowerName?: string,
  flowerUrl: string,
  flowerDate: string,
  flowerTitle: string,
  flowerBody: string,
  flowerPrice: string,
  flowerQty: number,
}


const CartItem = ({ flowerId, flowerName, flowerUrl, flowerDate, flowerTitle, flowerBody, flowerPrice, flowerQty }: flowers) => {
  const [count, setCount] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    console.log(
      flowerUrl
    )
  }, [])
  return (<div className="h-68   p-6 flex items-center flex-wrap">

{/* Image div */}
    <div className='h-52 md:w-80   '>

      <img src={`${flowerUrl}`} alt=""  className="flex-none rounded-md bg-slate-100 w-full h-full" />

    </div>
    {/* Description and cart div */}
    <div className=' flex flex-row justify-between  '>
      {/* Description */}
      <div className=" px-5 md:w-96      lg:h-48  flex flex-col justify-between">
        <h2 className="font-semibold mt-1 lg:mt-0 text-slate-900 truncate ">{flowerName}</h2>
        <em className='mt-4 lg:mt-0'>{flowerTitle}</em>
        <article className='mt-4 lg:mt-0'>{flowerBody}</article>
       
        
          <div className="mt-4 lg:mt-0 custom-number-input h-10 w-32 ">
            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
              <button onClick={() => {
                console.log(flowerId);
                dispatch(decrement(flowerId))
              }} data-action="decrement" className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                <span className="m-auto text-2xl font-thin">−</span>
              </button>
              <input type="number" disabled className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" value={`${flowerQty}`}></input>
              <button onClick={() => {
                //console.log(flowerId);
                dispatch(increment(flowerId))
              }} data-action="increment" className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                <span className="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>



       
      </div>
      {/* Cart */}
      <div className='flex flex-col justify-between px-2 ' >
        <MdDelete className='hover:cursor-pointer mt-3 ' onClick={() => {
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(remove(flowerId))
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        }
        } />

        <strong>Unit price : ${flowerPrice}</strong>
      </div>


    </div>





  </div>
  );
}

export default CartItem;