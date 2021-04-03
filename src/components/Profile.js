import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { motion } from 'framer-motion'
import firebase from 'firebase/app';
import 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { app } from '../config/base'

function Profile({ profile, auth }) {
    const [photo, setPhoto] = useState(undefined)
    const inputFile = useRef(null)
    console.log(profile, auth)

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
                    await user.updateProfile({
                        photoURL: url
                    }).then(async () => {
                        await firebase.auth().currentUser?.reload()
                    })
                })
        }
    }

    const uploadButton = (e) => {
        e.preventDefault()
        inputFile.current.click()
    }

    return (
        <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
        >
            {photo === undefined && auth.photoURL === null && profile.initials && <div id="profilePhoto">{profile.initials.toUpperCase()}</div>}

            {photo === undefined && auth.photoURL && <div id="profilePhoto"><img src={auth.photoURL} id="imapePhoto" /></div>}

            {photo && <div id="profilePhoto"><img src={photo} id="imapePhoto" /></div>}

            <form >
                <input type="file" id="profileInput" ref={inputFile} onChange={uploadFile} />
                <button id="setProfile" onClick={uploadButton}><FontAwesomeIcon icon={faCamera} /></button>
            </form>
            {profile.initials && <h2>First Name: {profile.firstName}</h2>}
            {profile.initials && <h2>Last Name: {profile.lastName}</h2>}
            {auth.uid && <h2>Email: {auth.email}</h2>}
            {auth.uid && <h2>Last time login: {d}</h2>}
        </motion.div>
    )
}

const mapStateProfile = (state) => {
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth
    }
}

export default connect(mapStateProfile)(Profile)
