import React from 'react'
import { Link } from 'react-router-dom'
import SingInNav from './SingInNav'
import SingOutNav from './SingOutNav'
import {connect} from 'react-redux'

function Nav({auth , profile}) {
    const isLogIn = auth.uid ? true : false
    return (
        <nav>
            <Link to="/"><h1>Projects</h1></Link>
            <div id="links-container">
                { isLogIn && <SingInNav profile={profile} />}
                { !isLogIn && <SingOutNav />}
            </div>
        </nav>
    )
}

const mapStatetoProps = (state)=>{
    console.log(state)
    return{
        auth: state.firebase.auth,
        profile : state.firebase.profile
    }
}

export default connect(mapStatetoProps)(Nav)
