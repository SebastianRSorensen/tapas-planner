import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

export type Dish = {
  id: string
  name: string
  description: string
  requires_partner: boolean
  created_at: string
  updated_at: string
}

export type UserDish = {
  id: string
  user_id: string
  dish_id: string
  partner_name: string | null
  created_at: string
  updated_at: string
  dish?: Dish
}

export type UserWithDishes = {
  id: string
  name?: string | null
  email?: string | null
  dishes: (UserDish & { dish: Dish })[]
}
