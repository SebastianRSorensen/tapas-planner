import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase"
import { DashboardContent } from "@/components/dashboard-content"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const supabase = createServerClient()

  // Fetch all dishes
  const { data: dishes } = await supabase.from("dishes").select("*").order("name")

  // Fetch all user dishes with dish details
  const { data: userDishes } = await supabase.from("user_dishes").select(`
      *,
      dish:dishes(*)
    `)

  // Fetch all users who have selected dishes
  const { data: usersWithDishes, error: userError } = await supabase
    .from("user_dishes")
    .select(`
      user_id
    `)
    .order("created_at")

  if (userError) {
    console.error("Error fetching users with dishes:", userError)
  }

  // Get unique user IDs who have selected dishes
  const userIdsWithDishes = [...new Set(usersWithDishes?.map((ud) => ud.user_id) || [])]

  // Fetch user details for those who have selected dishes
  const { data: users } = await supabase.auth.admin.listUsers()

  // Separate users into those with and without dishes
  const usersWithDishesDetails = users?.users.filter((user) => userIdsWithDishes.includes(user.id)) || []

  const usersWithoutDishes = users?.users.filter((user) => !userIdsWithDishes.includes(user.id)) || []

  // Check if current user is admin (for demo purposes, we'll consider the first user as admin)
  const isAdmin = users?.users.length ? session.user.id === users.users[0].id : false

  return (
    <DashboardContent
      dishes={dishes || []}
      userDishes={userDishes || []}
      usersWithDishes={usersWithDishesDetails}
      usersWithoutDishes={usersWithoutDishes}
      currentUser={session.user}
      isAdmin={isAdmin}
    />
  )
}
