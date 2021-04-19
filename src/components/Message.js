import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom'

const Message = ({ auth, profile }) => {
    const { id } = useParams()

    // const db = app.firestore()

    // function test() {

    //     let mesajnou = {
    //         myuid:auth.uid,
    //         to: id ,
    //         text:'salut ba merge 2',
    //         mine:true
    //     }

    //     db.collection('message').doc(auth.uid+id).get()
    //     .then((doc) => {
    //         if (doc.exists) {
    //             let array = [...doc.data().mes , mesajnou]
    //             db.collection('message').doc(auth.uid+id).update({
    //                 mes:array
    //             }).catch((err)=>{
    //                console.log(err)
    //             })
    //         }else{
    //             db.collection('message').doc(auth.uid+id).set({
    //                 mes:[mesajnou]
    //             }).catch((err)=>{
    //                console.log(err)
    //             })
    //         }
    //     }).catch((err) => {
    //         console.log(err)
    //     });
        
    // }

    return (
        <div>
            <div>
                <Link to={`/message/${id}`}>
                <button className="addFriend">
                    <FontAwesomeIcon icon={faEnvelope} />
                </button>
                </Link>
            </div>
        </div>
    )
}

export default Message;
