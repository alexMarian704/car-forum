import React, { useEffect, useRef, useState } from 'react'
import {motion} from 'framer-motion'
import { app } from '../config/base'
import {Link} from 'react-router-dom'

export default function Search() {
    const db = app.firestore()
    const [searchInput , setSearchInput] = useState('')
    const [users , setUsers] = useState([])
    let arrayUsers = []

    useEffect(()=>{
        db.collection('users').get()
        .then((query) => {
            query.forEach((doc)=>{
                let array = [doc.data().firstName.toUpperCase() , doc.data().lastName.toUpperCase()]
                if (array.includes(searchInput.toUpperCase()) === true) {
                    arrayUsers = [...arrayUsers, {name:doc.data().firstName , last:doc.data().lastName, id:doc.id}]
                }
            })
        }).then(()=>{
            setUsers([...arrayUsers])
        })
        .catch((err) => {
            console.log(err)
        });
    },[searchInput])

    return (
        <motion.div
            animate={{opacity:1}}
            initial={{opacity:0}}
            exit={{opacity:1}}
            transition={{duration:1.3}}
        >
            <h2>Search users</h2>
            <form >
                <input type="text" value={searchInput}
                onChange={(e)=>{setSearchInput(e.target.value)}}
                />
            </form>
            <div>
                {users.length > 0 && users.map((user, i)=>{    
                    return(
                        <Link key={i} to={`/profile/${user.id}`} id="friendLink">
                        <motion.div id="friendBox"
                        animate={{opacity:1}}
                        initial={{opacity:0}}
                        exit={{opacity:1}}
                        transition={{duration:0.15}}
                        >
                            <h2>{user.name} {user.last}</h2>
                        </motion.div>
                    </Link>
                    )
                })}
            </div>
        </motion.div>
    )
}
