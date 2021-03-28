import React from 'react'

export default function ProjectSum({project}) {
    return (
        <div>
            <div id="card">
                    <h1 id="cardText">{project.title}</h1>
                    <p id="cardText">{project.content}</p>
                    <p id="cardText">posted by {project.authorFirstName} {project.authorLasttName}</p>
                    <p>{project.createdAt.toDate().toDateString()}</p>
                </div>
        </div>
    )
}
