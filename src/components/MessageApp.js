import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router';
import { app } from '../config/base'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

const MessageApp = ({ auth, profile }) => {
    const [text, setText] = useState('');
    const [message, setMessage] = useState(undefined)
    const [person, setPerson] = useState(undefined)
    const [loading , setLoading] = useState(true);
    const [mesNumber, setMesNumber] = useState(0)
    const [newMes, setNewMes] = useState(false)
    const messagesEndRef = useRef(null)
    const { id } = useParams()
    const db = app.firestore()

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView(false)
    }

    useEffect(() => {
        scrollToBottom()
    }, [loading]);

    const sendMessage = () => {

        let mesajnou = {
            myuid: auth.uid,
            to: id,
            text,
            mine: true
        }
        if (text != '')
            db.collection('message').doc(auth.uid + id).get()
                .then((doc) => {
                    if (doc.exists) {
                        let array = [...doc.data().mes, mesajnou]
                        db.collection('message').doc(auth.uid + id).update({
                            mes: array
                        }).catch((err) => {
                            console.log(err)
                        })
                        setMesNumber(mesNumber + 1)
                    } else if (doc.exists === false) {
                        db.collection('message').doc(id + auth.uid).get()
                            .then((doc) => {
                                if (doc.exists) {
                                    let array = [...doc.data().mes, mesajnou]
                                    db.collection('message').doc(id + auth.uid).update({
                                        mes: array
                                    }).catch((err) => {
                                        console.log(err)
                                    })
                                    setMesNumber(mesNumber + 1)
                                } else {
                                    db.collection('message').doc(auth.uid + id).set({
                                        mes: [mesajnou]
                                    }).then(() => {
                                        setNewMes(true)
                                    })
                                        .catch((err) => {
                                            console.log(err)
                                        })
                                }
                            }).catch((err) => {
                                console.log(err)
                            });
                    }
                }).catch((err) => {
                    console.log(err)
                });
        setText('')
    }

    const enterHandle = (e) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }

    useEffect(() => {
        db.collection('message').doc(auth.uid + id).get()
            .then((doc) => {
                if (doc.exists === false) {
                    db.collection('message').doc(id + auth.uid).get()
                        .then((doc) => {
                            setMessage(doc.data().mes)  
                            setLoading(false)   
                        }).catch((err) => {
                            console.log(err)
                        });
                } else {
                    setMessage(doc.data().mes)
                    setLoading(false)    
                }
            }).catch((err) => {
                console.log(err)
            });
    }, [message, newMes, text])

    if (person === undefined) {
        db.collection('users').doc(id).get()
            .then((doc) => {
                setPerson(doc.data())
            }).catch((err) => {
                console.log(err)
            });
    }

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 1.3 }}
            >
                {person != undefined && <h1>{person.firstName} {person.lastName}</h1>}
                <div className="messagesContainer">
                    {message != undefined && message.map((mes, i) => (
                        <div className={mes.myuid === auth.uid ? 'single-my' : 'single-his'} key={i}

                        >
                            <p id={mes.myuid === auth.uid ? 'mymes' : 'hismes'} ref={messagesEndRef}>{mes.text}</p>
                        </div>
                    ))}
                </div>
                <div className="sendContainer">
                    <form onSubmit={(e) => { e.preventDefault() }}>
                        <input type="text" onChange={(e) => {
                            e.preventDefault()
                            setText(e.target.value)
                        }}
                            value={text}
                            onKeyPress={enterHandle}
                        />
                    </form>
                    <button onClick={sendMessage} className="sendBut">
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </div>
            </motion.div>
        )
}

const mapStateProfile = (state) => {
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth,
    }
}

export default connect(mapStateProfile)(MessageApp);
