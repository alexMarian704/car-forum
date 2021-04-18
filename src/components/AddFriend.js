import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus , faUserTimes } from '@fortawesome/free-solid-svg-icons'
import { app } from '../config/base'

export const AddFriend = ({ user, auth, profile , id }) => {
    const myId = auth.uid;
    const [isFriend , setIsFriend] = useState(false)
    const db = app.firestore()
    if (profile.isLoaded && profile.friends!=undefined && profile.friends.includes(id) === true && isFriend === false) {
        setIsFriend(true)
    }

    const addUser = (e) => {
        e.preventDefault()
        if (profile.friends === undefined) {
            db.collection('users').doc(myId).update({
                friends: [id]
            }).then((result) => {
                setIsFriend(true)
            }).catch((err) => {
                console.log(err)
            });
        }else if(profile.friends.includes(id) === false){
            db.collection('users').doc(myId).update({
                friends: [...profile.friends, id]
            }).then((result) => {
                setIsFriend(true)
            }).catch((err) => {
                console.log(err)
            }); 
        }
    }

    const removeFriend = (e)=>{
        e.preventDefault()
        const remove = []
        profile.friends.map((idFriend)=>{
            if(idFriend != id){
                remove.push(idFriend)
            }
        })

        db.collection('users').doc(myId).update({
            friends: remove
        }).then((result) => {
            setIsFriend(false)
        }).catch((err) => {
            console.log(err)
        }); 
    }

    return (
        <div>
            <div>
                {isFriend ===false &&  <button onClick={addUser} className="addFriend">
                    <FontAwesomeIcon icon={faUserPlus} />
                </button>}

                {isFriend === true && <button onClick={removeFriend} className="removeFriend">
                    <FontAwesomeIcon icon={faUserTimes} />
                </button>}
            </div>
        </div>
    )
}
