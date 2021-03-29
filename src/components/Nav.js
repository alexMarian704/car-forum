import React from 'react'
import { Link } from 'react-router-dom'
import SingInNav from './SingInNav'
import SingOutNav from './SingOutNav'
import {connect} from 'react-redux'
import {motion} from 'framer-motion'

function Nav({auth , profile}) {
    const isLogIn = auth.uid ? true : false

    return (
        <motion.nav
        animate={{opacity:1}} 
        initial={{opacity:0}}
        exit={{opacity:1}}
        transition={{duration:1.6}}
        >
            <Link to="/"><h1>Car forum</h1></Link>
            <div id="links-container">
                { isLogIn && <SingInNav profile={profile} />}
                { !isLogIn && <SingOutNav />}
            </div>
        </motion.nav>
    )
}

const mapStatetoProps = (state)=>{
    return{
        auth: state.firebase.auth,
        profile : state.firebase.profile
    }
}

export default connect(mapStatetoProps)(Nav)
