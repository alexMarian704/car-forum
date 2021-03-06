export const createProject = (project)=>{
    return (dispatch , getState , {getFirebase , getFirestore})=>{
        const firestore = getFirestore()
        const profile = getState().firebase.profile
        const id = getState().firebase.auth.uid
        firestore.collection('projects').add({
            ...project,
            authorFirstName :profile.firstName,
            authorLasttName: profile.lastName,
            authorId:id,
            likes:0,
            dislikes:0,
            fromLike:[],
            fromDislike:[],
            createdAt : new Date()
        }).then(()=>{
            dispatch({ type: 'CREATE_PROJECT', project}) 
        }).catch((err)=>{
            console.log(err)
            dispatch({type:'CREATE_PROJECT_ERROR' , err})
        })
    }
}