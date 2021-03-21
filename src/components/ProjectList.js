import React from 'react'
import { Link } from 'react-router-dom'
import ProjectSum from './ProjectSum'

export default function ProjectList() {
    return (
        <div>
            <div>
                <Link to={`project/name`}><ProjectSum /></Link>
                <Link><ProjectSum /></Link>     
            </div>
        </div>
    )
}
