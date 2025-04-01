import { useState, useEffect, useContext, useRef } from "react";
import UserContext from "../Context/userContext";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const UserOrders = ({ onClose }) => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useContext(UserContext);

  const navigate = useNavigate();

  const fetchOrders = () => {
    fetch(
      `https://locafarm-backend-35edbc31d82d.herokuapp.com/orders/buyer/${user.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setOrders(data.orders);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    console.log(user.id);
    fetchOrders();
  }, []);

  const parseDate = (date) => {
    const newDateArr = date.split("-");
    const year = newDateArr[0];
    const month = newDateArr[1];
    const day = newDateArr[2].split("T")[0];

    return `${month}/${day}/${year}`;
  };

  const deleteOrder = (order_id, listing_id) => {
    fetch(
      `https://locafarm-backend-35edbc31d82d.herokuapp.com/orders/${order_id}/delete`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          listing_id: listing_id,
        }),
      }
    )
      .then((resp) => {
        if (resp.ok) return resp.json();
        throw new Error();
      })
      .then((data) => {
        console.log(data);
        toast.success("Your order was successfully deleted");
        fetchOrders();
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "Something went wrong. Your order was not deleted, please try again"
        );
      });
  };

  return (
    <div className="z-100 fixed fade top-0 left-0 bg-black bg-opacity-60 w-full h-full z-[100]">
      <div className="relative w-full h-full">
        <div className="flex justify-center items-center h-[100vh]">
          <div className="bg-white w-[50rem] h-[40rem] border-2 border-solid border-black rounded-2xl p-4 overflow-scroll">
            <IoClose
              size={17}
              onClick={() => onClose()}
              color="red"
              className="relative top-0 left-0"
            />
            <div className="flex flex-col justify-center items-center w-full h-full pb-10">
              <h2 className="font-bold text-2xl my-5">Orders</h2>
              {orders && (
                <div>
                  <div className="grid grid-cols-3 gap-5">
                    {orders.map((order, index) => (
                      <div
                        key={index}
                        id={order.id}
                        className="md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                      >
                        {console.log(order)}
                        <div class="p-2">
                          <span className="text-s font-bold text-white">
                            Listing name:{" "}
                            <p className="mb-1 font-normal text-white dark:text-white">
                              {order.listing_name}
                            </p>
                          </span>
                          <span className="text-s font-bold text-white">
                            {" "}
                            Quantity:{" "}
                            <p class="mb-1 font-normal text-white dark:text-white">
                              {order.quantity}
                            </p>
                          </span>
                          <span className="text-s font-bold text-white">
                            {" "}
                            Seller:{" "}
                            <p class="mb-1 font-normal text-white dark:text-white">
                              {order.seller_firstname}
                            </p>
                          </span>
                          <span className="text-s font-bold text-white">
                            {" "}
                            Placed on:{" "}
                            <p class="mb-1 font-normal text-white dark:text-white">
                              {parseDate(order.created_at)}
                            </p>
                          </span>
                          <span className="text-s font-bold text-white">
                            {" "}
                            Status:{" "}
                            <p class="mb-1 font-normal text-white dark:text-white">
                              {order.fulfilled
                                ? "Fulfilled"
                                : "Pending Fulfillment"}
                            </p>
                          </span>
                        </div>
                        {order.fulfilled && (
                          <div className="flex flex-col justify-center items-center text-center bg-green-500/50 border-1 border-solid border-black p-1 rounded-xl">
                            <p className="text-sm text-white">
                              You order has been fulfilled. Enjoy your purchase!
                            </p>
                          </div>
                        )}
                        {!order.fulfilled &&
                            <button
                            onClick={() =>
                                deleteOrder(order.id, order.listing_id)
                            }
                            className="mx-auto  text-white bg-indigo-400 border-2 border-black border-solid p-1 rounded-xl text-sm font-bold hover:bg-indigo-500"
                            >
                            Delete Order
                            </button>
                        }
                      </div>
                    ))}
                    <div />
                    <div />
                  </div>
                </div>
              )}
              {orders.length < 1 && (
                <div className="flex flex-col justify-center items-center">
                  <h3>You currently have no orders!</h3>
                </div>
              )}
              {!orders && (
                <div className="flex flex-col justify-center items-center">
                  <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500 mt-[10rem]"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
