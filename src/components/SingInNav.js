import React from 'react'
import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import { singOut } from '../store/actions/authAction'

function SingInNav({singOut , profile}) {
    const initial = profile.initials

    return (
       <ul>
           <NavLink to="/newproject"><li>New Post</li></NavLink>
           <li><a onClick={singOut}>Log Out</a></li>
           {profile.initials && <NavLink to="/your/profile"><li style={{
               color: "white"
           }}>{initial.toUpperCase()}</li></NavLink>}
       </ul>
    )
}

const mapDispatchToProps = (dispatch)=>{
    return{
        singOut: ()=> dispatch(singOut())
    }
}

export default connect(null , mapDispatchToProps)(SingInNav)
