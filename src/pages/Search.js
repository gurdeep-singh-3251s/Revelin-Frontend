import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/Search'
import { Link } from 'react-router-dom'
import { useCart } from '../context/cart';
import { Spin, Card, Row, Col, Button, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { motion } from "framer-motion";
import { toast } from 'react-hot-toast';
const { Meta } = Card;
const { Title } = Typography;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
};

const Search = () => {
    const [values, setvalues] = useSearch();
    const [cart, setCart] = useState([]);

    return (
        <Layout title={'Search results'}>
            <div className="container" style={{ padding: '20px' }}>
                <div style={{ textAlign: 'center', margin: '20px 0', padding: '10px', backgroundColor: '#34495e', borderRadius: '10px' }}>
                    <Title level={2} style={{ color: '#ecf0f1', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Search Results
                    </Title>
                </div>
                <Row gutter={[16, 16]} justify="center">
                    {values.results.map((product) => (
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
        </Layout>
    )
}

export default Search