import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SingInNav from './SingInNav'
import SingOutNav from './SingOutNav'
import {connect} from 'react-redux'
import useWindowDimensions from './useWindowResize';

function Nav({auth , profile}) {
    const { width } = useWindowDimensions();
    const [classNav , setNav] = useState(false)

    const isLogIn = auth.uid ? true : false
    if(width < 550){
        setNav(!classNav)
    }

    return (
        <nav>
            <Link to="/"><h1>Car forum</h1></Link>
            <div id="links-container">
                { isLogIn && <SingInNav profile={profile} />}
                { !isLogIn && <SingOutNav />}
            </div>
        </nav>
    )
}

const mapStatetoProps = (state)=>{
    return{
        auth: state.firebase.auth,
        profile : state.firebase.profile
    }
}

export default connect(mapStatetoProps)(Nav)
