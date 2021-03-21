import React , {useState} from 'react'

export const CreateProject = () => {
    const [project, setProject] = useState({title:'', content:''})

    const handeChange = (e)=>{
        setProject({...project,[e.target.id]: e.target.value,})
    }

    const handeSubmit = (e)=>{
        e.preventDefault()
        console.log(project)
    }

    return (
        <div>
            <form onSubmit={handeSubmit}>
                <h3>Sing In</h3>
                <div>
                    <label htmlFor="title">Tile</label>
                    <br/>
                    <input type="text" id="title" onChange={handeChange} autoComplete="off"/>
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <br/>
                    <textarea type="text" id="content" onChange={handeChange} autoComplete="off"/>
                </div>
                <button>Create Project</button>
            </form>
        </div>
    )
}
