import React from 'react'
import {Link} from 'react-router-dom'


const ProfileAction = () =>  (
    <div className='btn-group mb-4' role='group'>
      <Link to='/edit-profile' className='btn btn-light'>
      <i className="fas fa-user-circle text-info">Edit Profile</i>
      </Link>
      <Link to='/add-experience' className='btn btn-light'>
      <i className="fab fa-black-tie text-info">Add Experience</i>
      </Link>
      <Link to='/add-education' className='btn btn-light'>
      <i className="fas fa-graduation-cap text-info">Add Education</i>
      </Link>
      
    </div>
  )


export default ProfileAction
