import React, { useState } from 'react'
import ProjectList from './ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { motion } from 'framer-motion'
import firebase from 'firebase/app';
import 'firebase/auth';

function FirstPage({ projects, auth, profile }) {
    const [verify, setVerify] = useState(firebase.auth().currentUser?.emailVerified)

    if (!auth.uid)
        return (
            <Redirect to="/signin" />
        )
    if (verify === false) {
        if (!auth.emailVerified && profile.afterUpdate && auth.uid) {
           const targetUser =  setInterval(() => {
                firebase.auth().currentUser?.reload()
                setVerify(firebase.auth().currentUser?.emailVerified)
            }, 1000)
            return (
                <h1>Verify your email to join</h1>
            )
        }
    }

    return (
        <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 1.8 }}
        >
            <div id="container">
                <ProjectList projects={projects} />
            </div>
        </motion.div>
    )
}

const mapStateProject = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateProject),
    firestoreConnect([
        { collection: 'projects', orderBy: ['createdAt', 'desc'] }
    ])
)(FirstPage)
