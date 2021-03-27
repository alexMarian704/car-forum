import React from 'react'

export default function ProjectSum({project}) {
    return (
        <div>
            <div id="card">
                    <h1>{project.title}</h1>
                    <p>{project.content}</p>
                    <p>posted by {project.authorFirstName} {project.authorLasttName}</p>
                    <p>{project.createdAt.toDate().toDateString()}</p>
                </div>
        </div>
    )
}
