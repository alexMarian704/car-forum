const initState={}

const commentReducer = (state = initState, action) => {
    switch (action.type) {
      case "CREATE_COMMENT":   
        return state;
      case "CREATE_COMMENT_ERROR":
        console.log(action.err)
      default:
        return state;
    }
  }
  
  export default commentReducer;