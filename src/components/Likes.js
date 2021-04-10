import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

export const Likes = () => {
    return (
        <div id="mainLikeContainer">
            <h2>Likes</h2>
            <div id="likeContainer">
                <div>
                    <button id="like"><FontAwesomeIcon icon={faThumbsUp} /></button>
                    <span>0</span>
                </div>
                <div>
                    <button id="dislike"><FontAwesomeIcon icon={faThumbsDown} /></button>
                    <span>0</span>
                </div>
            </div>
            <hr id="likeLine"/>
        </div>
    )
}
