import React, { useState } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect, useParams } from 'react-router';
import { compose } from 'redux'
import { motion } from 'framer-motion'
import { createComment } from '../store/actions/commentAction';

function SingleProject({ project, auth , createComment , comment}) {
    const [commentA, setComment] = useState({parentPost:'', commentText:''});
    const [inputValue , setInputValue] = useState(null)
    const { id } = useParams();

    if (!auth.uid)
        return (
            <Redirect to="/signin" />
        )
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const changeComment = (e) => {
        setComment({...commentA , parentPost: id, commentText:e.target.value})
    }
    const postComment = () => {
        createComment(commentA)
        setInputValue('')
    }

    if (project) {
        const singleProject = project[0];
        return (
            <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 1.4 }}
            >
                <div>
                    <div>
                        <h1>{singleProject.title}</h1>
                        <p>{singleProject.content}</p>
                        <h2>Posted by {singleProject.authorFirstName} {singleProject.authorLastName}</h2>
                        <h3>{singleProject.createdAt.toDate().toDateString()}</h3>
                        {singleProject.file && <img src={singleProject.file} alt={singleProject.title}/>}
                    </div>
                    <div>
                        <h2>Comments:</h2>
                        {comment &&comment.map((comm , index)=>{
                            if(comm.parentPost === id){
                                return(
                                    <div key={index} id="commentContainer">
                                        <h2>{comm.authorFirstName} {comm.authorLasttName}</h2>
                                        <p>{comm.commentText}</p>
                                        <p>{comm.createdAt.toDate().toDateString()}</p>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <br />
                    <hr/>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label >Add comment</label>
                            <input type="text" id="comment" onChange={changeComment} autoComplete="off" value={inputValue} required/>
                            <br />
                            <button onClick={postComment} id="createBut">Post</button>
                        </form>
                    </div>
                </div>
            </motion.div>
        )
    } else {
        return (
            <h1 id="isLoading">Loading</h1>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        comment: state.firestore.ordered.comments
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        createComment: (comment) => {
            return dispatch(createComment(comment))
        }
    }
}

export default compose(
    connect(mapStateToProps , mapDispatchProps),
    firestoreConnect(props => [
        { collection: 'projects', doc: props.match.params.id },
        { collection: 'comments' , orderBy: ['createdAt' , 'desc']}
        
    ])
)(SingleProject)

