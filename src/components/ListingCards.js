import React from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify'

const parseDate = (date) => {
    const newDateArr = date.split('-');
    const year = newDateArr[0];
    const month = newDateArr[1];
    const day = newDateArr[2].split('T')[0];

    return `${month}/${day}/${year}`;
}

    const handleDelete = (listing_id,fetchListings) => {
        fetch(`https://locafarm-backend-35edbc31d82d.herokuapp.com/delete-listing/${listing_id}`,{
            method: "DELETE",
            headers:{
                "content-type":"application/json"
            }
        })
        .then(
            resp => {
                if(resp.ok)
                    return resp.json()
                throw new Error();
            }
        )
        .then(data => {
            console.log(data);
            toast.success("Your listing was successfully deleted");
            fetchListings();
        })
        .catch(err => {
            console.log(err);
            toast.error("Something went wrong. Your listing was not deleted, please try again");
        })
    }


const ListingCards = ({ listings , canDelete, fetchListings}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 z-[1]">
      {listings.map((listing) => (
          <div
          key={listing.id}
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out z-[1]"
        >
            <Link to={'/product/' + listing.id} key={listing.id}>
          <img
            className="w-full h-48 object-cover"
            src="https://ih0.redbubble.net/image.27399359.4181/raf,360x360,075,t,fafafa:ca443f4786.jpg"
            alt={listing.name}
          />
            </Link>
          <div className="p-6 flex gap-2 flex-col">
            <Link to={'/product/' + listing.id} key={listing.id}>
            <h2 className="text-xl text-center font-semibold mb-2 text-gray-800 dark:text-white">
              {listing.name}
            </h2>
            </Link>
            
            <div className='flex flex-row gap-1'>
                <label className='text-white font-bold'>Description: </label>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {listing.description}
                </p>
            </div>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                <span className='text-white'>Price:</span> ${listing.price}
              </span>

                {canDelete &&                
                    <button className='mx-auto  text-white bg-black/50-400 border-2 border-black border-solid mt-3 p-1  text-sm font-bold hover:bg-red-500' onClick={() => handleDelete(listing.id,fetchListings)}>Delete Listing</button>
                }

              <span className="text-sm text-center my-2 text-gray-500 dark:text-gray-400">
                Listed on {parseDate(listing.created_at)}
              </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingCards;