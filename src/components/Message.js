import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom'

const Message = ({ auth, profile }) => {
    const { id } = useParams()

    return (
        <div>
            <div>
                <Link to={`/message/${id}`}>
                <button className="addFriend">
                    <FontAwesomeIcon icon={faEnvelope} />
                </button>
                </Link>
            </div>
        </div>
    )
}

export default Message;
