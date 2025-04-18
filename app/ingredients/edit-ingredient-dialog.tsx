"use client"

import { useEffect, useState } from "react"

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

export function EditIngredientDialog({ open, onOpenChange, onEditIngredient, ingredientToEdit }) {
  const [ingredient, setIngredient] = useState({
    name: "",
    unit: "kg",
    price: "",
    stock: "",
  })

  // Update the form when the ingredient to edit changes
  useEffect(() => {
    if (ingredientToEdit) {
      setIngredient({
        name: ingredientToEdit.name,
        unit: ingredientToEdit.unit,
        price: ingredientToEdit.price.toString(),
        stock: ingredientToEdit.stock.toString(),
      })
    }
  }, [ingredientToEdit])

  const handleChange = (field, value) => {
    setIngredient({ ...ingredient, [field]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onEditIngredient({
      id: ingredientToEdit.id,
      ...ingredient,
      price: Number.parseFloat(ingredient.price),
      stock: Number.parseFloat(ingredient.stock),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Ingredient</DialogTitle>
            <DialogDescription>Update the ingredient details. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                value={ingredient.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-unit" className="text-right">
                Unit
              </Label>
              <Select value={ingredient.unit} onValueChange={(value) => handleChange("unit", value)}>
                <SelectTrigger id="edit-unit" className="col-span-3">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kilogram (kg)</SelectItem>
                  <SelectItem value="g">Gram (g)</SelectItem>
                  <SelectItem value="L">Liter (L)</SelectItem>
                  <SelectItem value="ml">Milliliter (ml)</SelectItem>
                  <SelectItem value="unit">Unit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-price" className="text-right">
                Price (R$)
              </Label>
              <Input
                id="edit-price"
                type="number"
                step="0.01"
                min="0"
                value={ingredient.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-stock" className="text-right">
                Stock
              </Label>
              <Input
                id="edit-stock"
                type="number"
                step="0.01"
                min="0"
                value={ingredient.stock}
                onChange={(e) => handleChange("stock", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
