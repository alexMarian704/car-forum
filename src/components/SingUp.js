import React, { useState } from 'react'

const SingUp = props => {
    const [log, setLog] = useState({email:'',password:'', firstName:'' , lastName:''})

    const handeChange = (e)=>{
        setLog({...log,[e.target.id]: e.target.value,})
    }

    const handeSubmit = (e)=>{
        e.preventDefault()
        console.log(log)
    }

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
                    <label htmlFor="firstName">Password</label>
                    <br/>
                    <input type="text" id="firstName" onChange={handeChange} autoComplete="off"/>
                </div>
                <div>
                    <label htmlFor="lastName">Password</label>
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
        </div>
    )
}

export default SingUp;