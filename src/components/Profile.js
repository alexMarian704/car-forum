import React from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {motion} from 'framer-motion'

function Profile({profile , auth}) {
    let d = null;
    if(auth.uid){
        d = new Date(auth.lastLoginAt*1).toLocaleDateString()
    }

    if(!auth.uid)
        return(
            <Redirect  to="/signin"/>
        )
    return (
        <motion.div
        animate={{opacity:1}} 
        initial={{opacity:0}}
        exit={{opacity:1}}
        transition={{duration:1.4}}
        >
            {profile.initials && <div id="profilePhoto">{profile.initials.toUpperCase()}</div>}
            {profile.initials && <h2>First Name: {profile.firstName}</h2>}
            {profile.initials && <h2>Last Name: {profile.lastName}</h2>}
            {auth.uid && <h2>Email: {auth.email}</h2>}
            {auth.uid && <h2>Last time login: {d}</h2>}
        </motion.div>
    )
}

const mapStateProfile = (state) => {
    return {
        profile : state.firebase.profile,
        auth : state.firebase.auth
    }
}

export default connect(mapStateProfile)(Profile)
