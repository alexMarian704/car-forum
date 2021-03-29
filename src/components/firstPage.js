import React from 'react'
import ProjectList from './ProjectList'
import { connect } from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import {motion} from 'framer-motion'

function FirstPage({projects ,auth}) {

    if(!auth.uid)
        return(
            <Redirect  to="/signin"/>
        )

    return (
        <motion.div 
        animate={{opacity:1}} 
        initial={{opacity:0}}
        exit={{opacity:1}}
        transition={{duration:1.8}}
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
        auth : state.firebase.auth
    }
}

export default compose(
    connect(mapStateProject),
    firestoreConnect([
        { collection: 'projects' , orderBy: ['createdAt' , 'desc']}
    ])
)(FirstPage)
