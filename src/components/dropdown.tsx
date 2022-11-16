import { Dialog, Transition,Disclosure  } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import { ChevronRightIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import RadioTemplate from './radiotemplate'
import { Slider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setFilter } from '../app/counterSlice';

function valuetext(value: number) {
  return `${value}°C`;
}

const plans = [
  {
    name: 'Annuals',
   
  },
  {
    name: 'Biennials',
   
  },
  {
    name: 'Perennials',
   
  },
]

export default function MyModal(props:any) {
  let [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState<number[]>([20, 37]);
  const filters:number = useSelector((state: RootState) => state.counter.filter);
    
    const dispatch = useDispatch();

   const  handleCallBack = () => {
  
    }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    console.log(`here is the new scroll val ${newValue}`)
  };

  const changeCategory=()=>{
    console.log('newCat');
  }

  const childRef = useRef<any>();

  return (
    <>
    <div className=" inset-0 flex items-center justify-center">
      <button
        type="button"
        onClick={openModal}
        className="rounded-3xl bg-orange-500  px-4 py-1 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
       Sort & Filter
      </button>
    </div>

    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className=" flex justify-between text-lg font-medium leading-6 text-gray-900"
                >
                 <div>Filter</div>
                 <div onClick={()=>{
                
                  childRef?.current?.test(); }} className="text-sm mt-1 text-gray-500 underline">
                
                    Clear
                  
                </div>
                </Dialog.Title>
                <div className="w-full px-4 pt-4">
    <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Select Category</span>
              <ChevronUpIcon
                className={`${
                  open ? 'rotate-180 transform' : ''
                } h-5 w-5 text-purple-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-0 pt-4 pb-2 text-sm text-gray-500">
           <RadioTemplate ref={childRef} />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure as="div" className="mt-2">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Select Range</span>
              <ChevronUpIcon
                className={`${
                  open ? 'rotate-180 transform' : ''
                } h-5 w-5 text-purple-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              
            <Slider
      getAriaLabel={() => 'Temperature range'}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      getAriaValueText={valuetext}
    />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  </div>
                

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={()=>{props.handle(filters > 3 ? "All" : plans[filters].name ); closeModal();}}
                  >
                    Apply Changes
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  </>
  )
}
