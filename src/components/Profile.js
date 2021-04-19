import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, useHistory , Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import firebase from 'firebase/app';
import 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faTimes } from '@fortawesome/free-solid-svg-icons'
import { app } from '../config/base'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

function Profile({ profile, auth , projects}) {
    const [photo, setPhoto] = useState(undefined)
    const inputFile = useRef(null)
    const [display, setDisplay] = useState("none")
    const history = useHistory()
    const [deleteError, setDeleteError] = useState(null)
    const [actulaPassword, setActualPassword] = useState('')
    const [passwordView, setPasswordView] = useState('none')
    const myPosts = []

    const db = app.firestore()
    let d = null;
    firebase.auth().currentUser?.reload()
    if (auth.uid) {
        d = new Date(auth.lastLoginAt * 1).toLocaleDateString()
    }

    if (!auth.uid || (firebase.auth().currentUser?.emailVerified === false && profile.afterUpdate))
        return (
            <Redirect to="/signin" />
        )
    const type = ['image/jpeg', 'image/png', 'image/jpg']

    const user = firebase.auth().currentUser;

    const uploadFile = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (type.includes(file.type)) {
            const storageRef = app.storage().ref(file.name)
            storageRef.put(file).on("state_changed", (snap) => {

            }, (err) => {
                console.log(err)
            },
                async () => {
                    const url = await storageRef.getDownloadURL()
                    setPhoto(url);
                    await db.collection('users').doc(auth.uid).update({
                        profileImage:url
                    })
                })
        }
    }

    projects && projects.map((project)=>{
        if (project.authorId === auth.uid) {
            myPosts.push(project)
        }
    })

    const uploadButton = (e) => {
        e.preventDefault()
        inputFile.current.click()
    }

    const deletePopUp = (e) => {
        e.preventDefault()
        setDisplay('block')
    }

    const closePopUp = (e) => {
        e.preventDefault()
        setDisplay('none')
        setPasswordView('none')
    }

    const reveal = (e) => {
        e.preventDefault()
        setPasswordView('block')
    }

    const deleteAccount = async (e) => {
        e.preventDefault()
        if (actulaPassword === 'deleteUser') {
            const credentials = firebase.auth.EmailAuthProvider.credential(
                user.email,
                actulaPassword
            );
            await user.reauthenticateWithCredential(
                credentials
            ).catch((err) => {
                setDeleteError('Wrong password');
            })
            user.delete()
                .then(() => {
                    history.push('/')
                })
                .catch((err) => {
                    setDeleteError(err);
                })
        }else{
            setDeleteError("Please type correct")
        }
    }

    return (
        <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
        >
            {photo === undefined && auth.photoURL === null && profile.initials && profile.profileImage=== undefined &&<div id="profilePhoto">{profile.initials.toUpperCase()}</div>}

            {photo === undefined && profile.profileImage=== undefined && auth.photoURL && <div id="profilePhoto"><img src={auth.photoURL} id="imapePhoto" alt="profile" /></div>}

            {profile.profileImage && <div id="profilePhoto"><img src={profile.profileImage} id="imapePhoto" alt="profile" /></div>}
            <div>
                {profile.friends && <Link to="/your/follow"><h2 id="friendsLink">Follow: {profile.friends.length}</h2></Link> }
                {profile.friends === undefined && <Link to="/your/follow"><h2 id="friendsLink">Friends: 0</h2></Link>}
            </div>
            <form >
                <input type="file" id="profileInput" ref={inputFile} onChange={uploadFile} />
                <button id="setProfile" onClick={uploadButton}><FontAwesomeIcon icon={faCamera} /></button>
            </form>
            {profile.initials && <h2>First Name: {profile.firstName}</h2>}
            {profile.initials && <h2>Last Name: {profile.lastName}</h2>}
            {auth.uid && <h2>Email: {auth.email}</h2>}
            {auth.uid && <h2>Last time login: {d}</h2>}

            <div>
                <button id="deletAccBut" onClick={deletePopUp}>
                    Delete Account
                </button>
                {deleteError && <h2>{deleteError}</h2>}
                <div style={{
                    display: display,
                }} id="deleteContainer">
                    <h2>Are you sure you want to delete your account ?</h2>
                    <button onClick={closePopUp} id="closePopUp"><FontAwesomeIcon icon={faTimes} /></button>
                    <button id="noBut" onClick={closePopUp}>No</button>
                    <button id="yesBut" onClick={reveal}>Yes</button>
                    <div style={{
                        display: passwordView
                    }}>
                        <h3>Type "deleteUser"</h3>
                        <form>
                            <input type="text"
                                value={actulaPassword}
                                onChange={(e) => { setActualPassword(e.target.value) }}
                                id="title"
                                autoComplete="off"
                            />
                        </form>
                        <br />
                        <button onClick={deleteAccount}
                            className="yesBut"
                        >Delete</button>
                    </div>
                </div>
            </div>
            <div className="detailContainer">
                <h2>My posts:</h2>
            </div>
            {myPosts.map((post, index) => (
                <div key={index} className="profilePosts">
                    <Link to={`/project/${post.id}`} className="postLink"> <h1 id="cardText">{post.title}</h1></Link>
                    <p>{post.createdAt.toDate().toDateString()}</p>
                </div>
            ))}
        </motion.div>
    )
}

const mapStateProfile = (state) => {
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth,
        projects: state.firestore.ordered.projects,
    }
}

export default compose(
    connect(mapStateProfile),
    firestoreConnect([
        { collection: 'projects', orderBy: ['createdAt', 'desc'] }
    ]))
    (Profile)
