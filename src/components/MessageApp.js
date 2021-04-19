import React from 'react'
import { useParams } from 'react-router';
import { app } from '../config/base'
import { connect } from 'react-redux'

const MessageApp = ({auth , profile}) => {
    const { id } = useParams()
    const db = app.firestore()

    const sendMessage = ()=> {

        let mesajnou = {
            myuid:auth.uid,
            to: id ,
            text:'salut ba merge 2',
            mine:true
        }

        db.collection('message').doc(auth.uid+id).get()
        .then((doc) => {
            if (doc.exists) {
                let array = [...doc.data().mes , mesajnou]
                db.collection('message').doc(auth.uid+id).update({
                    mes:array
                }).catch((err)=>{
                   console.log(err)
                })
            }else{
                db.collection('message').doc(auth.uid+id).set({
                    mes:[mesajnou]
                }).catch((err)=>{
                   console.log(err)
                })
            }
        }).catch((err) => {
            console.log(err)
        });
        
    }

    return (
        <div>
            <h1>Sal</h1>
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

const mapStateProfile = (state) => {
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth,
    }
}

export default connect(mapStateProfile)(MessageApp);
