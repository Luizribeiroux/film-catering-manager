"use client"

import { useState } from "react"
import Link from "next/link"
import { ChefHat, ChevronDown, Edit, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AddIngredientDialog } from "./add-ingredient-dialog"
import { EditIngredientDialog } from "./edit-ingredient-dialog"

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

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState(initialIngredients)
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedIngredient, setSelectedIngredient] = useState(null)

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddIngredient = (newIngredient) => {
    setIngredients([
      ...ingredients,
      {
        id: ingredients.length + 1,
        ...newIngredient,
      },
    ])
    setDialogOpen(false)
  }

  const handleEditIngredient = (updatedIngredient) => {
    setIngredients(
      ingredients.map((ingredient) => (ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient)),
    )
    setEditDialogOpen(false)
  }

  const handleDeleteIngredient = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id))
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
            <Link href="/meals" className="text-muted-foreground hover:text-foreground">
              Meals
            </Link>
            <Link href="/ingredients" className="font-medium">
              Ingredients
            </Link>
            <Link href="/costs" className="text-muted-foreground hover:text-foreground">
              Costs
            </Link>
          </nav>
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Ingredient
          </Button>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Ingredients</h2>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[250px]"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead className="text-right">Price (R$)</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIngredients.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell className="font-medium">{ingredient.name}</TableCell>
                  <TableCell>{ingredient.unit}</TableCell>
                  <TableCell className="text-right">{ingredient.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    {ingredient.stock} {ingredient.unit}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedIngredient(ingredient)
                            setEditDialogOpen(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteIngredient(ingredient.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      <AddIngredientDialog open={dialogOpen} onOpenChange={setDialogOpen} onAddIngredient={handleAddIngredient} />
      <EditIngredientDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onEditIngredient={handleEditIngredient}
        ingredientToEdit={selectedIngredient}
      />
    </div>
  )
}
