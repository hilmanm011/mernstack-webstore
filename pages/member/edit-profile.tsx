import Image from "next/image"
import Input from "../../components/atoms/Input"
import SideBar from "../../components/organisms/SideBar"

const EditProfile = () => {
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
                                <div className="position-relative me-20">
                                    <Image src="/img/avatar-1.png" width={90} height={90} className="avatar img-fluid" alt="profile" />
                                    <div
                                        className="avatar-overlay position-absolute top-0 d-flex justify-content-center align-items-center">
                                        <Image src="/icon/upload.svg" width={90} height={90} alt="upload" />
                                    </div>
                                </div>
                                <div className="image-upload">
                                    <label htmlFor="avatar">
                                        <Image src="/icon/upload.svg" width={90} height={90} alt="upload" />
                                    </label>
                                    <input id="avatar" type="file" name="avatar" accept="image/png, image/jpeg" />
                                </div>
                            </div>
                            <div className="pt-30">
                                <Input 
                                    label="Full Name" 
                                />
                                {/* <label htmlFor="name" className="form-label text-lg fw-medium color-palette-1 mb-10">Full
                                    Name</label>
                                <input type="text" className="form-control rounded-pill text-lg" id="name" name="name"
                                    aria-describedby="name" placeholder="Enter your name"/> */}
                            </div>
                            <div className="pt-30">
                                <Input 
                                    label="Email Address" 
                                />

                                {/* <label htmlFor="email" className="form-label text-lg fw-medium color-palette-1 mb-10">Email
                                    Address</label>
                                <input type="email" className="form-control rounded-pill text-lg" id="email" name="email"
                                    aria-describedby="email" placeholder="Enter your email address"/> */}
                            </div>
                            <div className="pt-30">
                                <Input 
                                    label="Phone" 
                                />
                                {/* <label htmlFor="phone" className="form-label text-lg fw-medium color-palette-1 mb-10">Phone</label>
                                <input type="tel" className="form-control rounded-pill text-lg" id="phone" name="phone"
                                    aria-describedby="phone" placeholder="Enter your phone number"/> */}
                            </div>
                            <div className="button-group d-flex flex-column pt-50">
                                <button type="submit" className="btn btn-save fw-medium text-lg text-white rounded-pill"
                                    role="button">Save My Profile</button>
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