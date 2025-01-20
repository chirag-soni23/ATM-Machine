import React from 'react'
import { UserData } from '../context/UserContext';
import avatar from '../assets/avatar.png'

const Home = () => {
  const { user } = UserData();
  return (
    <div className='mt-[4rem]'>
  <div className="avatar">
    <div className="w-24 rounded-full">
      <img src={user.image?.url || avatar} />
    </div>
  </div>
  </div>
  )
}

export default Home