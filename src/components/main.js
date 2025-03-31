import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import ListingCards from './ListingCards';
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

                <div >
                    <ListingCards canDelete={false} listings={listings}/>
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