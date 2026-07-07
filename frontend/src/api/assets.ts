import type { Asset, NewAsset } from '../types/asset'

const BASE_URL = '/api/assets'

export async function fetchAssets(): Promise<Asset[]> {
  const res = await fetch(BASE_URL)
  if (!res.ok) {
    throw new Error(`Failed to fetch assets: ${res.status}`)
  }
  return res.json()
}

export async function createAsset(asset: NewAsset): Promise<Asset> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(asset),
  })
  if (!res.ok) {
    throw new Error(`Failed to create asset: ${res.status}`)
  }
  return res.json()
}

export async function updateAsset(id: number, asset: NewAsset): Promise<Asset> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(asset),
  })
  if (!res.ok) {
    throw new Error(`Failed to update asset: ${res.status}`)
  }
  return res.json()
}

export async function deleteAsset(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) {
    throw new Error(`Failed to delete asset: ${res.status}`)
  }
}
