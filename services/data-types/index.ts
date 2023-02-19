export interface CategoryTypes {
    _id: string,
    name: string,
    __v: number
}

export interface GemaItemTypes {
    _id: string,
    status: string,
    name: string,
    thumbnail: string,
    category: CategoryTypes
}

export interface BanksTypes {
    _id: string,
    bankName: string,
    name: string,
    noRekening: string
}

export interface PaymentTypes {
    _id: string,
    status: string,
    type: string,
    banks: BanksTypes[]
}

export interface NominalsTypes {
    _id: string,
    coinName: string,
    coinQuantity: string,
    price: number
}

export interface LoginTypes {
    email: string,
    password: string
}

export interface UserTypes {
    id: string,
    username: string,
    email: string,
    name: string,
    avatar: string
}

export interface JWTPayloadTypes {
    player: UserTypes
    iat: number
}

export interface CheckoutTypes {
    voucher : string,
    nominal: string,
    payment: string,
    bank: string,
    name: string,
    accountUser: string
}