import React from 'react'
import {NavLink} from 'react-router-dom'

export default function SingOutNav() {
    return (
        <ul>
            <li><NavLink to="/singin">Sing in</NavLink></li>
            <li><NavLink to="/singup">Sing Up</NavLink></li>
        </ul>
    )
}
