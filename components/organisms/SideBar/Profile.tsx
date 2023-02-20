import Image from "next/image"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { JWTPayloadTypes, UserTypes } from "../../../services/data-types"
import jwtDecode from "jwt-decode"

const Profile = () => {
  const [user, setUser] = useState({
    avatar: '',
    username: '',
    email: ''
  })
  useEffect(()=>{
      const token = Cookies.get('token')
      if (token) {
          const jwtToken = atob(token)
          const payload: JWTPayloadTypes = jwtDecode(jwtToken)
          const userFromPayload: UserTypes = payload.player
          const ROOT_IMG = process.env.NEXT_PUBLIC_IMG
          userFromPayload.avatar = `${ROOT_IMG}/${payload.player.avatar}`
          setUser(userFromPayload)
      }
  }, [])
  console.log(user);
  
  
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }
  
  return (
    <div className="user text-center pb-50 pe-30">
        <Image loader={myLoader} src={user.avatar} width="90" height="90" className="img-fluid mb-20" alt="Profile" style={{borderRadius: '100%'}} />
        <h2 className="fw-bold text-xl color-palette-1 m-0">{user.username}</h2>
        <p className="color-palette-2 m-0">{user.email}</p>
    </div>
  )
}

export default Profile