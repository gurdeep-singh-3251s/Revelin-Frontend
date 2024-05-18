import React from 'react';
import Layout from '../components/Layout/Layout';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Typography, Card, Row, Col } from 'antd';

const { Title, Paragraph } = Typography;

function Contact() {
  return (
    <Layout title="Contact us - UniDeals">
      <div className="container" style={{ padding: '20px' }}>
        <Row className="contactus" gutter={[16, 16]} style={{ marginTop: '50px' }}>
          <Col xs={24} md={12}>
            <img
              src="images/Contact_Us.jpg"
              alt="Contact Us"
              style={{ width: '100%', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
            />
          </Col>
          <Col xs={24} md={12}>
            <Card
              bordered={false}
              style={{
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f8f9fa',
              }}
            >
              <Title level={2} className="text-center" style={{ color: '#343a40', marginBottom: '20px' }}>
                Contact Us
              </Title>
              <Paragraph style={{ color: '#6c757d', fontSize: '16px', lineHeight: '1.5' }}>
                Any query and info about product feel free to call anytime we are 24x7 available for our services.
              </Paragraph>
              <Paragraph style={{ marginTop: '20px', fontSize: '16px' }}>
                <EmailIcon style={{ color: '#e74c3c', marginRight: '10px' }} />
                <a href="mailto:gurdeepsingh8975@gmail.com" style={{ color: '#343a40' }}>gurdeepsingh8975@gmail.com</a>
              </Paragraph>
              <Paragraph style={{ marginTop: '20px', fontSize: '16px' }}>
                <PhoneIcon style={{ color: '#3498db', marginRight: '10px' }} />
                +91 6284631996 || +91 7888825893 || +91 9041351383
              </Paragraph>
              <Paragraph style={{ marginTop: '20px', fontSize: '16px' }}>
                <SupportAgentIcon style={{ color: '#2ecc71', marginRight: '10px' }} />
                1800-0000-0000 (toll free)
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default Contact;
