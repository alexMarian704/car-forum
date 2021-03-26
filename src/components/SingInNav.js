import React from 'react'
import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import { singOut } from '../store/actions/authAction'

function SingInNav({singOut}) {
    return (
       <ul>
           <li><NavLink to="/newproject">New Project</NavLink></li>
           <li><a onClick={singOut}>Log Out</a></li>
           <li><NavLink to="/">Name</NavLink></li>
       </ul>
    )
}

const mapDispatchToProps = (dispatch)=>{
    return{
        singOut: ()=> dispatch(singOut())
    }
}

export default connect(null , mapDispatchToProps)(SingInNav)
