import React from 'react'

export default function ProjectSum({project}) {
    return (
        <div>
            <div id="card">
                    <h1>{project.title}</h1>
                    <p>{project.content}</p>
                    <p>posted by marian</p>
                    <p>2021 2 3</p>
                </div>
        </div>
    )
}
