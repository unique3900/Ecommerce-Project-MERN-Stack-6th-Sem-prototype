import React, {
    useEffect, useState
} from 'react'
import {
    useCart
} from './Context-State/cartContext'
import {
    useAuth
} from './Context-State/auth';
import {
    useNavigate
} from 'react-router-dom';
import { toast } from 'react-toastify';

const CartItems = () => {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        console.log(cart);
    }, []);

    const removeFromCart = (id) => {
        try {
            let myCart = [...cart];
            const index = myCart.findIndex(e => e._id === id);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cartItems', JSON.stringify(myCart));
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="heade mt-5">
                <h2 className='text-center text-4xl font-bold'>Your Cart</h2>
                <p className="text-gray-500 italic text-center py-2">Total
                    <span className='font-bold'>
                        {
                        cart.length
                    }</span>
                    items in cart</p>
            </div>
            <div className=" grid grid-cols-1 justify-around items-start gap-10 px-10 lg:grid-cols-[3fr,2fr]">
                {/*  */}

                {/* Cart Item Box */}
                <div className="flex flex-col mt-5 w-full justify-center place-items-center gap-10">

                    {/* Particular Item Listing */}


                    {
                    cart.map((item, index) => {
                        return (
                            <div key={index}
                                className="flex w-2/3 md:w-full flex-col flex-wrap gap-3 lg:flex-row border-solid border-2 border-sky-300 py-2 px-5 justify-evenly items-center shadow-lg">
                                <img src={
                                        `http://localhost:8080/api/v1/product/get-product-image/${
                                            item._id
                                        }`
                                    }
                                    className='w-28 '
                                    alt=""/>

                                <div className="flex flex-col flex-wrap gap-3">
                                    <p  className=" flex flex-col flex-wrap-reverse text-lg">
                                        {
                                            item.name.slice(0,50) + '....'
                                            
                                        }</p>
                       
                                    
                                    <span className='text-gray-600 italic'>Nrs. {
                                        item.price
                                    }
                                        per pcs</span>
                                </div>

                                <div className="flex flex-row items-center justify-evenly gap-2">
                                    <button className='text-lg font-extrabold'>+</button>
                                    <input type="number" name="cartValue" className='w-20 h-8 text-center border-solid border-2 border-sky-500' id=""
                                        value={2}/>
                                    <button className='text-lg font-extrabold'>-</button>
                                </div>

                                <div className="">
                                    <button onClick={() => {
                                        removeFromCart(item._id);
                                        toast.success("Product Removed from Cart")
                                    }} className="bg-red-600 text-white py-2 px-3 ">Remove</button>
                                </div>


                            </div>
                        )
                    })
                }


                    <hr/>
                </div>


                {/* Order Summary */}

                <div className="flex flex-col border-solid border-1 h-52 border-gray-500 px-3 py-2 gap-2 shadow-lg w-full lg:w-fit">
                    <h2 className='text-center text-2xl font-bold'>Order Summary</h2>
                    <div className="flex flex-row justify-between items-center gap-2">
                        <input type="text" placeholder='Coupne Code' className=' border-solid border-black border-2 px-2 py-2'/>
                        <button className="bg-sky-500 text-white px-3 py-2.5">Apply</button>
                    </div>

                    <hr/>
                    <div className="flex flex-row justify-evenly">
                        <h4 className="text-sky-600 font-bold">{ }</h4>
                        <h5 className="text-black font-bold">{}</h5>

                    </div>

                    <hr/> {
                    !auth.token ? <button className="bg-red-500 text-white font-bold px-3 py-2 w-full mt-3"
                        onClick={
                            () => {
                                navigate('/login')
                            }
                    }>Login to Checkout</button> : <button className="bg-blue-500 text-white font-bold px-3 py-2 w-full mt-3">Checkout</button>
                } </div>

            </div>

        </>

    )
}

export default CartItems
