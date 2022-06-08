export class CreateClientDto {
  tenancyId: number
  tenancyName: string
  name: string
  businessType: string
  description?: string
  logo?: string
  cover?: string
  favicon?: string
  currencyName?: string
  currencySymbol?: string
  urlIG?: string
  urlFB?: string
  brightness?: string
  primary?: string
  onPrimary?: string
  secondary?: string
  onSecondary?: string
  error?: string
  onError?: string
  background?: string
  onBackground?: string
  surface?: string
  onSurface?: string
}
