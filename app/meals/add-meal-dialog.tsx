"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample ingredients data - in a real app this would come from a database
const availableIngredients = [
  { id: 1, name: "Chicken Breast", unit: "g" },
  { id: 2, name: "Bread Rolls", unit: "unit" },
  { id: 3, name: "Lettuce", unit: "g" },
  { id: 4, name: "Tomato", unit: "g" },
  { id: 5, name: "Cheese", unit: "g" },
  { id: 6, name: "Coffee", unit: "g" },
  { id: 7, name: "Milk", unit: "ml" },
  { id: 8, name: "Sugar", unit: "g" },
]

export function AddMealDialog({ open, onOpenChange, onAddMeal, mealType }) {
  const [meal, setMeal] = useState({
    name: "",
    servingsPerPerson: 1,
    ingredients: [],
  })

  const [selectedIngredient, setSelectedIngredient] = useState("")
  const [ingredientQuantity, setIngredientQuantity] = useState("")

  const handleChange = (field, value) => {
    setMeal({ ...meal, [field]: value })
  }

  const handleAddIngredient = () => {
    if (!selectedIngredient || !ingredientQuantity) return

    const ingredient = availableIngredients.find((i) => i.id === Number.parseInt(selectedIngredient))

    setMeal({
      ...meal,
      ingredients: [
        ...meal.ingredients,
        {
          id: ingredient.id,
          name: ingredient.name,
          quantity: Number.parseFloat(ingredientQuantity),
          unit: ingredient.unit,
        },
      ],
    })

    setSelectedIngredient("")
    setIngredientQuantity("")
  }

  const handleRemoveIngredient = (id) => {
    setMeal({
      ...meal,
      ingredients: meal.ingredients.filter((i) => i.id !== id),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddMeal({
      ...meal,
      servingsPerPerson: Number.parseInt(meal.servingsPerPerson),
    })
    setMeal({ name: "", servingsPerPerson: 1, ingredients: [] })
  }

  const mealTypeLabel = mealType === "breakfast" ? "Breakfast" : "Coffee Break"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New {mealTypeLabel} Item</DialogTitle>
            <DialogDescription>Add a new meal item with ingredients and serving size.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={meal.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="servings" className="text-right">
                Servings
              </Label>
              <Input
                id="servings"
                type="number"
                min="1"
                value={meal.servingsPerPerson}
                onChange={(e) => handleChange("servingsPerPerson", e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="border-t pt-4 mt-2">
              <h4 className="font-medium mb-2">Ingredients</h4>

              <div className="grid grid-cols-12 gap-2 mb-2">
                <div className="col-span-5">
                  <Select value={selectedIngredient} onValueChange={setSelectedIngredient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ingredient" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableIngredients.map((ingredient) => (
                        <SelectItem key={ingredient.id} value={ingredient.id.toString()}>
                          {ingredient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-5">
                  <div className="flex items-center">
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="Quantity"
                      value={ingredientQuantity}
                      onChange={(e) => setIngredientQuantity(e.target.value)}
                    />
                    <span className="ml-2 text-sm text-muted-foreground">
                      {selectedIngredient
                        ? availableIngredients.find((i) => i.id === Number.parseInt(selectedIngredient))?.unit
                        : "unit"}
                    </span>
                  </div>
                </div>
                <div className="col-span-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleAddIngredient}
                    disabled={!selectedIngredient || !ingredientQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                {meal.ingredients.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No ingredients added yet.</p>
                ) : (
                  meal.ingredients.map((ingredient) => (
                    <div key={ingredient.id} className="flex items-center justify-between bg-muted p-2 rounded-md">
                      <span>{ingredient.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          {ingredient.quantity} {ingredient.unit}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveIngredient(ingredient.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={meal.ingredients.length === 0}>
              Save Meal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
