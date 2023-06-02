import { Pagination } from './search'

export interface Affiliate {
  affiliateId: string
  affiliateCode?: string
  sponsor: {
    affiliateId: string
    email: string
  }
  name: string
  cpf: string
  email: string
  gender: string
  address: {
    postalCode: string
    street: string
    number: string
    neighborhood: string
    complement: string
    city: string
    state: string
  }
  phone: string
  status: 'PENDING' | 'APPROVED' | 'DENIED'
}

export interface AffiliateOrder {
  orderId: string
  orderDate: string
  orderTotalValue: number
  status: string
  affiliate: Affiliate
  sponsor: Affiliate | null
}

export interface GetAffiliateOrdersInput {
  affiliateId: string
  ordersFrom: 'AFFILIATE' | 'SUBAFFILIATES' | 'ALL'
  pagination: Pagination
  dateFrom: string
}
