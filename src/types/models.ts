export interface MenuItem {
  description: string
  discount_percent: number
  display_price: number
  image_url: string
  is_discount: boolean
  name: string
  price: number
  tags: string[]
}

export interface Home {
  _id: string
  name: string
  items: MenuItem[]
}

export interface AddonMenu {
  addon_category_id: string
  addon_cateogry_name: string
  addon_items: AddonItem[]
}

export interface AddonItem {
  _id: string
  name: string
  additional_price: number
}

export interface Variants {
  _id: string
  name: string
}

export interface Detail {
  _id: string
  addons: AddonMenu[]
  description: string
  discount_percent: number
  display_price: number
  image_url: string
  is_discount: boolean
  name: string
  price: number
  tags: string[]
  variants: Variants[]
}