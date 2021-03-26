import React from 'react'
import { Link } from 'react-router-dom'
import ProjectSum from './ProjectSum'

export default function ProjectList({ projects }) {
    return (
        <div>
            <div>
                {projects && projects.map((project , index)=>(
                    <Link to={`project/${project.id}`} key={index}><ProjectSum project={project}/></Link>
                ))}
            </div>
        </div>
    )
}
