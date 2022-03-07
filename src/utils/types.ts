export interface region {
  id: string
  region: string
  ville?: string
}

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
