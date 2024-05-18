import React from 'react';
import { Layout, Row, Col, Card, Divider } from 'antd';
import { useAuth } from '../../context/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import AdminMenu from '../../components/Layout/AdminMenu';

const { Content } = Layout;

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <Card
              title="Admin Menu"
              style={{ backgroundColor: '#f5f5f5', borderRadius: '8px' }}
              hoverable
            >
              <AdminMenu />
            </Card>
          </Col>
          <Col xs={24} md={18}>
            <Card
              title="Admin Information"
              style={{
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s',
              }}
              hoverable
              className="admin-info-card"
            >
              <div className="mb-3">
                <FontAwesomeIcon
                  icon={faUser}
                  className="mr-2"
                  style={{ fontSize: '18px', color: '#888' }}
                />
                <strong style={{ color: '#333' }}>  Name: </strong> {auth?.user?.name}
              </div>
              <Divider />
              <div className="mb-3">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="mr-2"
                  style={{ fontSize: '18px', color: '#888' }}
                />
                <strong style={{ color: '#333' }}>  Email: </strong> {auth?.user?.email}
              </div>
              <Divider />
              <div className="mb-3">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="mr-2"
                  style={{ fontSize: '18px', color: '#888' }}
                />
                <strong style={{ color: '#333' }}>  Contact: </strong> {auth?.user?.phone}
              </div>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AdminDashboard;
