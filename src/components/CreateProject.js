import React , {useState} from 'react'
import {connect} from 'react-redux'
import {createProject} from '../store/actions/projectAction'
import { Redirect } from 'react-router-dom'

const CreateProject = ({createProject , auth}) => {
    const [project, setProject] = useState({title:'', content:''})

    const handeChange = (e)=>{
        setProject({...project,[e.target.id]: e.target.value,})
    }

    const handeSubmit = (e)=>{
        e.preventDefault()
        createProject(project)
        console.log(project)
    }

    if(!auth.uid)
        return(
            <Redirect to="singin"/>
        )

    return (
        <div>
            <form onSubmit={handeSubmit}>
                <h3>Sing In</h3>
                <div>
                    <label htmlFor="title">Tile</label>
                    <br/>
                    <input type="text" id="title" onChange={handeChange} autoComplete="off"/>
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <br/>
                    <textarea type="text" id="content" onChange={handeChange} autoComplete="off"/>
                </div>
                <button>Create Project</button>
            </form>
        </div>
    )
}

const mapStateProject = (state) => {
    return {
        auth : state.firebase.auth
    }
}

const mapDispatchProps = (dispatch) =>{
    return{
        createProject : (project) => {
            return dispatch(createProject(project))
        }
    }
}

export default connect(mapStateProject , mapDispatchProps)(CreateProject)
