import React from 'react'
import Notification from './Notification'
import ProjectList from './ProjectList'
import { connect } from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'

function FirstPage({projects ,auth}) {

    if(!auth.uid)
        return(
            <Redirect  to="singin"/>
        )

    return (
        <div>
            <div id="container">
               <ProjectList projects={projects} />
            </div>
            <Notification />
        </div>
    )
}

const mapStateProject = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth : state.firebase.auth
    }
}

export default compose(
    connect(mapStateProject),
    firestoreConnect([
        { collection: 'projects'}
    ])
)(FirstPage)
