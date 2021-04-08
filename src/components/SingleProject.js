import React, { useState } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect, useParams, useHistory } from 'react-router';
import { compose } from 'redux'
import { motion } from 'framer-motion'
import { createComment } from '../store/actions/commentAction';
import { app } from '../config/base'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase/app';
import 'firebase/auth';


function SingleProject({ project, auth, createComment, comment, profile }) {
    const [commentA, setComment] = useState({ parentPost: '', commentText: '' });
    const [inputValue, setInputValue] = useState(undefined)
    const [displayEdit, setDisplayEdit] = useState('none')
    const [editCom, setEditCom] = useState('');
    const { id } = useParams();
    const db = app.firestore()
    const history = useHistory();
    const [isDeleted, setisDeleted] = useState(false)
    firebase.auth().currentUser?.reload()

    if (!auth.uid || (firebase.auth().currentUser?.emailVerified === false && profile.afterUpdate))
        return (
            <Redirect to="/signin" />
        )
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const changeComment = (e) => {
        setComment({ ...commentA, parentPost: id, commentText: e.target.value })
    }
    const postComment = () => {
        createComment(commentA)
        setInputValue('')
    }
    const deletePost = async (e) => {
        setisDeleted(true);
        await db.collection('projects').doc(id).delete()
        history.push('/');
    }
    const getDataClick = async (e) => {
        let deleteId = (e.target.parentElement.getAttribute('data-id'))
        await db.collection('comments').doc(String(deleteId)).delete()
    }

    const editComment = (e, text) => {
        e.preventDefault()
        setDisplayEdit('block');
        setEditCom(`${text}`)
    }

    const saveComment = (e, id) => {
        e.preventDefault()
        db.collection('comments').doc(`${id}`).update({
            commentText: editCom
        })
        setDisplayEdit('none')
    }

    const cancelEdit = (e) => {
        e.preventDefault()
        setDisplayEdit('none');
    }

    if (project && isDeleted === false) {
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
                        {singleProject.file && <img src={singleProject.file} alt={singleProject.title} />}
                        <br />
                        {(auth.uid === singleProject.authorId ||
                            auth.uid === `fF1LRlXcvrSHgycDhH5XQFzetFo1`) && <button id="createBut" onClick={deletePost}>Delete</button>}
                    </div>
                    <div>
                        <h2>Comments:</h2>
                        {comment && comment.map((comm, index) => {
                            if (comm.parentPost === id) {
                                return (
                                    <div key={index} id="commentContainer"
                                        data-id={comm.id}
                                    >
                                        <h2 id="comTitle">{comm.authorFirstName} {comm.authorLasttName}</h2>
                                        <p id="comText" style={{
                                            display: (displayEdit === 'none') ? "block" : "none"
                                        }}>{comm.commentText}</p>
                                        <form style={{
                                            display: displayEdit
                                        }} data-id={comm.id}>
                                            <input type="text" value={editCom}
                                                onChange={(e) => { setEditCom(e.target.value) }}
                                            />
                                            <br />
                                            <button id="comDelete" onClick={(e) => saveComment(e, comm.id)}><FontAwesomeIcon icon={faCheck} data-id={comm.id} /></button>
                                            <button id="comDelete" style={{
                                                marginLeft: '10px'
                                            }}
                                                onClick={cancelEdit}><FontAwesomeIcon icon={faTimesCircle} /></button>
                                        </form>
                                        <p>{comm.createdAt.toDate().toDateString()}</p>
                                        {(auth.uid === comm.authorId ||
                                            auth.uid === `fF1LRlXcvrSHgycDhH5XQFzetFo1`) && <button id="comDelete" onClick={getDataClick} data-id={comm.id}><FontAwesomeIcon icon={faTrash} /></button>}
                                        {auth.uid === comm.authorId && <button id="editCom" data-text={comm.commentText}
                                            onClick={(e) => editComment(e, comm.commentText)}><FontAwesomeIcon icon={faPen} /></button>}
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <br />
                    <hr />
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label >Add comment</label>
                            <input type="text" id="comment" onChange={changeComment} autoComplete="off" value={inputValue} required />
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
        comment: state.firestore.ordered.comments,
        profile: state.firebase.profile
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
    connect(mapStateToProps, mapDispatchProps),
    firestoreConnect(props => [
        { collection: 'projects', doc: props.match.params.id },
        { collection: 'comments', orderBy: ['createdAt', 'desc'] }

    ])
)(SingleProject)

