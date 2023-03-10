import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { HistoryTransactionsTypes, TopUpCategoriesType } from "../../../services/data-types"
import { getMemberOverview } from "../../../services/member"
import Categori from "./Categori"
import TableRow from "./TableRow"

const OverviewContent = () => {

    const [count, setCount] = useState([])
    const [data, setData] = useState([])

    const getOverview = useCallback(async()=>{
         const response = await getMemberOverview()
         if (response.error) {
            toast.error(response.message)
         } else {
            setCount(response.data.count)
            setData(response.data.data)
         }
    }, [])
    
    useEffect(()=>{
        getOverview()
    },[])
    
    const ROOT_IMG = process.env.NEXT_PUBLIC_IMG
    return (
        <main className="main-wrapper">
            <div className="ps-lg-0">
                <h2 className="text-4xl fw-bold color-palette-1 mb-30">Overview</h2>
                <div className="top-up-categories mb-30">
                    <p className="text-lg fw-medium color-palette-1 mb-14">Top Up Categories</p>
                    <div className="main-content">
                        <div className="row">
                            {count.map((item: TopUpCategoriesType)=>{
                                return (
                                    <Categori key={item._id[0]} nominal={item.value} icon="ic-desktop">
                                        Game<br/>{item.name}
                                    </Categori>
                                )
                            })}
                           
                        </div>
                    </div>
                </div>
                <div className="latest-transaction">
                    <p className="text-lg fw-medium color-palette-1 mb-14">Latest Transactions</p>
                    <div className="main-content main-content-table overflow-auto">
                        <table className="table table-borderless">
                            <thead>
                                <tr className="color-palette-1">
                                    <th className="text-start" scope="col">Game</th>
                                    <th scope="col">Item</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>

                                {data.map((item: HistoryTransactionsTypes)=>{
                                    return (
                                        <TableRow 
                                        key={item._id}
                                        title={item.historyVoucherTopup.gameName} 
                                        categori="Dekstop" 
                                        item={`${item.historyVoucherTopup.coinQuantity} ${item.historyVoucherTopup.coinName}`} 
                                        price={item.historyVoucherTopup.price} 
                                        status={item.status} 
                                        image={`${ROOT_IMG}/${item.historyVoucherTopup.thumbnail}`} 
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

export default OverviewContent