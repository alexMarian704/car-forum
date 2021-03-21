import React from 'react'
import {NavLink} from 'react-router-dom'

export default function SingInNav() {
    return (
       <ul>
           <li><NavLink to="/newproject">New Project</NavLink></li>
           <li><NavLink to="/">Log Out</NavLink></li>
           <li><NavLink to="/">Name</NavLink></li>
       </ul>
    )
}
