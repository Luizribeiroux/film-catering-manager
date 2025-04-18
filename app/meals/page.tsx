"use client"

import { useState } from "react"
import Link from "next/link"
import { ChefHat, ChevronDown, Edit, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddMealDialog } from "./add-meal-dialog"

// Sample data - in a real app this would come from a database
const initialMeals = {
  breakfast: [
    {
      id: 1,
      name: "Chicken Sandwich",
      servingsPerPerson: 2,
      ingredients: [
        { id: 1, name: "Chicken Breast", quantity: 30, unit: "g" },
        { id: 2, name: "Bread Rolls", quantity: 1, unit: "unit" },
        { id: 3, name: "Lettuce", quantity: 5, unit: "g" },
        { id: 4, name: "Tomato", quantity: 10, unit: "g" },
        { id: 5, name: "Cheese", quantity: 15, unit: "g" },
      ],
    },
    {
      id: 2,
      name: "Coffee",
      servingsPerPerson: 1,
      ingredients: [
        { id: 6, name: "Coffee", quantity: 10, unit: "g" },
        { id: 7, name: "Milk", quantity: 50, unit: "ml" },
        { id: 8, name: "Sugar", quantity: 5, unit: "g" },
      ],
    },
  ],
  coffeeBreak: [
    {
      id: 3,
      name: "Vegetable Sandwich",
      servingsPerPerson: 1,
      ingredients: [
        { id: 2, name: "Bread Rolls", quantity: 1, unit: "unit" },
        { id: 3, name: "Lettuce", quantity: 10, unit: "g" },
        { id: 4, name: "Tomato", quantity: 20, unit: "g" },
        { id: 5, name: "Cheese", quantity: 20, unit: "g" },
      ],
    },
  ],
}

export default function MealsPage() {
  const [meals, setMeals] = useState(initialMeals)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState("breakfast")

  const handleAddMeal = (newMeal) => {
    setMeals({
      ...meals,
      [currentTab]: [
        ...meals[currentTab],
        {
          id: Math.max(...meals.breakfast.map((m) => m.id), ...meals.coffeeBreak.map((m) => m.id)) + 1,
          ...newMeal,
        },
      ],
    })
    setDialogOpen(false)
  }

  const handleDeleteMeal = (id) => {
    setMeals({
      ...meals,
      [currentTab]: meals[currentTab].filter((meal) => meal.id !== id),
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <ChefHat className="h-6 w-6" />
            <h1 className="text-xl font-bold">O Sol Sempre Está - Catering</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/meals" className="font-medium">
              Meals
            </Link>
            <Link href="/ingredients" className="text-muted-foreground hover:text-foreground">
              Ingredients
            </Link>
            <Link href="/costs" className="text-muted-foreground hover:text-foreground">
              Costs
            </Link>
          </nav>
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Meal
          </Button>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Meals</h2>
        </div>

        <Tabs defaultValue="breakfast" className="w-full" onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
            <TabsTrigger value="coffeeBreak">Coffee Break</TabsTrigger>
          </TabsList>
          <TabsContent value="breakfast" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {meals.breakfast.map((meal) => (
                <Card key={meal.id}>
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div>
                      <CardTitle>{meal.name}</CardTitle>
                      <CardDescription>{meal.servingsPerPerson} per person</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteMeal(meal.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent>
                    <h4 className="text-sm font-semibold mb-2">Ingredients per serving:</h4>
                    <ul className="space-y-1 text-sm">
                      {meal.ingredients.map((ingredient) => (
                        <li key={ingredient.id} className="flex justify-between">
                          <span>{ingredient.name}</span>
                          <span className="text-muted-foreground">
                            {ingredient.quantity} {ingredient.unit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="coffeeBreak" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {meals.coffeeBreak.map((meal) => (
                <Card key={meal.id}>
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div>
                      <CardTitle>{meal.name}</CardTitle>
                      <CardDescription>{meal.servingsPerPerson} per person</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteMeal(meal.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent>
                    <h4 className="text-sm font-semibold mb-2">Ingredients per serving:</h4>
                    <ul className="space-y-1 text-sm">
                      {meal.ingredients.map((ingredient) => (
                        <li key={ingredient.id} className="flex justify-between">
                          <span>{ingredient.name}</span>
                          <span className="text-muted-foreground">
                            {ingredient.quantity} {ingredient.unit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <AddMealDialog open={dialogOpen} onOpenChange={setDialogOpen} onAddMeal={handleAddMeal} mealType={currentTab} />
    </div>
  )
}
