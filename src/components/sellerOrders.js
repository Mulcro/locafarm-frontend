import {useState, useEffect, useContext, useRef} from 'react';
import UserContext from '../Context/userContext';
import {toast} from 'react-toastify';

const SellerOrders = () => {
    const [orders, setOrders] = useState(null);
    const [user, setUser] = useContext(UserContext);

    const fetchOrders = () => {
        fetch(`https://locafarm-backend-35edbc31d82d.herokuapp.com/orders/seller/${user.id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.orders);
            setOrders(data.orders);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        console.log(user.id);
        fetchOrders();
    }, []);

    const parseDate = (date) => {
        const newDateArr = date.split('-');
        const year = newDateArr[0];
        const month = newDateArr[1];
        const day = newDateArr[2].split('T')[0];

        return `${month}/${day}/${year}`;
    }

    const fulfillOrder = (orderId) => {
        fetch(`https://locafarm-backend-35edbc31d82d.herokuapp.com/orders/fulfill`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Order fulfilled successfully');
            fetchOrders();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    //Not working
    const handleDeleteOrder = (orderId,listingId) => {
                fetch(`https://locafarm-backend-35edbc31d82d.herokuapp.com/orders/${orderId}/delete`,{
                    method: "DELETE",
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify({
                        listing_id: listingId
                    })
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
                    toast.success("The order was successfully deleted");
                    fetchOrders();
                })
                .catch(err => {
                    console.log(err);
                    toast.error("Something went wrong. The order was not deleted, please try again");
                })
    }

    return ( 
        <div className='flex ml-[15rem] flex-col justify-center items-center'>
            <h2 className='font-bold text-2xl my-5'>Orders</h2>
            {orders &&
                <div>
                    <div className="grid grid-cols-3 gap-5">
                            {orders.map((order, index) => (
                                <div key={index} id={order.id} className="md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                                    {console.log(order)}
                                <img class="rounded-t-lg h-[220px] w-[250px]" src="https://ih0.redbubble.net/image.27399359.4181/raf,360x360,075,t,fafafa:ca443f4786.jpg" alt="" />
                                <div class="p-5">
                                    <h5 class="mb-2 text-xl font-bold tracking-tight text-white dark:text-white">Order Number: {order.id}</h5>
                                    <span className='font-bold text-white'> Quantity: <p class="mb-3 font-normal text-white dark:text-white">{order.quantity}</p></span>
                                    <span className='font-bold text-white'> Order placed by: {order.buyer_first_name} {order.buyer_last_name}<p class="mb-3 font-normal text-white dark:text-white">{order.total_price}</p></span>
                                    <span className='font-bold text-white'> Placed on: <p class="mb-3 font-normal text-white dark:text-white">{parseDate(order.created_at)}</p></span>
                                    <span className='font-bold text-white'> Status: <p class="mb-3 font-normal text-white dark:text-white">{order.fulfilled ? "Fulfilled" : "Pending Fulfillment"}</p></span>
                                    <div className="flex flex-row w-content justify-around items-center gap-1">
                                    <button disabled={!order.fulfilled ? "" : "hidden"} className='bg-indigo-500 text-white font-bold p-2 rounded-lg hover:bg-green-600' onClick={() => fulfillOrder(order.id)}>Fulfill</button>
                                    <button className='bg-indigo-500 text-white font-bold p-2 rounded-lg hover:bg-red-500' onClick={() => handleDeleteOrder(order.id, order.listing_id)}>Delete Order</button>
                                    </div>
                                </div>
                                </div>
                            ))
                            }


                    <div/>
                <div/>
                </div>
            </div>
            }
            {!orders&&
                <div className="flex flex-col justify-center items-center">
                    <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500 mt-[10rem]"></div>
                </div>
            }

        </div>
     );
}
 
export default SellerOrders;