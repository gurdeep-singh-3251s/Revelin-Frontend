import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/prices';
import { useCart } from '../context/cart';

function Homepage() {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page])

  const loadMore = async () => {
    try {
      console.log('Loadmore function called');
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products])
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error('Something Went Wrong ')
    }
  }
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id);
    }
    else {
      all = all.filter(c => c !== id);
    }
    setChecked(all);

  }

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
    }
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked, radio]);
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);


  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filter`, { checked, radio });
      setProducts(data.products);
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <Layout title={"Best Offers - UniDeals"}>
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/Images/Breakfast.jpg" style={{ height: '75vh' }} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h2>Seeking <span style={{ display: 'inline' }}><h1 style={{ display: 'inline' }}>Morning Bliss?</h1></span>
                </h2>
                <h5> Ask yourself: Have you had <strong>Breakfast</strong> today?</h5>
                <Link className="dropdown-item" to={`category/breakfast`}>
                  <button type="button" className="btn btn-outline-light m-3">Checkout for Breakfast</button>
                </Link>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/Images/Lunch.png" style={{ height: '75vh' }} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h2>Lunchtime <span style={{ display: 'inline' }}><h1 style={{ display: 'inline' }}>Blues?.</h1></span></h2>
                <h5>Our Menu's got the Perfect Pick-Me-Up for you.</h5>
                <Link className="dropdown-item" to={`category/lunch`}>
                  <button type="button" className="btn btn-outline-light m-3">Checkout for Lunch</button>
                </Link>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/Images/Dinner.png" style={{ height: '75vh' }} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h2>Hungry for Inspiration?</h2>
                <h5> Discover the Art of Flavor in Every Bite.</h5>
                <Link className="dropdown-item" to={`category/dinner`}>
                  <button type="button" className="btn btn-outline-light m-3">Checkout for Dinner</button>
                </Link>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="row  my-3 text-center" >
          <div className="col-md my-3">
            <h2><u>RECIPES BY CATEGORY</u></h2>
            <h6 className="text-center m-2" style={{ color: 'gray' }}><strong> Culinary Chronicles:- </strong>A Gastronomic Journey Through Breakfast, Lunch, Dinner, and Snacks</h6>
            <div className="d-flex flex-row " style={{ justifyContent: 'center' }}>
              <Link to={`category/breakfast`}>
                <div className="card m-3 p-3 justify-center" style={{ height: '15rem', width: '15rem', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                  <img src="/Images/Breakfast_icon.jpg" style={{ height: '10rem', width: '10rem' }} className=" rounded-circle " alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">Breakfast</h5>
                  </div>
                </div>
              </Link>
              <Link to={`category/Lunch`}>
                <div className="card m-3 p-3 justify-center" style={{ height: '15rem', width: '18rem', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                  <img src="/Images/Lunch_icon.jpg" style={{ height: '10rem', width: '10rem' }} className=" rounded-circle" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">Lunch</h5>
                  </div>
                </div>
              </Link>
              <Link to={`category/Snacks`}>
                <div className="card m-3 p-3 justify-center" style={{ height: '15rem', width: '18rem', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                  <img src="/Images/Snacks_icon.jpg" style={{ height: '10rem', width: '10rem' }} className=" rounded-circle" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">Snacks</h5>
                  </div>
                </div>
              </Link>
              <Link to={`category/Dinner`}>
                <div className="card m-3 p-3 justify-center" style={{ height: '15rem', width: '18rem', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                  <img src="/Images/Dinner_icon.jpg" style={{ height: '10rem', width: '10rem' }} className=" rounded-circle" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">Dinner</h5>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>


        <div className="row my-3">
          <div className="col-md">
            <h1 className="text-center"><u>Our Top-rated Dishes</u></h1>
            <h6 className="text-center my-2" style={{ color: 'Gray' }}><strong>Signature Delights:- </strong> A Culinary Journey Through Our Most Popular Dishes</h6>
            <div className="d-flex flex-row  flex-wrap" style={{ justifyContent: 'center' }}>
              {products.map((p) => (
                <div className="card m-3 " style={{ height: '28.5rem', width: '18rem' }}>
                  <div className="card-body p-0 border">
                    <Link key={p._id} className='product-link  ' to={`/product/${p.slug}`}>
                      <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} height={'250px'} className="card-img-top border-top-0 " alt={p.name} />
                      <div className="d-flex p-2  flex-row justify-content-around">
                        <h4 className="card-title ">{p.name[0].toUpperCase() + p.name.slice(1)}</h4>
                        <h5 className="card-title ">${p.price}</h5>
                      </div>
                      <p className="card-text text-center ">{p.description.substring(0, 60)}</p>
                    </Link>

                    <button className="btn btn-secondary m-3  " style={{ width: "90%" }} onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem("cart", JSON.stringify([...cart, p]))
                      toast.success('Added to Cart')
                    }} >Add to cart</button>
                  </div>
                </div>
              ))}
            </div>
            <div className='ms-5 p-3'>
              {products && products.length < total && (
                <button className="btn btn-warning" onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}>
                  {loading ? "Loading...." : "Loadmore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Homepage