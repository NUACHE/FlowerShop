import { forwardRef, useEffect, useImperativeHandle, useState, } from 'react'
import { RadioGroup } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../features/store';
import { setFilter } from '../features/counterSlice';

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



const RadioTemplate = forwardRef((props, ref) => {
  
  useImperativeHandle(ref, () => ({
    test: () => {
       setSelected(null);
       dispatch(setFilter(4))
    }
 }));
  const filters = useSelector((state: RootState) => state.counter.filter);
  const [selected, setSelected] = useState<any>();


 

 
 

  useEffect(()=>{
    const [value] = filters;
    setSelected(plans[filters[0]]);
   // setSelected({name: 'Annual'})
   console.log(`this is for filters ${filters[0]}`)
    console.log(`this is vals ${value}`);
  },[]);
    
    const dispatch = useDispatch();

  return (
    <div className=" px-1 py-2">
      <div className="mx-auto  ">
        <RadioGroup value={selected} onChange={(value:any)=>{console.log(`this is selected ${selected}`); console.log(`this is value ${value}`); setSelected(value); dispatch(setFilter(plans.indexOf(value)))}}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-3">
            {plans.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                      : ''
                  }
                  ${
                    checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {plan.name}
                          </RadioGroup.Label>
                          
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
})

function CheckIcon(props:any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
 
export default RadioTemplate;


