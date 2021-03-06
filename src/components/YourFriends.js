import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { app } from '../config/base'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const YourFriends = ({ profile }) => {
    const history = useHistory()
    const [error, setError] = useState(null)
    const [person, setPerson] = useState(undefined)
    const [personUid, setPersonUid] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const db = app.firestore()
    const array = []
    const uidArray = []

    async function wait() {
        await db.collection('users').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (profile.friends && profile.friends.includes(doc.id)) {
                        array.push(doc.data())
                        uidArray.push(doc.id);
                    }
                })
            }).then(() => {
                if (loading === false && person === undefined) {
                    setPerson([...array])
                    setPersonUid([...uidArray])
                }
                setLoading(false)
            })
            .catch((err) => {
                setError(err)
            })
    }
    wait()

    if (loading === false) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 1.4 }}
            >
                <h1>Friends</h1>
                <div className="friendsContainer">
                    {error && <h2>{error}</h2>}
                    {error === null && person && personUid && person.map((user, i) => {
                        return (
                            <Link key={i} to={`/profile/${personUid[i]}`} id="friendLink">
                                <div id="friendBox" style={{
                                    position:'relative'
                                }}>
                                    <h2>{user.firstName} {user.lastName}</h2>
                                    <Link to={`/message/${personUid[i]}`}>
                                        <button className="message-link">
                                            <FontAwesomeIcon icon={faEnvelope}/>
                                        </button>
                                    </Link>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </motion.div>
        )
    } else {
        return (
            <h1>Loading...</h1>
        )
    }
}

const mapStateProfile = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

export default connect(mapStateProfile)(YourFriends)
