import { useState, useCallback } from 'react'
import { ITEMS } from '../data/items'

export function useCart() {
  const [quantities, setQuantities] = useState({}) // { itemId: qty }

  const add = useCallback((itemId) => {
    setQuantities((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }))
  }, [])

  const subtract = useCallback((itemId) => {
    setQuantities((prev) => {
      const next = { ...prev }
      if (next[itemId] > 1) {
        next[itemId] -= 1
      } else {
        delete next[itemId]
      }
      return next
    })
  }, [])

  const remove = useCallback((itemId) => {
    setQuantities((prev) => {
      const next = { ...prev }
      delete next[itemId]
      return next
    })
  }, [])

  const clear = useCallback(() => setQuantities({}), [])

  const getQty = useCallback((id) => quantities[id] || 0, [quantities])
  const isSelected = useCallback((id) => !!quantities[id], [quantities])

  const totalItems = Object.values(quantities).reduce((sum, q) => sum + q, 0)
  const uniqueCount = Object.keys(quantities).length

  const getSelectedItems = useCallback(() => {
    const items = []
    Object.entries(ITEMS).forEach(([catId, catItems]) => {
      catItems.forEach((item) => {
        if (quantities[item.id]) {
          items.push({ ...item, category: catId, qty: quantities[item.id] })
        }
      })
    })
    return items
  }, [quantities])

  return { add, subtract, remove, clear, getQty, isSelected, totalItems, uniqueCount, getSelectedItems }
}
