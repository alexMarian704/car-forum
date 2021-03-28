import React from 'react'
import { connect } from 'react-redux'

function Profile({profile , auth}) {
    let d = null;
    if(auth.uid){
        d = new Date(auth.lastLoginAt*1).toLocaleDateString()
    }
    return (
        <div>
            {profile.initials && <div id="profilePhoto">{profile.initials.toUpperCase()}</div>}
            {profile.initials && <h2>First Name: {profile.firstName}</h2>}
            {profile.initials && <h2>Last Name: {profile.lastName}</h2>}
            {auth.uid && <h2>Email: {auth.email}</h2>}
            {auth.uid && <h2>Last time login: {d}</h2>}
        </div>
    )
}

const mapStateProfile = (state) => {
    return {
        profile : state.firebase.profile,
        auth : state.firebase.auth
    }
}

export default connect(mapStateProfile)(Profile)
