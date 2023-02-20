import { useCallback, useEffect, useState } from "react"
import { NumericFormat } from "react-number-format"
import { toast } from "react-toastify"
import { HistoryTransactionsTypes } from "../../../services/data-types"
import { getMemberTransactions } from "../../../services/member"
import ButtonTab from "./ButtonTab"
import TableRow from "./TableRow"

const TransactionsContent = () => {

    const [totalSpent, setTotalSpent]= useState(0)
    const [transactions, setTransactions] = useState([])
    const [tab, setTab] = useState('all')

    const getMemberTransactionAPI = useCallback(async(value)=>{
        const response = await getMemberTransactions(value)
        if (response.error) {
            toast.error(response.message)
        } else {
            setTotalSpent(response.data.total)
            setTransactions(response.data.data)
        }
    },[])

    useEffect(()=>{
        getMemberTransactionAPI('all')
    }, [])

    const onTabClick = (value)=>{
        setTab(value)
        getMemberTransactionAPI(value)
    }

    return (
        <main className="main-wrapper">
            <div className="ps-lg-0">
                <h2 className="text-4xl fw-bold color-palette-1 mb-30">My Transactions</h2>
                <div className="mb-30">
                    <p className="text-lg color-palette-2 mb-12">You’ve spent</p>
                    <h3 className="text-5xl fw-medium color-palette-1">
                        <NumericFormat 
                        value={totalSpent} 
                        prefix="Rp. " 
                        displayType="text" 
                        thousandSeparator="."
                        decimalSeparator=","
                        />
                    </h3>
                </div>
                <div className="row mt-30 mb-20">
                    <div className="col-lg-12 col-12 main-content">
                        <div id="list_status_title">
                            <ButtonTab title="All Trx" active={tab === 'all'} onClick={()=> onTabClick('all')} />
                            <ButtonTab title="Success" active={tab === 'success'} onClick={()=> onTabClick('success')} />
                            <ButtonTab title="Pending" active={tab === 'pending'} onClick={()=> onTabClick('pending')} />
                            <ButtonTab title="Failed" active={tab === 'failed'} onClick={()=> onTabClick('failed')} />
                        </div>
                    </div>
                </div>
                <div className="latest-transaction">
                    <p className="text-lg fw-medium color-palette-1 mb-14">Latest Transactions</p>
                    <div className="main-content main-content-table overflow-auto">
                        <table className="table table-borderless">
                            <thead>
                                <tr className="color-palette-1">
                                    <th className="" scope="col">Game</th>
                                    <th scope="col">Item</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody id="list_status_item">
                                {transactions.map((item: HistoryTransactionsTypes)=>{
                                    return (
                                    <TableRow
                                        key={item._id}
                                        image={item.historyVoucherTopup.thumbnail}
                                        title={item.historyVoucherTopup.gameName}
                                        categori={item.historyVoucherTopup.category}
                                        item={`${item.historyVoucherTopup.coinQuantity} ${item.historyVoucherTopup.coinName}`}
                                        price={item.historyVoucherTopup.price}
                                        status={item.status}
                                        id={item._id}
                                    />
                                    )
                                })}
                                
                            

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default TransactionsContent