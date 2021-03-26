export const createProject = (project)=>{
    return (dispatch , getState , {getFirebase , getFirestore})=>{
        const firestore = getFirestore()
        firestore.collection('projects').add({
            ...project,
            authorFirstName :'dinamo',
            authorLasttName: 'pierder',
            authorId:12345,
            createdAt : Date.now()
        }).then(()=>{
            dispatch({ type: 'CREATE_PROJECT', project}) 
        }).catch((err)=>{
            console.log(err)
            dispatch({type:'CREATE_PROJECT_ERROR' , err})
        })
    }
}