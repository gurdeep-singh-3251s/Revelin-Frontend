import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) {
      getProductByCat();
    }
  }, [params?.slug]);

  const getCategoryQuote = () => {
    // Mapping of category names to quotes
    const categoryQuotes = {
      breakfast: "Rise and shine to a world of breakfast delights!",
      lunch: "Savor the flavors of a hearty lunch feast!",
      snacks: "Indulge in delightful snacks that satisfy your cravings!",
      dinner: "End your day on a delicious note with our dinner selections!",
    };


    return categoryQuotes[params.slug.toLowerCase()] || "Explore our culinary delights!";
  };
  const getCategoryImage = () => {
    const categoryImage = {
      breakfast: '/Images/Breakfast_cat.jpg',
      lunch: '/Images/Lunch_cat.jpg',
      snacks: '/Images/Snacks_cat.jpg',
      dinner: '/Images/Dinner_cat.jpg'
    }
    return categoryImage[params.slug.toLowerCase()] || '/Images/Main.jpeg';
  }
  const getProductByCat = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      const data = response.data;
      console.log(data);
      setProducts(data?.products);
      setCategory(data?.category);
      setLoading(false); // Set loading state to false once data is loaded
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading state to false in case of an error
    }
  };

  return (
    <Layout title={'DineDrop - Categories'}>
      <div className="containers ">
        <div className="container" style={{ width: '100vw', position: 'relative', textAlign: 'center', color: 'white', marginLeft: '5px',justifyContent:'center', padding: '0', top: '0' }}>
          <img src={getCategoryImage()} className="d-block " style={{ width: '98vw', height: '90vh' }} alt="..." />
          <div style={{ fontWeight: '500', fontSize: '2em', position: 'absolute', top: '14vh', left: '55vw' }}>
            <div style={{ background: 'none', marginTop: '10px', display: 'inline-block', height:'40rem',justifyContent:'center',alignContent:'center', width: '34vw' }}>
              <h1 className='title' style={{ fontSize: '100px ', color: 'Black' }}><u>{category?.name?.toUpperCase()}</u></h1>
              <h5 style={{ color: '#545454' }} className='text-center'><strong>{getCategoryQuote()} </strong></h5>
              <img src="https://cdn-icons-png.flaticon.com/512/2771/2771401.png" style={{height:'10em'}} alt="" />
            </div>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h6 className="text-center">Our menu </h6>
            <hr />
            <div className="row">
              <div className="col-md-3 offset-1">

              </div>
              <div className="col-md-9 offset-1">
                <div className="d-flex flex-row flex-wrap">
                  {products?.map((p) => (
                    <Link key={p._id} className="product-link" to={`/product/${p.slug}`}>
                      <div className="card m-3" style={{ height: '28rem', width: '18rem' }}>
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                          height={'250px'}
                          className="card-img-top border-top-0"
                          alt={p.name}
                        />
                        <div className="card-body border">
                          <div className="d-flex flex-row justify-content-between">
                            <h4 className="card-title">{p.name[0].toUpperCase() + p.name.slice(1)}</h4>
                            <h5 className="card-title">${p.price}</h5>
                          </div>
                          <p className="card-text">{p.description.substring(0, 60)}</p>
                          <button className="btn btn-secondary" style={{ width: '100%' }}>
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Categories;
