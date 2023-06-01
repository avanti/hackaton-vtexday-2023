export interface Supplier {
  id: string
  name: string
  documentType: string
  document: string
  role: string
  amount: number
  commissionAmount: number
  chargeProcesssingFee: boolean
  chargebackLiable: boolean
}