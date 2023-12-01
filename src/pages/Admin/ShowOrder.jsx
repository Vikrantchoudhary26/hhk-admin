import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminSidebar from '../../components/Admin/SideBar/AdminSidebar';
import AdminTopbar from '../../components/Admin/TopBar/AdminTopbar';

const ShowOrder = () => {
    const location = useLocation();
    const [order, setOrder] = useState(null);
    const [orderType, setOrderType] = useState(null);

    const [name, setName] = useState(null);
    const [status, setStatus] = useState(null);
    const [paymentMode, setPaymentMode] = useState(null);
    const [address, setAddress] = useState(null);
    const [state, setState] = useState(null);
    const [city, setCity] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [zipcode, setZipCode] = useState(null);
    const [data, setData] = useState(null);

    const [totalPrice, setTotalPrice] = useState(null);

    useEffect(() => {
        if (location.state && location.state.order) {
            setOrder(location.state.order);
            setName(location.state.order.uid?.fullname || null);
            setEmail(location.state.order.uid?.email || null);
            setAddress(location.state.order.uid?.address || null);
            setPhone(location.state.order.uid?.phone || null);
            setCity(location.state.order.uid?.city || null);
            setState(location.state.order.uid?.state || null);
            setData(location.state.order.cartdata || null);
            setTotalPrice(location.state.order.totalprice || null);
            setPaymentMode(location.state.order.paymentmode || null);
            setStatus(location.state.order.status || null);

            // Check order type
            if (location.state.order.cartdata) {
                if (location.state.order.cartdata.length === 1) {
                    setOrderType("buynow");
                } else if (location.state.order.cartdata.length === 3) {
                    setOrderType('gift');
                } else if (location.state.order.customtext !== undefined) {
                    setOrderType('personal');
                } else {
                    setOrderType('multiple');
                }
            }
        }
    }, [location.state]);


    return (
        <>
            <div className='flex w-full h-screen'>
                <AdminSidebar name={'show-order'} />
                <div className='flex flex-col w-full h-screen '>
                    <AdminTopbar />
                    <div className='pt-5 pl-5 pr-5'>
                        <h1 className='font-dmsans text-md w-full'>Order Details</h1>
                        <div className='flex flex-col'>



                            <h1 className='font-dmsans w-full flex text-lg mb-1'>Personal Details:</h1>
                            <p className='w-full flex'>Order Placed By - {name}</p>
                            <p className='w-full flex'>Email - {email}</p>
                            <p className='w-full flex'>Mobile Number - {phone}</p>

                            <h1 className='font-dmsans w-full flex text-lg mb-1 mt-4'>Contact Details:</h1>
                            <p className='w-full flex'>Address - {address}</p>
                            <p className='w-full flex'>City - {city}</p>
                            <p className='w-full flex'>State - {state}</p>

                            <h1 className='font-dmsans w-full flex text-lg mb-1 mt-4'>Billing Details:</h1>
                            <p className='w-full flex'>Total Price - ₹ {totalPrice}</p>
                            <p className='w-full flex'>Payment Mode - {paymentMode}</p>
                            <p className='w-full flex'>Status - {status}</p>

                            <h1 className='font-dmsans w-full flex text-lg mb-1 mt-4'>Order Details:</h1>
                            {orderType === "buynow" ||
                (orderType === "multiple" && (
                  <div className="flex flex-col items-start">
                    {!Array.isArray(data) ? (
                      <>
                        <div className="flex mb-2" key={data.id}>
                          <div className="w-20 h-20 shadow mr-5">
                            {data?.images[0]?.img && (
                              <img
                                className="shadow w-full h-full"
                                src={data?.images[0].img}
                                alt=""
                              />
                            )}
                          </div>

                          <div className="flex flex-col">
                            <p>
                              {data?.name} x {data?.quantity}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      data.map((d, key) => (
                        <div className="flex mb-2" key={key}>
                          <div className="w-20 h-20 shadow mr-5">
                            {d?.productid?.images[0]?.img && (
                              <img
                                className="shadow w-full h-full"
                                src={d?.productid?.images[0]?.img}
                                alt=""
                              />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <p>
                              {d?.productid?.name} x {d?.quantity}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                ))}

                            {orderType === "gift" && (
                                <div className='flex flex-col items-start'>
                                    {data.map((d, key) => (
                                        <div className='flex mb-2' key={key}>
                                            <div className='w-20 h-20 shadow mr-5'>
                                                {d?.box?.images[0]?.img || d?.product?.images[0]?.img || d?.card?.images[0]?.img ? (
                                                    <img
                                                        className='shadow w-full h-full'
                                                        src={d?.box?.images[0]?.img || d?.product?.images[0]?.img || d?.card?.images[0]?.img}
                                                        alt=""
                                                    />
                                                ) : (
                                                    <span>No image available</span>
                                                )}
                                            </div>
                                            <div className='flex flex-col'>
                                                <p>{d?.box?.name || d?.product?.name || d?.card?.name} x {1}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {orderType === "personal" && (
                                <div className='flex flex-col items-start'>
                                    {data.map((d, key) => (
                                        <div className='flex mb-2' key={key}>
                                            <div className='w-20 h-20 shadow mr-5'>
                                                {d?.images[0]?.img ? (
                                                    <img
                                                        className='shadow w-full h-full'
                                                        src={d?.images[0]?.img}
                                                        alt=""
                                                    />
                                                ) : (
                                                    <span>No image available</span>
                                                )}
                                            </div>
                                            <div className='flex flex-col'>
                                                <p>{d?.name} x {1}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowOrder