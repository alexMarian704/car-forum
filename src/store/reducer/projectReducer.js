const initState = {
  projects: [
  ]
}

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PROJECT":
      
      return state;
    case "CREATE_PROJECT_ERROR":
      console.log(action.err)
    default:
      return state;
  }
}

export default projectReducer;
