import React, { useState } from 'react'
import { connect } from 'react-redux'
import { singIn } from '../store/actions/authAction'
import { Redirect } from 'react-router-dom'
import {motion} from 'framer-motion'

const SingIn = ({ singIn, authError, auth }) => {
    const [log, setLog] = useState({ email: '', password: '' })

    const handeChange = (e) => {
        setLog({ ...log, [e.target.id]: e.target.value, })
    }

    const handeSubmit = (e) => {
        e.preventDefault()
        singIn(log)
    }

    if (auth.uid)
        return (
            <Redirect to="/" />
        )

    return (
        <motion.div
        animate={{opacity:1}} 
        initial={{opacity:0}}
        exit={{opacity:1}}
        transition={{duration:1.4}}
        >
            <form onSubmit={handeSubmit}>
                <h3 id="singTitle">Sign In</h3>
                <div>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input type="email" id="email" onChange={handeChange} autoComplete="off" required/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <br />
                    <input type="password" id="password" onChange={handeChange} autoComplete="off" required/>
                </div>
                <button id="singIn">Sign In</button>
                {authError && <h2>{authError}</h2>}
            </form>
        </motion.div>
    )
}

const mapStateToprops = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        singIn: (creds) => dispatch(singIn(creds))
    }
}

export default connect(mapStateToprops, mapDispatchToProps)(SingIn);

