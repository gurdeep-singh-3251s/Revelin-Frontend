import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { TransactionContext } from '../context/transaction';

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full form-control rounded-sm p-2 bg-transparent text-black border-black text-sm"
  />
);

const CartPage = () => {
  const { connectWallet, currentAccount, formData, sendTransaction, handleChange } = useContext(TransactionContext);
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getEthereumPrice = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const data = await response.json();
      return data.ethereum.usd;
    } catch (error) {
      console.error('Error fetching Ethereum price:', error);
      return null;
    }
  }

  const amountInEthereum = async () => {
    const totalPriceInDollars = parseFloat(totalPrice().replace(/[^\d.]/g, '')); // Remove non-numeric characters from total price
    const ethereumPrice = await getEthereumPrice();
    if (totalPriceInDollars && ethereumPrice) {
      const ethereumAmount = totalPriceInDollars / ethereumPrice;
      return ethereumAmount.toFixed(6); // Return Ethereum amount with 6 decimal places
    }
    return 0; // Return 0 if unable to calculate
  };

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;
    e.preventDefault();
    amount = 0.000001;
    addressTo = '0x70D63068124285D8b9f5E978FDcCFf0a9e9D3827';
    keyword = 'test';
    message = 'test';
    sendTransaction();
  }

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  }

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex(item => item._id === pid);
      myCart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(myCart));
      setCart(myCart);
    } catch (error) {
      console.log(error);
    }
  }

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2 className='bg-light p-2 mb-1'>Hello {auth?.token && auth?.user?.name}</h2>
            <h5>
              {cart?.length ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "Please Login to checkout"}` : "Your Cart is Empty"}
            </h5>
          </div>
        </div>
        <div className="row m-4">
          <div className="col-md-9">
            <h5>Cart Items</h5>
            {cart?.map((p) => (
              <div key={p._id} className="row card flex-row p-3 mb-4 mt-4">
                <div className="col-md-3">
                  <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} height={'200px'} className="card-img-top border-top-0" alt={p.name} />
                </div>
                <div className="col-md-9">
                  <h4>{p.name}</h4>
                  <p>{p.description.substring(0, 30)}</p>
                  <h4>Price: {p.price}</h4>
                  <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-3 text-center">
            <h4>Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <div className="mb-3">
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button className="btn btn-outline-warning" onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button className="btn btn-outline-warning" onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                ) : (
                  <button className="btn btn-outline-warning" onClick={() => navigate("/login", { state: "/cart" })}>Please Login to checkout</button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? "" : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: 'vault',
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button className='btn btn-primary' onClick={handlePayment} disabled={!clientToken || !auth?.user?.address}>
                    {loading ? "Processing...." : 'Make Payment'}
                  </button>
                  <br />
                  {!currentAccount && (
                    <button type="button" onClick={connectWallet} className="btn btn-primary my-3">
                      Connect Wallet and Make Transactions
                    </button>
                  )}
                  <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                    <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
                    <div className="h-[1px] w-full bg-gray-400 my-2" />
                    {!loading && (
                      <button type="button" onClick={handleSubmit} className="btn btn-secondary mt-2">
                        Send now
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
