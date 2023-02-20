import SideBar from "../../../components/organisms/SideBar"
import TransactionsContent from "../../../components/organisms/TransactionsContent"
import { JWTPayloadTypes, UserTypes } from "../../../services/data-types"
import jwtDecode from "jwt-decode"

const Transactions = () => {
  return (
    <>
        <section className="transactions overflow-auto">
            <SideBar activeMenu="transactions" />
            <TransactionsContent />
        </section>
    </>
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

export default Transactions