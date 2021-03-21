import React from 'react'
import {Link } from 'react-router-dom'
import SingInNav from './SingInNav'
import SingOutNav from './SingOutNav'

export default function Nav() {
    return (
       <nav>
           <div>
               <Link to="/"><h1>Projects</h1></Link>
               <SingInNav/>
               <SingOutNav />
           </div>
       </nav>
    )
}
