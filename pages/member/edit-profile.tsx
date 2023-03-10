import Cookies from "js-cookie"
import jwtDecode from 'jwt-decode'
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from 'react'
import { toast } from "react-toastify"
import Input from "../../components/atoms/Input"
import SideBar from "../../components/organisms/SideBar"
import { JWTPayloadTypes, UserTypes } from "../../services/data-types"
import { updateProfile } from "../../services/member"

const EditProfile = () => {
    const [user, setUser] = useState({
        avatar: '',
        username: '',
        email: '',
        id: ''
    })
    const [imagePreview, setImagePreview] = useState(null)
    const router = useRouter()
    useEffect(()=>{
        const token = Cookies.get('token')
        if (token) {
            const jwtToken = atob(token)
            const payload: JWTPayloadTypes = jwtDecode(jwtToken)
            const userFromPayload: UserTypes = payload.player
            setUser(userFromPayload)
        }

    }, [])
    const ROOT_IMG= process.env.NEXT_PUBLIC_IMG
    const myLoader = ({ src, width, quality }) => {
        return `${ROOT_IMG}/${src}?w=${width}&q=${quality || 75}`
    }

    const onChangeName =(event)=>{
        setUser({
            ...user, username: event.target.value
        })
    }

    const onChangeFile = (event)=>{
        const img = event.target.files[0]
        setImagePreview(URL.createObjectURL(img))
        setUser({
            ...user,
            avatar: img
        })
    }

    const onSubmit = async()=>{
        const data = new FormData()
        data.append('image', user.avatar)
        data.append('name', user.username)
        const response = await updateProfile(data, user.id)
        if (response.error) {
            toast.error(response.message)
        } else {
            toast.success('Profile berhasil diubah.')
            Cookies.remove('token')
            router.push('/sign-in')
        }
    }

    return (
        <>
            <section className="edit-profile overflow-auto">
                <SideBar activeMenu="settings" />
                <main className="main-wrapper">
                    <div className="ps-lg-0">
                        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
                        <div className="bg-card pt-30 ps-30 pe-30 pb-30">
                            <form action="">
                                <div className="photo d-flex">
                                    {/* <div className="position-relative me-20">
                                        <Image src="/img/avatar-1.png" width={90} height={90} className="avatar img-fluid" alt="profile" />
                                        <div
                                            className="avatar-overlay position-absolute top-0 d-flex justify-content-center align-items-center">
                                            <Image src="/icon/upload.svg" width={90} height={90} alt="upload" />
                                        </div>
                                    </div> */}
                                    <div className="image-upload">
                                        <label htmlFor="avatar">
                                            {imagePreview ? (
                                                <Image loader={myLoader} src={imagePreview} width={90} height={90} alt="upload" style={{borderRadius: '100%'}} />
                                            ) : (
                                                <Image loader={myLoader} src={user.avatar} width={90} height={90} alt="upload" style={{borderRadius: '100%'}} />
                                            ) }
                                        </label>
                                        <input 
                                        id="avatar" 
                                        type="file" 
                                        name="avatar" 
                                        accept="image/png, image/jpeg" 
                                        onChange={onChangeFile}
                                        />
                                    </div>
                                </div>
                                <div className="pt-30">
                                    <Input 
                                        label="Full Name" 
                                        value={user.username}
                                        onChange={(event)=> onChangeName(event)}
                                    />
                                    
                                </div>
                                <div className="pt-30">
                                    <Input 
                                        label="Email Address" 
                                        value={user.email}
                                        disabled={true}
                                    />

                                </div>
                                {/* <div className="pt-30">
                                    <Input 
                                        label="Phone" 
                                    />
                                </div> */}
                                <div className="button-group d-flex flex-column pt-50">
                                    <button 
                                    className="btn btn-save fw-medium text-lg text-white rounded-pill"
                                    type="button"
                                    onClick={onSubmit}
                                    >
                                        Save My Profile
                                    </button>
                                </div>
                            </form>

                        </div>


                    </div>
                </main>
            </section>
        </>
    )
}

export default EditProfile