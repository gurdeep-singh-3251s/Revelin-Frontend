import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminMenu() {
    return (
        <div className='text-center'>
            <div className="list-group">
                <h4>Admin Panel</h4>
                <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action list-group-item-light list-group-item-action">
                    Create Item
                </NavLink>
                <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action list-group-item-light list-group-item-action">
                    Items 
                </NavLink>
                <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action list-group-item-light list-group-item-action">
                    Orders 
                </NavLink>
            </div>

        </div>
    )
}

export default AdminMenu