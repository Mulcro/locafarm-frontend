import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
const Main = () => {
    const [listings, setListings] = useState(null);

    useEffect(() => {
        fetch('https://locafarm-backend-35edbc31d82d.herokuapp.com/listings')
        .then(response => response.json())
        .then(data => {
            setListings(data.listings);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    const [searchParam, setSeachParam] = useState('');
    const handleSeach = () => {
        fetch('https://locafarm-backend-35edbc31d82d.herokuapp.com/search',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                searchParam:searchParam
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.listings);
            setListings(data.listings);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const parseDate = (date) => {
        const newDateArr = date.split('-');
        const year = newDateArr[0];
        const month = newDateArr[1];
        const day = newDateArr[2].split('T')[0];

        return `${month}/${day}/${year}`;
    }

    return (

        <>
            {listings&&
            <div className='flex flex-col justify-center items-center'>

                <h2 className='font-bold text-2xl my-5'>Available Listings</h2>
                
                {/* Write seach function */}
                
                <div className='m-5 flex flex-row justify-center items-center'> 
                    <input type="text" onChange={e => setSeachParam(e.target.value)} placeholder="What are you looking for?" className='border border-black rounded w-[30rem] p-2' />
                    <button onClick={() => handleSeach()} className='rounded border border-black bg-indigo-400 text-white font-bold p-2'>Search</button>
                </div>

                <div className="grid grid-cols-3 gap-5">
                    {listings.map((listing, index) => (
                        <div key={index} id={listing.id} className="flex flex-col items-center max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gradient-to-b from-emerald-300 to-emerald-400 dark:border-gray-700">
                        <a href="#">
                            <img class="rounded-t-lg h-[230px] w-[290px]" src="https://ih0.redbubble.net/image.27399359.4181/raf,360x360,075,t,fafafa:ca443f4786.jpg" alt="" />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5 class="mb-2 rounded-lg p-2 w-[250px] bg-black text-xl font-bold tracking-tight text-white dark:text-white">{listing.name}</h5>
                            </a>
                            <span className='font-bold text-white'> Description: <p class="mb-3 font-normal text-white dark:text-white">{listing.description}</p></span>
                            <span className='font-bold text-white'> Price per lb: <p class="mb-3 font-normal text-white dark:text-white">{`$ ${listing.price}`}</p></span>
                            <span className='font-bold text-white'> Listed on: <p class="mb-3 font-normal text-white dark:text-white">{parseDate(listing.created_at)}</p></span>
                            <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-emerald-200 dark:focus:ring-blue-800">
                               <Link to={'/product/'+listing.id}>
                                Purchase
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                                </Link>
                            </button>
                        </div>
                        </div>
                    ))
                    }


                <div/>
            <div/>
            </div>
            </div>
            }
            {!listings&&
                <div className="flex flex-col justify-center items-center">
                    <h2 className='font-bold text-2xl my-5'>Available Listings</h2>
                    <div className='m-5 flex flex-row justify-center items-center'> 
                        <input type="text" onChange={e => setSeachParam(e.target.value)} placeholder="What are you looking for?" className='border border-black rounded w-[30rem] p-2' />
                        <button onClick={() => handleSeach()} className='rounded border border-black bg-indigo-400 text-white font-bold p-2'>Search</button>
                    </div>
                    <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500 mt-[10rem]"></div>
                </div>

            }
        </>

     );
}
 
export default Main;