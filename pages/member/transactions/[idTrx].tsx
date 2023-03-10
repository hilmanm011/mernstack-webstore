import jwtDecode from 'jwt-decode'
import TransactionsDetailContent from "../../../components/organisms/TransactionsDetailContent/indes"
import { HistoryTransactionsTypes, JWTPayloadTypes, UserTypes } from "../../../services/data-types"
import { getTransactionsDetail } from '../../../services/member'

interface TransactionsDetailProps {
  transactionsDetail: HistoryTransactionsTypes
}
const TransactionsDetail = (props: TransactionsDetailProps) => {
  const { transactionsDetail } = props
  return ( 
    <>
        <section className="transactions-detail overflow-auto">
            <TransactionsDetailContent data={transactionsDetail} />
        </section>
    </>
  )
}

interface GetServerSideProps {
  req: {
      cookies: {
          token: string
      }
  },
  params: {
    idTrx: string
  }
}

export async function getServerSideProps({ req, params} : GetServerSideProps) {
  const { idTrx } = params
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
  const response = await getTransactionsDetail(idTrx, jwtToken)

  return {
      props: {
        transactionsDetail: response.data
      }
  }
}

export default TransactionsDetail