"use client"

import { useState } from "react"
import Link from "next/link"
import { ChefHat, Download, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data - in a real app this would come from a database
const initialIngredients = [
  { id: 1, name: "Chicken Breast", unit: "kg", price: 25.9, stock: 2 },
  { id: 2, name: "Bread Rolls", unit: "unit", price: 0.75, stock: 40 },
  { id: 3, name: "Lettuce", unit: "unit", price: 3.5, stock: 5 },
  { id: 4, name: "Tomato", unit: "kg", price: 8.9, stock: 3 },
  { id: 5, name: "Cheese", unit: "kg", price: 45.0, stock: 1.5 },
  { id: 6, name: "Coffee", unit: "kg", price: 30.0, stock: 1 },
  { id: 7, name: "Milk", unit: "L", price: 5.5, stock: 5 },
  { id: 8, name: "Sugar", unit: "kg", price: 4.9, stock: 2 },
]

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

export default function CostsPage() {
  const [crewSize, setCrewSize] = useState(15)
  const [filmingDays, setFilmingDays] = useState(4)

  // Calculate total quantities and costs
  const calculateCosts = () => {
    const allMeals = [...initialMeals.breakfast, ...initialMeals.coffeeBreak]
    const ingredientTotals = {}

    // Initialize ingredient totals
    initialIngredients.forEach((ing) => {
      ingredientTotals[ing.id] = {
        name: ing.name,
        unit: ing.unit,
        price: ing.price,
        totalQuantity: 0,
        totalCost: 0,
        originalUnit: ing.unit,
      }
    })

    // Calculate quantities needed for each meal
    allMeals.forEach((meal) => {
      const mealType = initialMeals.breakfast.includes(meal) ? "breakfast" : "coffeeBreak"
      const servingsPerDay = crewSize * meal.servingsPerPerson
      const totalServings = servingsPerDay * filmingDays

      meal.ingredients.forEach((ingredient) => {
        const totalIngredientQuantity = ingredient.quantity * totalServings

        // Convert units if necessary (g to kg, ml to L)
        let convertedQuantity = totalIngredientQuantity
        let convertedUnit = ingredient.unit

        if (ingredient.unit === "g" && ingredientTotals[ingredient.id].unit === "kg") {
          convertedQuantity = totalIngredientQuantity / 1000
          convertedUnit = "kg"
        } else if (ingredient.unit === "ml" && ingredientTotals[ingredient.id].unit === "L") {
          convertedQuantity = totalIngredientQuantity / 1000
          convertedUnit = "L"
        }

        ingredientTotals[ingredient.id].totalQuantity += convertedQuantity
        ingredientTotals[ingredient.id].totalCost =
          ingredientTotals[ingredient.id].totalQuantity * ingredientTotals[ingredient.id].price
      })
    })

    return Object.values(ingredientTotals).filter((item) => item.totalQuantity > 0)
  }

  const ingredientCosts = calculateCosts()
  const totalCost = ingredientCosts.reduce((sum, item) => sum + item.totalCost, 0)

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
            <Link href="/meals" className="text-muted-foreground hover:text-foreground">
              Meals
            </Link>
            <Link href="/ingredients" className="text-muted-foreground hover:text-foreground">
              Ingredients
            </Link>
            <Link href="/costs" className="font-medium">
              Costs
            </Link>
          </nav>
          <Button size="sm" variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Cost Calculator</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Crew Size</CardTitle>
              <CardDescription>Number of people to feed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Label htmlFor="crew-size">Crew Members</Label>
                <Input
                  id="crew-size"
                  type="number"
                  min="1"
                  value={crewSize}
                  onChange={(e) => setCrewSize(Number.parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filming Days</CardTitle>
              <CardDescription>Number of days to provide catering</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Label htmlFor="filming-days">Days</Label>
                <Input
                  id="filming-days"
                  type="number"
                  min="1"
                  value={filmingDays}
                  onChange={(e) => setFilmingDays(Number.parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Total Cost</CardTitle>
              <CardDescription>Estimated cost for all ingredients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">R$ {totalCost.toFixed(2)}</div>
              <p className="text-sm text-muted-foreground mt-2">
                For {crewSize} people over {filmingDays} days
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingredient</TableHead>
                <TableHead>Unit Price (R$)</TableHead>
                <TableHead className="text-right">Quantity Needed</TableHead>
                <TableHead className="text-right">Total Cost (R$)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredientCosts.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    R$ {item.price.toFixed(2)} / {item.unit}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.totalQuantity.toFixed(2)} {item.unit}
                  </TableCell>
                  <TableCell className="text-right">R$ {item.totalCost.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end mt-6">
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download Shopping List
          </Button>
        </div>
      </main>
    </div>
  )
}
