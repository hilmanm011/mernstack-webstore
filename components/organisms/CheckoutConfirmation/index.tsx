import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { setCheckout } from '../../../services/player';

const CheckoutConfirmation = () => {
  const [checkbox, setCheckbox] = useState(false)
  const router = useRouter()
  const onSubmit = async()=>{
    const dataItemLocal = localStorage.getItem('data-item')
    const dataTopUpLocal = localStorage.getItem('data-topup')
    
    const dataItem = JSON.parse(dataItemLocal)
    const dataTopUp = JSON.parse(dataTopUpLocal)
    if (!checkbox) {
      toast.error('Pastikan anda sudah melakukan pembayaran.')
    } else {
      const data = {
        voucher : dataItem.voucher._id,
        nominal: dataTopUp.nominalItem._id,
        payment: dataTopUp.paymentItem.payment._id,
        bank: dataTopUp.paymentItem.bank._id,
        name: dataTopUp.bankAccountName,
        accountUser: dataTopUp.verifyID
      }
      const result = await setCheckout(data)
      if (result.error) {
          toast.error('Checkout gagal !')
      } else {
        toast.success('Checkout Berhasil')
        router.push('/complete-checkout')
      }
    }
  }
  return (
    <>
    <label className="checkbox-label text-lg color-palette-1">I have transferred the money
        <input type="checkbox" checked={checkbox} onChange={()=> setCheckbox(!checkbox)} />
        <span className="checkmark"></span>
    </label>
    <div className="d-md-block d-flex flex-column w-100 pt-50">
        <button 
        className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg" 
        type="button"
        onClick={onSubmit}
        >
          Confirm Payment
        </button>
    </div>
    </>
  )
}

export default CheckoutConfirmation