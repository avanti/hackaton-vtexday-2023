export interface CreateRecipientAtPagarMe {
  name: string
  email?: string
  description?: string
  document: string
  type: string
  code?: string
  default_bank_account?: {
    holder_name: string
    bank: string
    branch_number: string
    branch_check_digit?: string
    account_number: string
    account_check_digit: string
    holder_type: string
    holder_document: string
    type: string
  }
  transfer_settings?: {
    transfer_enabled?: boolean
    transfer_interval?: string
    transfer_day?: number
  }
  automatic_anticipation_settings?: {
    enabled?: boolean
    type?: string
    volume_percentage?: string
    delay?: string
  }
  metadata?: Record<string, any>
}

export interface CreateRecipientAtPagarMeResponse {
  id: string
  name: string
  email: string
  code: string
  document: string
  type: string
  payment_mode: string
  status: string
  created_at: Date
  updated_at: Date
  transfer_settings: TransferSettings
  default_bank_account: DefaultBankAccount
  gateway_recipients: GatewayRecipient[]
  automatic_anticipation_settings: AutomaticAnticipationSettings
}

export interface AutomaticAnticipationSettings {
  enabled: boolean
  type: string
  volume_percentage: number
  delay: number
}

export interface DefaultBankAccount {
  id: string
  holder_name: string
  holder_type: string
  holder_document: string
  bank: string
  branch_number: string
  branch_check_digit: string
  account_number: string
  account_check_digit: string
  type: string
  status: string
  created_at: Date
  updated_at: Date
}

export interface GatewayRecipient {
  gateway: string
  status: string
  pgid: string
  createdAt: Date
  updatedAt: Date
}

export interface TransferSettings {
  transfer_enabled: boolean
  transfer_interval: string
  transfer_day: number
}
