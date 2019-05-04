const initialState = {
  profile: null,
  profiles: null,
  loading: false,
};

const profileReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'PROFILE_LOADING': 
    return {
      ...state,
      loading: true
    }
    case 'GET_PROFILE':
    return {
      ...state,
      profile: action.payload,
      loading: false
    }
    default:
      return state;
  }
};

export default profileReducers;
