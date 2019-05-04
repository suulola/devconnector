import axios from 'axios'


export const createProfile = (userData, history) => dispatch => {
axios.post('/api/profile/', userData )
.then(profile => console.log(profile)  )
.catch(err => console.log(err) )
}