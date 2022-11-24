import SideBar from "../../../components/organisms/SideBar"
import TransactionsContent from "../../../components/organisms/TransactionsContent"

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

export default Transactions