import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../store/actions/projectAction'
import { useHistory, Redirect } from 'react-router-dom'
import { app } from '../config/base'
import {motion} from 'framer-motion'

const CreateProject = ({ createProject, auth }) => {
    const [project, setProject] = useState({ title: '', content: '', file: '' })
    const history = useHistory()
    const inputFile = useRef(null)
    const [loading , setLoading] = useState(null)

    const handeChange = async (e) => {
        setProject({ ...project, [e.target.id]: e.target.value, })
    }

    const type = ['image/jpeg', 'image/png', 'image/jpg']

    const fileChange = async (e) => {
        const file = e.target.files[0]
        if (type.includes(file.type)) {
            const storageRef = app.storage().ref(file.name)
            storageRef.put(file).on('state_changed', (snap) => {
            }, (err) => {
                console.log(err)
            }, async () => {
                const urlA = await storageRef.getDownloadURL();
                setProject({ ...project, file: urlA })
                setLoading(true)
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
            <Redirect to="/signin" />
        )

    const onButtonClick = (e) => {
        e.preventDefault()
        inputFile.current.click();
    };

    return (
        <motion.div
        animate={{opacity:1}} 
        initial={{opacity:0}}
        exit={{opacity:1}}
        transition={{duration:1.4}}
        >
            <form onSubmit={handeSubmit} id="projectForm">
                <h3 id="createTitle">New project</h3>
                <div>
                    <label htmlFor="title">Tile</label>
                    <input type="text" id="title" onChange={handeChange} autoComplete="off" required/>
                </div>
                <div>
                    <label htmlFor="file">File</label>
                    <br />
                    <input type="file" id="fileUrl" onChange={fileChange} ref={inputFile} />
                    <button onClick={onButtonClick} id="fileBut">Select file</button>
                    {loading && <h1 id="loaded">Loaded</h1>}
                </div>
                <br/>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea type="text" id="content" onChange={handeChange} autoComplete="off" required/>
                </div>
                <button id="createBut">Create</button>
            </form>
        </motion.div>
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
