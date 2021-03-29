import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {singUp} from '../store/actions/authAction'
import {motion} from 'framer-motion'

const SingUp = ({auth ,singUp , authError}) => {
    const [log, setLog] = useState({email:'',password:'', firstName:'' , lastName:''})

    const handeChange = (e)=>{
        setLog({...log,[e.target.id]: e.target.value,})
    }

    const handeSubmit = (e)=>{
        e.preventDefault()
        singUp(log)
    }

    if(auth.uid)
        return(
            <Redirect  to="/"/>
        )

    return (
        <motion.div
        animate={{opacity:1}} 
        initial={{opacity:0}}
        exit={{opacity:1}}
        transition={{duration:1.4}}
        >
            <form onSubmit={handeSubmit}>
                <h3 id="singUpTitle">Sign Up</h3>
                <div>
                    <label htmlFor="email">Email</label>
                    <br/>
                    <input type="email" id="email" onChange={handeChange} autoComplete="off" required/>
                </div>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <br/>
                    <input type="text" id="firstName" onChange={handeChange} autoComplete="off" required/>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <br/>
                    <input type="text" id="lastName" onChange={handeChange} autoComplete="off" required/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <br/>
                    <input type="password" id="password" onChange={handeChange} autoComplete="off" required/>
                </div>
                <button id="singUpBut">Sign Up</button>
            </form>
            {authError && <h2>{authError}</h2>}
        </motion.div>
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