export interface IAffiliate {
  affiliateId: string
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

export interface IAffiliateCode {
  code: string
  affiliateId: string
  expiresAt: string
}
