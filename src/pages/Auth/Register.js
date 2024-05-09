import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
import '../../styles/AuthStyles.css';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const [role,setRole] = useState(true);
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, password, phone, address, answer,role })
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong');

        }
    }

    return (
        <Layout title={"Register Now - UniDeals"}>
            <div className="container" style={{ width: '100vw', position: 'relative', textAlign: 'center', color: 'white', margin: '0', padding: '0', top: '0' }}>
                <img src="/Images/Register.jpg" className="d-block " style={{ width: '100vw', height: '100vh' }} alt="..." />
                <div style={{ fontWeight: '500', fontSize: '2em', position: 'absolute', top: '1vh', left: '35.65vw' }}>
                    <form style={{ background: 'White', marginTop: '10px', display: 'inline-block', padding: '25px', width: '25rem' }}>
                        <h1 className='title' style={{ fontSize: '50px ', color: '#413a45' }}>REGISTRATION FORM</h1>
                        <h5 style={{ color: '#545454' }} className='p-2'><strong>Ready to spice up your life?  </strong><br /> Register now and let the flavor adventure begin!</h5>
                        <div className="mb-3">
                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="exampleInputName" placeholder='Enter Your Name' required />
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" placeholder='Enter Your Email' required />
                        </div>
                        <div className="mb-3">
                            <input type="text" value={phone} className="form-control" onChange={(e) => setPhone(e.target.value)} id="exampleInputNumber" placeholder='Enter Your Phone Number' required />
                        </div>
                        <div className="mb-3">
                            <input type="text" value={address} className="form-control" onChange={(e) => setAddress(e.target.value)} id="exampleInputAddress" placeholder='Enter Your Address' aria-describedby="emailHelp" required />
                        </div>
                        <div className="mb-3">
                            <input type="text" value={answer} className="form-control" onChange={(e) => setAnswer(e.target.value)} id="exampleInputAddress" placeholder='What is your Favorite Sports' aria-describedby="emailHelp" required />
                        </div>
                        <div className="">
                            <input type="password" placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="exampleInputPassword1" required />
                        </div>
                        <div >
                            <select className="custom-select" style={{height:'2rem', fontSize:'1rem', width:'10rem', borderRadius:'5px', boxShadow:' 0 2px inherit'}} value={role} onChange={(e) => setRole(e.target.value)}  required>
                                <option value="">Select Role</option>
                                <option value={true}>Customer</option>
                                <option value={false}>Vendor</option>
                            </select>
                            <div className="invalid-feedback">Please select role for further process</div>
                        </div>

                        <button type="submit" style={{ width: '15rem' }} onClick={handleSubmit} className="btn btn-outline-secondary">REGISTER NOW</button>
                    </form>
                </div>
            </div>

        </Layout>
    )
}

export default Register