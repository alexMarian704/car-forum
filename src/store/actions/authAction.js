export const singIn = (credential) =>{
    return(dispatch , getState , {getFirebase}) =>{
        const firebase = getFirebase()

        firebase.auth().signInWithEmailAndPassword(
            credential.email,
            credential.password
        ).then(()=>{
            dispatch({ type : "LOGIN_SUCCES"});
        }).catch((err)=>{
            dispatch({type : "LOGIN_ERROR" , err});
        })
    }
}

export const singOut = ()=>{
    return(dispatch , getState , {getFirebase}) =>{
            const firebase = getFirebase()

            firebase.auth().signOut()
            .then(()=>{
                dispatch({type : "SINGOUT_SUCCES"})
            })
    }
}