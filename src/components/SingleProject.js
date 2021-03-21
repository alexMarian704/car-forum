import React from 'react'
import { useParams } from 'react-router'

export default function SingleProject() {

    const {id} = useParams();

    return (
        <div>
            <div>
                <div>
                    <h1>Project title - {id}</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aut quo unde voluptas, fuga dolore veniam debitis voluptatem, labore id tempore explicabo. Magnam obcaecati nesciunt ipsa vel nihil suscipit eveniet?</p>
                    <h2>Posted by</h2>
                    <h3>at 202123 321</h3>
                </div>
            </div>
        </div>
    )
}

