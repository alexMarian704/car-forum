import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { singOut } from '../store/actions/authAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch , faUserFriends , faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

function SingInNav({ singOut, profile }) {
    const initial = profile.initials

    return (
        <ul>
            <NavLink to="/newproject"><li>New Post</li></NavLink>
            <li><a onClick={singOut} ><FontAwesomeIcon icon={faSignOutAlt}/></a></li>
            {profile.initials && <NavLink to="/your/profile"><li style={{
                color: "white"
            }}>{initial.toUpperCase()}</li></NavLink>}
            <NavLink to="/search"><li>
                <FontAwesomeIcon icon={faSearch} />
            </li></NavLink>
            <NavLink to="/your/follow">
                <li>
                    <FontAwesomeIcon icon={faUserFriends}/>
                </li>
            </NavLink>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        singOut: () => dispatch(singOut())
    }
}

export default connect(null, mapDispatchToProps)(SingInNav)
