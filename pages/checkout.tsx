import CheckoutItem from "../components/organisms/CheckoutItem"
import CheckoutDetail from "../components/organisms/CheckoutDetail"
import CheckoutConfirmation from "../components/organisms/CheckoutConfirmation"
import Image from "next/image"
import { JWTPayloadTypes, UserTypes } from "../services/data-types"
import jwtDecode from "jwt-decode"
import { useEffect, useState } from "react"

interface CheckoutProps {
    user: UserTypes
}

const Checkout = (props: CheckoutProps) => {
    const { user } = props

    const [dataItem, setDataItem] = useState({
        thumbnail: '',
        name: '',
        category: {
            name: ''
        }
    })

    useEffect(()=>{
        const dataItemFromLocal = localStorage.getItem('data-item')
        const dataItemLocal = JSON.parse(dataItemFromLocal)
        const IMG_ROOT = process.env.NEXT_PUBLIC_IMG
        const dataSet = {
            thumbnail: `${IMG_ROOT}/${dataItemLocal.voucher.thumbnail}`,
            name: dataItemLocal.voucher.name,
            category: {
                name: dataItemLocal.voucher.category.name
            }
        }
        setDataItem(dataSet)
    }, [])
    
    return (
        <section className="checkout mx-auto pt-md-100 pb-md-145 pt-30 pb-30">
            <div className="container-fluid">
                <div className="logo text-md-center text-start pb-50">
                    <a className="" href="#">
                        <Image src="/icon/logo.svg" width={60} height={60} alt="logo" />
                    </a>
                </div>
                <div className="title-text pt-md-50 pt-0">
                    <h2 className="text-4xl fw-bold color-palette-1 mb-10">Checkout</h2>
                    <p className="text-lg color-palette-1 mb-0">Waktunya meningkatkan cara bermain</p>
                </div>
                <CheckoutItem name={dataItem.name} category={dataItem.category.name} thumbnail={dataItem.thumbnail} />
                <hr/>
                <CheckoutDetail />
                <CheckoutConfirmation />
            </div>
        </section>
    )
}

interface GetServerSideProps {
    req: {
        cookies: {
            token: string
        }
    }
}

export async function getServerSideProps({req} : GetServerSideProps) {
    const { token } = req.cookies
    if (!token) {
        return {
            redirect: {
                destination: '/sign-in',
                permanent: false
            }
        }
    }

    const jwtToken = Buffer.from(token, 'base64').toString('ascii')
    const payload: JWTPayloadTypes = jwtDecode(jwtToken)
    const userFromPayload: UserTypes = payload.player
    const ROOT_IMG = process.env.NEXT_PUBLIC_IMG
    userFromPayload.avatar = `${ROOT_IMG}/${userFromPayload.avatar}`

    return {
        props: {
            user: userFromPayload
        }
    }
}
export default Checkout
