import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forget-password`, { email, newPassword, answer });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate(location.state || '/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <Layout title={'Forgot-Password - UniDeals'}>
            <div style={styles.loginContainer}>
            <img src="/Images/JewelryMarket.jpg" style={styles.loginImage} alt="Jewelry Marketplace" />
                <div style={styles.loginFormContainer}>
                    <h1 style={styles.loginForm}>Forgot Password</h1>
                    <p style={{ color: '#545454', marginBottom: '20px', lineHeight: '1.5' }}>Forgotten password? No worries – resetting is as easy as ordering your favorite item.</p>
                    <form>
                        <div className="mb-3">
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' required />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder='What is your Favorite Sports' required />
                        </div>
                        <div className="mb-3">
                            <input type="password" placeholder='Enter Your Password' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} className="form-control" required />
                        </div>
                        <button type="submit" onClick={handleClick} className="btn btn-outline-secondary">RESET NOW</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default ForgotPassword;

const styles = {
    loginContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        position: 'relative',
        background: 'url("/Images/JewelryMarket.jpg") no-repeat center center/cover'
    },
    loginImage: {
        display: 'none' // The image is used as a background, so we hide the img element
    },
    loginFormContainer: {
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center'
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    loginTitle: {
        fontSize: '2.5em',
        color: '#333',
        marginBottom: '0.5em'
    },
    loginSubtitle: {
        fontSize: '1.2em',
        color: '#555',
        marginBottom: '1.5em'
    },
    formControl: {
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '1em',
        width: '100%',
        fontSize: '1em'
    },
    btnPrimary: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '1em',
        fontSize: '1.1em',
        color: 'white',
        cursor: 'pointer',
    },
    btnPrimaryHover: {
        backgroundColor: '#0056b3',
        borderColor: '#004085'
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    btnSecondary: {
        backgroundColor: '#6c757d',
        borderColor: '#6c757d',
        width: '48%',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '1em',
        color: 'white',
        cursor: 'pointer',
    },
    btnSecondaryHover: {
        backgroundColor: '#5a6268',
        borderColor: '#545b62'
    }
};