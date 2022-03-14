export interface region {
  id: string
  region: string
  ville?: string
}

export interface center {
  address: string
  city: number
  createdAt: string
  name: string
  region: number
  updatedAt: string
  _id: string
}
export type centers = center[]

export type regions = region[]

export interface IPersonalInfo {
  name: string
  address: string
  phone: string
}
export interface ISurvey {
  first: boolean
  second: boolean
}
