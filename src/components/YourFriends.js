import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { app } from '../config/base'
import { motion } from 'framer-motion'

const YourFriends = ({ profile }) => {
    const history = useHistory()
    const [error, setError] = useState(null)
    const [person, setPerson] = useState(undefined)
    const [personUid , setPersonUid] = useState(undefined)
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
                    // setPerson([...array])
                    // setPersonUid([...uidArray])
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
            <div>
                <h1>Friends</h1>
                <div className="friendsContainer">
                    {error && <h2>{error}</h2>}
                    {error===null &&person && personUid && person.map((user, i) => {
                        return (
                            <Link key={i} to={`/profile/${personUid[i]}`} id="friendLink">
                                <div id="friendBox">
                                    <h2>{user.firstName} {user.lastName}</h2>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
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
