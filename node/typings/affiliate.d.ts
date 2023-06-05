import { Pagination } from './search'
import { Supplier } from './supplier'

export interface Affiliate {
  id?: string
  affiliateId: string
  affiliateCode?: string
  sponsor: Sponsor | string
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

export interface Sponsor {
  affiliateId: string
  email: string
}

export interface AffiliateOrder {
  id?: string
  orderId: string
  orderDate: string
  orderTotalValue: number
  status: string
  affiliate: Supplier
  sponsor: Supplier | null
}

export interface GetAffiliateOrdersInput {
  affiliateId: string
  ordersFrom: 'AFFILIATE' | 'SUBAFFILIATES' | 'ALL'
  pagination: Pagination
  dateFrom: string
}

export interface ApproveOrDenyAffiliateInput {
  affiliateId: string
  approve: boolean
}

export interface GetSubAffiliatesDataInput {
  affiliateId: string
  pagination: Pagination
}

export interface SubAffiliatesInfo {
  name: string
  sold: number
  status: 'PENDING' | 'APPROVED' | 'DENIED'
}

export interface AffiliateMonthlySalesData {
  month: string
  affiliateSales: number
  subAffiliatesSales: number
  affiliateSalesComission: number
  subAffiliatesSalesComission: number
}
