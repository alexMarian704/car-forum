import React from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router';
import { compose } from 'redux'

function SingleProject({ project , auth }) {

    if(!auth.uid)
        return(
            <Redirect to="/singin"/>
        )

    if (project) {
        const singleProject = project[0];
        return (
            <div>
                <div>
                    <div>
                        <h1>{singleProject.title}</h1>
                        <p>{singleProject.content}</p>
                        <h2>Posted by {singleProject.authorFirstName} {singleProject.authorLastName}</h2>
                        <h3>at 202123 321</h3>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <h1>Loading</h1>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.firestore.ordered.projects)
    return {
        project: state.firestore.ordered.projects,
        auth : state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
        { collection: 'projects', doc: props.match.params.id }
    ])
)(SingleProject)

