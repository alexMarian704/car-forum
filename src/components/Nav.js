import React from 'react'
import { Link } from 'react-router-dom'
import SingInNav from './SingInNav'
import SingOutNav from './SingOutNav'

export default function Nav() {
    return (
        <nav>
            <Link to="/"><h1>Projects</h1></Link>
            <div id="links-container">
                <SingInNav />
                <SingOutNav />
            </div>
        </nav>
    )
}
