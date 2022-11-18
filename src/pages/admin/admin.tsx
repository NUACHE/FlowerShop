import { useState } from "react";
import Swal from "sweetalert2";
import { GrClose } from 'react-icons/gr';
import { Link } from "react-router-dom";

const Admin = () => {

    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    // const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [price, setPrice] = useState('');
    const [isPending, setIsPending] = useState(false);

    function fixDate() {
        return new Promise((resolve) => {
            const today = new Date();
            const yyyy = today.getFullYear();
            let mm:number|string = today.getMonth() + 1; // Months start at 0!
            let dd:number|string = today.getDate();
            
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            
            const formattedToday = dd + '/' + mm + '/' + yyyy;

            resolve(formattedToday);
      })}

//    function fixDate(){
    
//     console.log(formattedToday);
//     // setDate(formattedToday);
//     return {Promise<String>formattedToday}
//     }


    const handleSubmit =async () => {
        if( name === "" || url ===""
        ||  title === "" || body === ""
        || price === '' 
        ){
           

            Swal.fire('Fill all fields');
            return;
        }
        setIsPending(true)
        var date = await  fixDate();

        const flower = { name, url, date, title, body, price};
        fetch('http://localhost:8000/flowers',{
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(flower)
        }).then((res)=>{
    setIsPending(false)
    if(res.ok){
        Swal.fire(
            'Success',
            'New flower added 🌹',
            'success'
          );
        setName('');setUrl(''); setTitle('');setBody(''); setPrice('');
        return;
       
    }
    throw new Error('Something went wrong');
    }).catch((e)=>{console.log(e);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
           
          });});
    }

  
    return (<div className="h-screen ">
        <div className="container pt-5 max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <div className="mb-2">
                <Link to={"/"}>
                        <GrClose className="float-right " />

            </Link>
                </div>
               
            
                <h1 className="mb-8 text-3xl text-center">New Flower 🌹</h1>
                <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Image URL</label>
                
                <div className="flex">
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        placeholder="Image URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button onClick={() => navigator.clipboard.readText()
                        .then(text => {
                            console.log('Pasted content: ', text);
                            setUrl(text);
                        })
                        .catch(err => {
                            console.error('Failed to read clipboard contents: ', err);
                        })} className="bg-stone-400 mb-4 mt-2.5 rounded-md ml-5 h-8 w-20">
                        Paste
                    </button>
                </div>
                
                <div className="flex">
                    <div className="w-full">
                    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Name</label>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mr-1 mb-4"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />

                    </div>
               
                    <div className="w-full">
                    <label htmlFor="" className="block mb-2 text-sm  font-medium text-gray-900 dark:text-gray-400">Price</label>
                   
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 ml-1 rounded mb-4"
                        name="price"
                        placeholder="Price" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    
                </div>
                
                
                <label htmlFor="" className="block mb-2 text-sm  font-medium text-gray-900 dark:text-gray-400">Title</label>
                   

                <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="title"
                    placeholder="Title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    
                    />
                    <label htmlFor="" className="block mb-2 text-sm  font-medium text-gray-900 dark:text-gray-400">Body</label>
                   
                    <textarea  value={body}
                        onChange={(e) => setBody(e.target.value)} id="body" rows={4} className="block mb-4 p-2.5 w-full text-sm text-gray-900 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Body...">

                    </textarea>
                
                

                <div className="flex items-center justify-center">

                    {isPending && <button
                    disabled
                        type="submit"
                        onClick={handleSubmit}
                        className="w-1/2 text-center py-2 rounded bg-orange-500 text-white hover:bg-green-dark focus:outline-none my-1"
                    >Adding...</button>}
                    {!isPending && <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-1/2 text-center py-2 rounded bg-orange-500 text-white hover:bg-green-dark focus:outline-none my-1"
                    >Add New</button>}
                </div>

                


            </div>


        </div>
    </div>);
}

export default Admin;