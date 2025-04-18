import Link from "next/link"
import { CalendarDays, ChefHat, DollarSign, ShoppingCart, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <ChefHat className="h-6 w-6" />
            <h1 className="text-xl font-bold">O Sol Sempre Está - Catering</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="font-medium">
              Dashboard
            </Link>
            <Link href="/meals" className="text-muted-foreground hover:text-foreground">
              Meals
            </Link>
            <Link href="/ingredients" className="text-muted-foreground hover:text-foreground">
              Ingredients
            </Link>
            <Link href="/costs" className="text-muted-foreground hover:text-foreground">
              Costs
            </Link>
          </nav>
          <Button size="sm">Add Meal</Button>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="grid gap-6">
          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 1,200.00</div>
                  <p className="text-xs text-muted-foreground">For 4 days of filming</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Crew Size</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">14-16</div>
                  <p className="text-xs text-muted-foreground">People per day</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Filming Days</CardTitle>
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground">Days total</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Shopping List</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Items to purchase</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold tracking-tight">Meal Plan</h2>
              <Link href="/meals">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Breakfast</CardTitle>
                  <CardDescription>Served daily at 7:00 AM</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between">
                      <span>Chicken Sandwich</span>
                      <span className="text-sm text-muted-foreground">2 per person</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Coffee</span>
                      <span className="text-sm text-muted-foreground">200ml per person</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Fresh Fruit</span>
                      <span className="text-sm text-muted-foreground">1 per person</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Coffee Break</CardTitle>
                  <CardDescription>Served daily at 3:00 PM</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between">
                      <span>Vegetable Sandwich</span>
                      <span className="text-sm text-muted-foreground">1 per person</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Cookies</span>
                      <span className="text-sm text-muted-foreground">2 per person</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Juice</span>
                      <span className="text-sm text-muted-foreground">150ml per person</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
