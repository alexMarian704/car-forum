import React, { useState } from 'react'
import { connect } from 'react-redux'
import { singIn } from '../store/actions/authAction'
import { Redirect } from 'react-router-dom'

const SingIn = ({ singIn, authError, auth }) => {
    const [log, setLog] = useState({ email: '', password: '' })

    const handeChange = (e) => {
        setLog({ ...log, [e.target.id]: e.target.value, })
    }

    const handeSubmit = (e) => {
        e.preventDefault()
        console.log(log)
        singIn(log)
    }

    if (auth.uid)
        return (
            <Redirect to="/" />
        )

    return (
        <div>
            <form onSubmit={handeSubmit}>
                <h3>Sing In</h3>
                <div>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input type="email" id="email" onChange={handeChange} autoComplete="off" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <br />
                    <input type="password" id="password" onChange={handeChange} autoComplete="off" />
                </div>
                <button>Sing In</button>
                {authError && <h2>{authError}</h2>}
            </form>
        </div>
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

