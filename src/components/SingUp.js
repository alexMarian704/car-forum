import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {singUp} from '../store/actions/authAction'

const SingUp = ({auth ,singUp , authError}) => {
    const [log, setLog] = useState({email:'',password:'', firstName:'' , lastName:''})

    const handeChange = (e)=>{
        setLog({...log,[e.target.id]: e.target.value,})
    }

    const handeSubmit = (e)=>{
        e.preventDefault()
        console.log(log)
        singUp(log)
    }

    if(auth.uid)
        return(
            <Redirect  to="/"/>
        )

    return (
        <div>
            <form onSubmit={handeSubmit}>
                <h3>Sing In</h3>
                <div>
                    <label htmlFor="email">Email</label>
                    <br/>
                    <input type="email" id="email" onChange={handeChange} autoComplete="off"/>
                </div>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <br/>
                    <input type="text" id="firstName" onChange={handeChange} autoComplete="off"/>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <br/>
                    <input type="text" id="lastName" onChange={handeChange} autoComplete="off"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <br/>
                    <input type="password" id="password" onChange={handeChange} autoComplete="off"/>
                </div>
                <button>Sing Up</button>
            </form>
            {authError && <h2>{authError}</h2>}
        </div>
    )
}

const mapStateToprops = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        singUp : (newUser) => dispatch(singUp(newUser))    
    }
}   

export default connect(mapStateToprops ,mapDispatchToProps)(SingUp);