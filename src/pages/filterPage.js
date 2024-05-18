import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/prices';
import { useCart } from '../context/cart';
import { Spin, Card, Row, Col, Button, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { motion } from "framer-motion";
const {Meta} = Card;


const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } }
};

function FilterPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      console.log('Loadmore function called');
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error('Something Went Wrong');
    }
  };

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
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter(c => c !== id);
    }
    setChecked(all);
  };

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
      console.log(error);
    }
  };

  return (
    <div>
      <Layout title="Best Offers - UniDeals">
        <div className="row my-4">
          <div className="col-md-3">
            <div className="filters p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <h6 className="text-center mb-3">Filter by Category</h6>
              <div className="d-flex flex-column ms-2">
                {categories?.map(c => (
                  <Checkbox key={c._id} onChange={(e) => { handleFilter(e.target.checked, c._id); }}>
                    {c.name}
                  </Checkbox>
                ))}
              </div>
              <h6 className="text-center mt-4 mb-3">Filter by Price</h6>
              <div className="d-flex flex-column ms-2">
                <Radio.Group onChange={e => setRadio(e.target.value)}>
                  {Prices?.map(p => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="d-flex align-items-center flex-column mt-4">
                <button className="btn btn-danger" style={{ width: "80%" }} onClick={() => window.location.reload()}>RESET FILTERS</button>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <h1 className="text-center mb-4">All ITEMS</h1>
            <div className="d-flex flex-wrap justify-content-center">
              <Row gutter={[16, 16]} justify="center">
                {products.map((product) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
                    <motion.div variants={containerVariants} initial="hidden" animate="visible">
                      <Card
                        hoverable
                        style={{
                          height: '100%',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          backgroundColor: '#2c3e50',
                          color: '#ecf0f1',
                          textAlign: 'center',
                          padding: '10px'
                        }}
                        cover={
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                            alt={product.name}
                            style={{ height: '220px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
                          />
                        }
                      >
                        <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <Meta
                            title={
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 'bold', color: '#ecf0f1' }}>{product.name}</span>
                                <span style={{ color: '#e74c3c' }}>${product.price}</span>
                              </div>
                            }
                            description={<span style={{ color: '#bdc3c7' }}>{product.description.substring(0, 45) + '...'}</span>}
                          />
                        </Link>
                        <Button
                          type="primary"
                          style={{ marginTop: '10px', backgroundColor: '#e74c3c', borderColor: '#e74c3c' }}
                          icon={<ShoppingCartOutlined />}
                          onClick={() => {
                            setCart([...cart, product]);
                            localStorage.setItem('cart', JSON.stringify([...cart, product]));
                            toast.success('Added to Cart');
                          }}
                        >
                          Add to cart
                        </Button>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </div>
            <div className='d-flex justify-content-center my-4'>
              {products && products.length < total && (
                <button className="btn btn-warning" onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}>
                  {loading ? "Loading...." : "Load more"}
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default FilterPage;
