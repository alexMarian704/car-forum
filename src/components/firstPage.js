import React from 'react'
import Notification from './Notification'
import ProjectList from './ProjectList'

export default function FirstPage() {
    return (
        <div>
            <div id="container">
                <ProjectList />
            </div>
            <Notification />
        </div>
    )
}
