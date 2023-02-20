import { NumericFormat } from "react-number-format"

interface RowProps {
    label: string,
    value: string | number,
    className?: string
}
const Row = (props: Partial<RowProps>) => {
    const { label, value, className } = props

    if (typeof(value) === "number") {
        return (
            <p className="text-lg color-palette-1 mb-20">{label}<span className={`purchase-details ${className}`}>
                <NumericFormat 
                value={value} 
                prefix="Rp. " 
                displayType="text" 
                thousandSeparator="."
                decimalSeparator=","
                />
            </span></p>
        )
    }

    return (
        <p className="text-lg color-palette-1 mb-20">{label}
            <span className={`purchase-details ${className}`}> 
                {value}
            </span>
        </p>
    )
}

export default Row