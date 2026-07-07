export interface Asset {
  id: number
  symbol: string
  name: string
  quantity: number
  purchasePrice: number
}

export type NewAsset = Omit<Asset, 'id'>
