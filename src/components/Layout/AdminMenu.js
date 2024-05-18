import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function AdminMenu() {
  const styles = {
    container: {
      maxWidth: '300px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
      marginBottom: '20px',
      fontWeight: 'bold',
      color: '#343a40',
      textAlign: 'center',
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '15px',
      marginBottom: '10px',
      borderRadius: '5px',
      backgroundColor: '#ffffff',
      transition: 'background-color 0.3s, transform 0.3s',
    },
    listItemHover: {
      backgroundColor: '#e9ecef',
      transform: 'translateY(-2px)',
    },
    icon: {
      marginRight: '10px',
      color: '#007bff',
    },
  };

  return (
    <div style={styles.container}>
      <div className="list-group">
        <h4 style={styles.title}>Admin Panel</h4>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action"
          style={styles.listItem}
          activeStyle={styles.listItemHover}
        >
          <i className="fa fa-plus-circle" style={styles.icon}></i> Create Item
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action"
          style={styles.listItem}
          activeStyle={styles.listItemHover}
        >
          <i className="fa fa-list" style={styles.icon}></i> Items
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
          style={styles.listItem}
          activeStyle={styles.listItemHover}
        >
          <i className="fa fa-folder" style={styles.icon}></i> Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="list-group-item list-group-item-action"
          style={styles.listItem}
          activeStyle={styles.listItemHover}
        >
          <i className="fa fa-shopping-cart" style={styles.icon}></i> Orders
        </NavLink>
      </div>
    </div>
  );
}

export default AdminMenu;
