import cx from "classnames"
import Image from "next/image"
import Link from "next/link"
import { NumericFormat } from "react-number-format"

interface TableRowProps {
    image: string,
    title: string,
    categori: string,
    item: string,
    price: number,
    status: string,
    id: string
}
const TableRow = (props: TableRowProps) => {
    const { image, title, categori, item, price, status,id }= props
    const statusClass = cx({
        'float-start icon-status' : true,
        'pending': status === 'pending',
        'success': status === 'success',
        'failed': status === 'failed'
    })
    const ROOT_IMG = process.env.NEXT_PUBLIC_IMG
    const myLoader = ({ src, width, quality }) => {
        return `${ROOT_IMG}/${src}?w=${width}&q=${quality || 75}`
    }

    return (
        <tr data-category="pending" className="align-middle">
            <th scope="row">
                <Image loader={myLoader} className="float-start me-3 mb-lg-0 mb-3" src={image} width={80} height={60} alt={title} />
                <div className="game-title-header">
                    <p className="game-title fw-medium text-start color-palette-1 m-0">{title}</p>
                    <p className="text-xs fw-normal text-start color-palette-2 m-0">{categori}</p>
                </div>
            </th>
            <td>
                <p className="fw-medium color-palette-1 m-0">{item}</p>
            </td>
            <td>
                <p className="fw-medium color-palette-1 m-0">
                    <NumericFormat 
                    value={price} 
                    prefix="Rp. " 
                    displayType="text" 
                    thousandSeparator="."
                    decimalSeparator=","
                    />
                </p>
            </td>
            <td>
                <div>
                    <span className={statusClass}></span>
                    <p className="fw-medium text-start color-palette-1 m-0 position-relative">{status}</p>
                </div>
            </td>
            <td>
                <Link href={`/member/transactions/${id}`} legacyBehavior>
                    <a className="btn btn-status rounded-pill text-sm">Details</a>
                </Link>
            </td>
        </tr>
    )
}

export default TableRow