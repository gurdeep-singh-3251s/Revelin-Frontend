import React, { useState, useEffect, Children } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/prices';
import { useCart } from '../context/cart';
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import PaymentIcon from "@mui/icons-material/Payment"
import ShieldIcon from "@mui/icons-material/Shield"
import { motion } from "framer-motion";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const logos = [
  "Images/logo1.png",
  "Images/logo2.png",
  "Images/logo3.png",
  "Images/logo4.png",
  "Images/logo5.png",
  "Images/logo6.png",
  "Images/logo7.png",
  "Images/logo8.png",
  "Images/logo9.png",
  "Images/logo10.png",
  "Images/logo11.png",
  "Images/logo12.png",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } }
};


const MyComponent = () => {
  const [scrollY, setScrollY] = useState(0);


  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};


const ZoomOnHover = ({ children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
};
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
      <Layout title={"Best Offers - UniDeals"} >
        <div id="carouselExampleCaptions" className="carousel slide" style={{ backgroundColor: '#f2f2f2', padding: '20px' }}>
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner" style={{ borderRadius: '10px', overflow: 'hidden' }}>
            <div className="carousel-item active">
              <Link className="dropdown-item" to={`category/vintage`}>
                <img
                  src="/Images/Vintage.jpg"
                  style={{ height: '65vh', width: '100%', objectFit: 'cover' }}
                  className="d-block w-100"
                  alt="Vintage"
                />
              </Link>
            </div>
            <div className="carousel-item">
              <Link className="dropdown-item" to={`category/antique`}>
                <img
                  src="/Images/Antique.jpg"
                  style={{ height: '65vh', width: '100%', objectFit: 'cover' }}
                  className="d-block w-100"
                  alt="Antique"
                />
              </Link>
            </div>
            <div className="carousel-item">
              <Link className="dropdown-item" to={`category/artisanal`}>
                <img
                  src="Images/Artisanal.jpg"
                  style={{ height: '65vh', width: '100%', objectFit: 'cover' }}
                  className="d-block w-100"
                  alt="Artisanal"
                />
              </Link>
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

        <div className="row   text-center" >
          <div className="col-md " style={{ backgroundColor: '#f2f2f2' }}>
            <br />
            <div className="flex flex-row items-center">
              <hr className='flex-grow' style={{ color: 'gray' }} />
              <h2 className='px-2'>Product By Categories</h2>
              <hr className='flex-grow' style={{ color: 'gray' }} />
            </div>

            {/* <h6 className="text-center m-2" style={{ color: 'gray' }}><strong> Culinary Chronicles:- </strong>A Gastronomic Journey Through Breakfast, Lunch, Dinner, and Snacks</h6> */}
            <br />
            <div className="d-flex flex-row flex-wrap" style={{ justifyContent: 'center' }}>
              <Link to={`category/vinatge`}>
                <ZoomOnHover>
                  <div className=" m-3 p-3 justify-center" >
                    <img src="/Images/vintage_cat.png" style={{ height: '14rem', width: '14rem', backgroundColor: 'gray', border: '2.5px solid gray', borderRadius: '5px' }} alt="..." />
                  </div>
                </ZoomOnHover>
              </Link>
              <Link to={`category/antique`}>
                <ZoomOnHover>
                  <div className=" m-3 p-3 justify-center" >
                    <img src="/Images/antique_cat.png" style={{ height: '14rem', width: '14rem', backgroundColor: 'gray', border: '2.5px solid gray', borderRadius: '5px' }} alt="..." />
                  </div>
                </ZoomOnHover>
              </Link>
              <Link to={`category/artisanal`}>
                <ZoomOnHover>
                  <div className=" m-3 p-3 justify-center" >
                    <img src="/Images/artisanal_cat.png" style={{ height: '14rem', width: '14rem', backgroundColor: 'gray', border: '2.5px solid gray', borderRadius: '5px' }} alt="..." />
                  </div>
                </ZoomOnHover>
              </Link>
              <Link to={`category/handicraft`}>
                <ZoomOnHover>
                  <div className=" m-3 p-3 justify-center" >
                    <img src="/Images/decorative_cat.png" style={{ height: '14rem', width: '14rem', backgroundColor: 'gray', border: '2.5px solid gray', borderRadius: '5px' }} alt="..." />
                  </div>
                </ZoomOnHover>
              </Link>
            </div>
          </div>
        </div>
        <div className="row   text-center" style={{ backgroundColor: '#f2f2f2' }}>
          <div className="col-md my-3">
            <h2>
              <hr />
              FEATURES
              <hr />
            </h2>
            <h6 className="text-center m-2" style={{ color: "gray" }}></h6>
            <div
              className="d-flex flex-row flex-wrap"
              style={{ justifyContent: "center" }}
            >
              <div
                className="card m-3 p-3 justify-center"
                style={{
                  height: "8rem",
                  width: "15rem",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  backgroundColor: "#FDEFE6",
                }}
              >
                <LocalShippingIcon />
                <div className="card-body">
                  <h5 className="card-title">Free Shipping</h5>
                </div>
              </div>

              <div
                className="card m-3 p-3 justify-center"
                style={{
                  height: "8rem",
                  width: "15rem",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  backgroundColor: "#CEEBE9",
                }}
              >
                <PaymentIcon />
                <div className="card-body">
                  <h5 className="card-title">Safe Payment</h5>
                </div>
              </div>

              <div
                className="card m-3 p-3 justify-center"
                style={{
                  height: "8rem",
                  width: "15rem",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  backgroundColor: "#E2F2B2",
                }}
              >
                <ShieldIcon />
                <div className="card-body">
                  <h5 className="card-title">Secure Payments</h5>
                </div>
              </div>

              <div
                className="card m-3 p-3 justify-center"
                style={{
                  height: "8rem",
                  width: "15rem",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  backgroundColor: "#D6E5FB",
                }}
              >
                <HeadsetMicIcon />
                <div className="card-body">
                  <h5 className="card-title">Return Gurantee</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 row " style={{ backgroundColor: " #f2f2f2" }}>
          <div className="col-md-12">
            <h1 className="text-center" style={{ color: '#2c3e50', fontFamily: 'Arial, sans-serif' }}>
              <hr style={{ borderColor: '#e74c3c' }} />
              Discover Our Cool & Trendy Products
              <h6 className="text-center m-2 my-2" style={{ color: '#7f8c8d' }}>
                <strong>Handpicked bestsellers just for you!</strong>
              </h6>
              <hr style={{ borderColor: '#e74c3c' }} />
            </h1>
            <div className="d-flex flex-row flex-wrap" style={{ justifyContent: 'center' }}>
              {products.map((p) => (
                <div
                  className="card m-4"
                  style={{
                    height: '28rem',
                    width: '20rem',
                    padding: '1rem',
                    borderRadius: '1rem',
                    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                    background: '#2c3e50',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                  }}
                  key={p._id}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <div className="card-body p-0 d-flex flex-column justify-content-between" style={{ height: '100%' }}>
                      <Link className="product-link" to={`/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                          height="220px"
                          className="card-img-top border-top-0"
                          alt={p.name}
                          style={{ borderRadius: '1rem' }}
                        />
                        <div className="d-flex p-2 flex-row justify-content-between align-items-center">
                          <h4 className="card-title" style={{ margin: 0, fontWeight: 'bold', color: '#ecf0f1' }}>
                            {p.name.split(' ').slice(0, 2).join(' ')}
                          </h4>
                          <h5 className="card-title" style={{ margin: 0, color: '#e74c3c' }}>${p.price}</h5>
                        </div>
                        <p className="card-text" style={{ color: '#bdc3c7', margin: '0.5rem 0' }}>
                          {p.description.substring(0, 45)}...
                        </p>
                      </Link>
                      <button
                        className="btn btn-primary m-3"
                        style={{ alignSelf: 'center', width: '90%', borderRadius: '0.5rem', background: '#e74c3c', border: 'none' }}
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem('cart', JSON.stringify([...cart, p]));
                          toast.success('Added to Cart');
                        }}
                      >
                        Add to cart
                      </button>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            <div className=" p-3 container brands text-center" style={{ backgroundColor: '#f2f2f2' }}>
              <div className='contianer d-inline'>
                <hr />
                <h2 className='d-inline'>
                  Partnerships & Affiliations
                </h2>
                <hr />
              </div>
              <div className="carousel-container" style={{ width: '80%', margin: 'auto', padding: '40px 0' }}>
                <Slider {...settings}>
                  {logos.map((logo, index) => (
                    <div key={index} className="carousel-slide" style={{ display: 'flex !important', justifyContent: 'center', alignItems: 'center' }}>
                      <img src={logo} alt={`Brand Logo ${index + 1}`} className="carousel-image" style={{ maxWidth: '100%', display: 'block', height: '7rem' }} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Homepage