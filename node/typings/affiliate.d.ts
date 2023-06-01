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
}
