import { useEffect, useState } from "react"
import { NumericFormat } from "react-number-format"

const CheckoutDetail = () => {

  const [dataTopUpItem, setDataTopUpItem] = useState({
    verifyID : '',
    nominalItem : {
      price: 0,
      coinQuantity: 0,
      coinName: '',
      _id: ''
    },
    paymentItem: {
      payment: {
        type: '',
        _id: ''
      },
      bank: {
        bankName: '',
        name: '',
        noRekening: '',
        _id: ''
      }
    },
    bankAccountName: ''
  })

  useEffect(()=>{
    const dataFromLocal = localStorage.getItem('data-topup')
    const dataTopUpLocal = JSON.parse(dataFromLocal)
    setDataTopUpItem(dataTopUpLocal)
    console.log('data top up :', dataTopUpLocal);
    

  },[])

  const itemPrice = dataTopUpItem.nominalItem.price
  const tax = itemPrice * (10 / 100)
  const totalPrice = itemPrice + tax

  return (
    <>
    <div className="purchase pt-md-50 pt-30">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">Purchase Details</h2>
        <p className="text-lg color-palette-1 mb-20">Your Game ID <span className="purchase-details">{dataTopUpItem.verifyID}</span></p>
        <p className="text-lg color-palette-1 mb-20">Order ID <span className="purchase-details">#GG001</span></p>
        <p className="text-lg color-palette-1 mb-20">Item <span className="purchase-details">{dataTopUpItem.nominalItem.coinQuantity} {dataTopUpItem.nominalItem.coinName}</span></p>
        <p className="text-lg color-palette-1 mb-20">
          Price <span className="purchase-details">
          <NumericFormat 
            value={itemPrice} 
            prefix="Rp. " 
            displayType="text" 
            thousandSeparator="."
            decimalSeparator=","
            />
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Tax (10%) <span className="purchase-details">
          <NumericFormat 
            value={tax} 
            prefix="Rp. " 
            displayType="text" 
            thousandSeparator="."
            decimalSeparator=","
            />
          </span> 
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Total <span className="purchase-details color-palette-4">
          <NumericFormat 
            value={totalPrice} 
            prefix="Rp. " 
            displayType="text" 
            thousandSeparator="."
            decimalSeparator=","
            />
          </span>
        </p>
    </div>
        <div className="payment pt-md-50 pb-md-50 pt-10 pb-10">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">Payment Informations</h2>
        <p className="text-lg color-palette-1 mb-20">Your Account Name <span className="purchase-details">{dataTopUpItem.bankAccountName}</span></p>
        <p className="text-lg color-palette-1 mb-20">Type <span className="payment-details">{dataTopUpItem.paymentItem.payment.type}</span> </p>
        <p className="text-lg color-palette-1 mb-20">Bank Name <span className="payment-details">{dataTopUpItem.paymentItem.bank.bankName}</span></p>
        <p className="text-lg color-palette-1 mb-20">Bank Account Name <span className="payment-details">{dataTopUpItem.paymentItem.bank.name}</span></p>
        <p className="text-lg color-palette-1 mb-20">Bank Number <span className="payment-details">{dataTopUpItem.paymentItem.bank.noRekening}</span> </p>
    </div>
    </>
  )
}

export default CheckoutDetail