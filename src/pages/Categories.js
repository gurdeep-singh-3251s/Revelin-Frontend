import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Spin, Card, Row, Col, Button, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { motion } from "framer-motion";
import { useCart } from '../context/cart';
import { toast } from 'react-hot-toast';

const { Meta } = Card;
const { Title } = Typography;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } }
};

const Categories = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    if (params?.slug) {
      getProductByCat();
    }
  }, [params?.slug]);

  const getProductByCat = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      const data = response.data;
      setProducts(data?.products);
      setCategory(data?.category.name);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title={`Revelin - Categories`}>
      <div className="container" style={{ padding: '20px' }}>
        <Spin spinning={loading}>
          <div style={{ textAlign: 'center', margin: '20px 0', padding: '10px', backgroundColor: '#34495e', borderRadius: '10px' }}>
            <Title level={2} style={{ color: '#ecf0f1', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
              Our Items in <span style={{ color: '#e74c3c', textDecoration: 'underline' }}>{category}</span>
            </Title>
          </div>
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
        </Spin>
      </div>
    </Layout>
  );
};

export default Categories;
