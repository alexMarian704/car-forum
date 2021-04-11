import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, fas } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router';
import { app } from '../config/base'

export const Likes = ({ project, auth }) => {
    const [rating, setRating] = useState(false)
    const { id } = useParams()
    const db = app.firestore()

    const like = (e) => {
        e.preventDefault()
        if ((project.fromLike === undefined && (project.fromDislike === undefined || project.fromDislike.includes(auth.email) === false)) || (project.fromLike.includes(auth.email) === false && project.fromDislike.includes(auth.email) === false)) {
            if (project.likes) {
                db.collection('projects').doc(id).update({
                    likes: project.likes + 1,
                    fromLike: [...project.fromLike, auth.email]
                }).then(() => {
                    setRating(!rating)
                }).catch((err) => {
                    console.log(err)
                })
            }
            else {
                db.collection('projects').doc(id).update({
                    likes: 1,
                    fromLike: [auth.email]
                }).then(() => {
                    setRating(!rating)
                }).catch((err) => {
                    console.log(err)
                })
            }
        } else if (project.fromDislike.includes(auth.email) === true && project.fromLike.includes(auth.email) === false) {
            let arr = [...project.fromDislike];
            arr = arr.filter((item) => {
                return item !== auth.email;
            })
            db.collection('projects').doc(id).update({
                likes: project.likes + 1,
                dislikes: project.dislikes - 1,
                fromDislike: arr,
                fromLike: [...project.fromLike, auth.email]
            }).then(() => {
                setRating(!rating)
            }).catch((err) => {
                console.log(err)
            })

        } else if (project.fromLike.includes(auth.email) === true) {
            let arr = [...project.fromLike];
            arr = arr.filter((item) => {
                return item !== auth.email;
            })
            db.collection('projects').doc(id).update({
                likes: project.likes - 1,
                fromLike: arr
            }).then(() => {
                setRating(!rating)
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const dislike = (e) => {
        e.preventDefault()
        if ((project.fromDislike === undefined && (project.fromLike === undefined || project.fromLike.includes(auth.email) === false)) || (project.fromDislike.includes(auth.email) === false && project.fromLike.includes(auth.email) === false)) {
            if (project.dislikes) {
                db.collection('projects').doc(id).update({
                    dislikes: project.dislikes + 1,
                    fromDislike: [...project.fromDislike, auth.email]
                }).then(() => {
                    setRating(!rating)
                }).catch((err) => {
                    console.log(err)
                })
            }
            else {
                db.collection('projects').doc(id).update({
                    dislikes: 1,
                    fromDislike: [auth.email]
                }).then(() => {
                    setRating(!rating)
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
        else if (project.fromLike.includes(auth.email) === true && project.fromDislike.includes(auth.email) === false) {
            let arr = [...project.fromLike];
            arr = arr.filter((item) => {
                return item !== auth.email;
            })
            db.collection('projects').doc(id).update({
                likes: project.likes - 1,
                dislikes: project.dislikes + 1,
                fromLike: arr,
                fromDislike: [...project.fromDislike, auth.email]
            }).then(() => {
                setRating(!rating)
            }).catch((err) => {
                console.log(err)
            })

        } else if (project.fromDislike.includes(auth.email) === true) {
            let arr = [...project.fromDislike];
            arr = arr.filter((item) => {
                return item !== auth.email;
            })
            db.collection('projects').doc(id).update({
                dislikes: project.dislikes - 1,
                fromDislike: arr
            }).then(() => {
                setRating(!rating)
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    return (
        <div id="mainLikeContainer">
            <h2>Likes</h2>
            <div id="likeContainer">
                <div>
                    {project.fromLike && project.fromLike.includes(auth.email) && <button id="like" onClick={like}
                        style={{
                            color: 'aqua'
                        }}><FontAwesomeIcon icon={faThumbsUp} /></button>}

                    {project.fromLike && project.fromLike.includes(auth.email) === false && <button id="like" onClick={like}><FontAwesomeIcon icon={faThumbsUp} /></button>}

                    {project.fromLike === undefined && <button id="like" onClick={like}><FontAwesomeIcon icon={faThumbsUp} /></button>}


                    {project.likes && <span>{project.likes}</span>}

                    {project.likes === undefined && <span>0</span>}
                </div>
                <div>
                    {project.fromDislike && project.fromDislike.includes(auth.email) && <button id="dislike" onClick={dislike}
                        style={{
                            color: "aqua"
                        }}><FontAwesomeIcon icon={faThumbsDown} /></button>}

                    {project.fromDislike && project.fromDislike.includes(auth.email) === false && <button id="dislike" onClick={dislike}><FontAwesomeIcon icon={faThumbsDown} /></button>}

                    {project.fromDislike === undefined && <button id="dislike" onClick={dislike}><FontAwesomeIcon icon={faThumbsDown} /></button>}


                    {project.dislikes && project.dislikes !== 0 && <span>{project.dislikes}</span>}

                    {project.dislikes === undefined && <span>0</span>}
                </div>
            </div>
            <hr id="likeLine" />
        </div>
    )
}
