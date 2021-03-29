import React from 'react'
import {NavLink} from 'react-router-dom'

function SingOutNav() {
    return (
        <ul>
            <li><NavLink to="/signin">Sign in</NavLink></li>
            <li><NavLink to="/signup">Sign Up</NavLink></li>
        </ul>
    )
}

export default SingOutNav
