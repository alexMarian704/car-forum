import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../store/actions/projectAction'
import { useHistory, Redirect } from 'react-router-dom'
import { app } from '../config/base'

const CreateProject = ({ createProject, auth }) => {
    const [project, setProject] = useState({ title: '', content: '', file: '' })
    const history = useHistory()

    const handeChange = async (e) => {
        setProject({ ...project, [e.target.id]: e.target.value, })
    }

    const type = ['image/jpeg', 'image/png', 'image/jpg']

    const fileChange = async (e) => {
        const file = e.target.files[0]
        console.log(file)
        if (type.includes(file.type)) {
            const storageRef = app.storage().ref(file.name)
            storageRef.put(file).on('state_changed', (snap) => {
            }, (err) => {
                console.log(err)
            }, async () => {
                const urlA = await storageRef.getDownloadURL();
                setProject({ ...project, file: urlA })
            })
        }
    }

    const handeSubmit = (e) => {
        e.preventDefault()
        createProject(project)
        history.push('/')
    }

    if (!auth.uid)
        return (
            <Redirect to="/singin" />
        )

    return (
        <div>
            <form onSubmit={handeSubmit}>
                <h3>Sing In</h3>
                <div>
                    <label htmlFor="title">Tile</label>
                    <br />
                    <input type="text" id="title" onChange={handeChange} autoComplete="off" />
                </div>
                <div>
                    <label htmlFor="file">File</label>
                    <br />
                    <input type="file" id="fileUrl" onChange={fileChange} />
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <br />
                    <textarea type="text" id="content" onChange={handeChange} autoComplete="off" />
                </div>
                <button>Create Project</button>
            </form>
        </div>
    )
}

const mapStateProject = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        createProject: (project) => {
            return dispatch(createProject(project))
        }
    }
}

export default connect(mapStateProject, mapDispatchProps)(CreateProject)
