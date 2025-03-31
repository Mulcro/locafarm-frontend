import {useState,useEffect, useContext} from 'react';
import UserContext from '../Context/userContext';
import ListingCards from './ListingCards';

const MyListings = () => {
    const [listings, setListings] = useState([]);
    const [user, setUser] = useContext(UserContext);

    const fetchListings = () => {
        fetch(`https://locafarm-backend-35edbc31d82d.herokuapp.com/my-listings/${user.id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.listings);
            setListings(data.listings);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        console.log(user.id);
        fetchListings();
    }, []);

    return ( 
        <div className='flex ml-[15rem] flex-col justify-center items-center'>
            <h2 className='text-xl font-bold'>My Listings</h2>
            {listings&&
                <ListingCards listings={listings} canDelete={true} fetchListings={fetchListings}/>
            }
            {!listings&&
                <div className="listingpage">
                    <h2>Available Listings</h2>
                    <p>loading...</p>
                </div>

            }

        </div>
     );
}
 
export default MyListings;