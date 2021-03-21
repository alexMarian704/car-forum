import React from 'react'
import {NavLink} from 'react-router-dom'

export default function SingOutNav() {
    return (
        <ul>
            <li><NavLink to="/">Sing up</NavLink></li>
            <li><NavLink to="/">Log In</NavLink></li>
        </ul>
    )
}
