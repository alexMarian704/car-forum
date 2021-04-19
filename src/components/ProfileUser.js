import React, { useEffect, useState } from 'react'
import { useParams, Link  , Redirect} from 'react-router-dom'
import { app } from '../config/base'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { motion } from 'framer-motion'
import { AddFriend } from './AddFriend'
import Message from './Message'

const ProfileUser = ({ projects , auth, profile}) => {
    const [data, setData] = useState(null)
    const { id } = useParams()
    const db = app.firestore()
    const userPosts = [];

    useEffect(async () => {
        db.collection('users').doc(id).get()
            .then((doc) => {
                if (doc.exists) {
                    setData(doc.data())
                }
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    projects && projects.map((project) => {
        if (project.authorId === id) {
            userPosts.push(project)
        }
    })

    if (id === auth.uid) {
        return(
        <Redirect  to="/your/profile"/>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        >
            {data && data.initials && data.profileImage === undefined && <div id="profilePhoto">{data.initials.toUpperCase()}</div>}
            {data && data.profileImage && <div id="profilePhoto"><img src={data.profileImage} id="imapePhoto" alt="profile" /></div>}
            <AddFriend user={data} auth={auth} profile={profile} id={id}/>
            {data && <h2>First name: {data.firstName}</h2>}
            {data && <h2>Last name: {data.lastName}</h2>}
            <div className="detailContainer">
                <h2>User posts:</h2>
            </div>
            {userPosts.map((post, index) => (
                <div key={index} className="profilePosts">
                    <Link to={`/project/${post.id}`} className="postLink"> <h1 id="cardText">{post.title}</h1></Link>
                    <p>{post.createdAt.toDate().toDateString()}</p>
                </div>
            ))}
        </motion.div>
    )
}

const mapStateProject = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

export default compose(
    connect(mapStateProject),
    firestoreConnect([
        { collection: 'projects', orderBy: ['createdAt', 'desc'] }
    ]))
    (ProfileUser)
