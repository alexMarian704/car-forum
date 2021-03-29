export const createComment = (comment)=>{
    return (dispatch , getState , {getFirebase , getFirestore})=>{
        const firestore = getFirestore()
        const profile = getState().firebase.profile
        const id = getState().firebase.auth.uid
        firestore.collection('comments').add({
            ...comment,
            authorFirstName :profile.firstName,
            authorLasttName: profile.lastName,
            authorId:id,
            createdAt : new Date()
        }).then(()=>{
            dispatch({ type: 'CREATE_COMMENT', comment}) 
        }).catch((err)=>{
            console.log(err)
            dispatch({type:'CREATE_COMMENT_ERROR' , err})
        })
    }
}