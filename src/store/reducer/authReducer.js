const initState = {
    authError : null
}

const authReducer = (state= initState , action) =>{
    switch(action.type){
        case "LOGIN_ERROR" :
            return {
                ...state , authError:"Login failed"
            }
        case "LOGIN_SUCCES":
            console.log('succes login')
            return{
                ...state ,
                authError : null
            }
        case "SINGOUT_SUCCES" :
            console.log('sing out')
            return{
               state
            }
        default: 
            return state
    }
} 

export default authReducer;