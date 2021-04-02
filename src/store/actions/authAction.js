export const singIn = (credential) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        firebase.auth().signInWithEmailAndPassword(
            credential.email,
            credential.password
        ).then(() => {
            dispatch({ type: "LOGIN_SUCCES" });
        }).catch((err) => {
            dispatch({ type: "LOGIN_ERROR", err });
        })
    }
}

export const singOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        firebase.auth().signOut()
            .then(() => {
                dispatch({ type: "SINGOUT_SUCCES" })
            })
    }
}

export const singUp = (newUser) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        await firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        )
            .then((res) => {
                return firestore.collection('users').doc(res.user.uid).set({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    initials: newUser.firstName[0] + newUser.lastName[0],
                    afterUpdate:true
                })
            }).then(() => {
                let user = firebase.auth().currentUser;
                user.sendEmailVerification()
                dispatch({ type: "SINGUP_SUCCESS" })
            })
            .catch((err) => {
                dispatch({ type: "SINGUP_ERROR", err })
            })
    }
}