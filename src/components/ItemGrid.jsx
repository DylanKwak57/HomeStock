import { ITEMS } from '../data/items'

const BASE = import.meta.env.BASE_URL

export default function ItemGrid({ category, isSelected, getQty, onAdd, onSubtract }) {
  const items = ITEMS[category] || []

  return (
    <div className="grid grid-cols-3 gap-3 p-4 pb-28">
      {items.map((item) => {
        const active = isSelected(item.id)
        const qty = getQty(item.id)
        return (
          <div key={item.id} className="relative">
            <button
              onClick={() => onAdd(item.id)}
              className={`w-full relative flex flex-col items-center pt-3 pb-2.5 px-2 rounded-2xl border-2 transition-all cursor-pointer active:scale-95 ${
                active
                  ? 'border-selected bg-selected/10 shadow-md'
                  : 'border-cream-dark bg-white/80 shadow-sm'
              }`}
            >
              {active && (
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-selected flex items-center justify-center text-white text-sm font-bold shadow">
                  {qty}
                </div>
              )}
              <div className="w-20 h-20 mb-1.5 rounded-xl overflow-hidden bg-cream-dark flex items-center justify-center">
                <img
                  src={`${BASE}${item.photo}`}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className={`text-[11px] text-center leading-snug line-clamp-2 ${
                active ? 'text-selected-dark font-bold' : 'text-brown-600 font-medium'
              }`}>
                {item.name}
              </span>
            </button>

            {/* Quantity controls */}
            {active && (
              <div className="flex items-center justify-center gap-1 mt-1.5">
                <button
                  onClick={() => onSubtract(item.id)}
                  className="w-8 h-8 rounded-full border border-brown-200 bg-white text-brown-500 text-lg font-bold cursor-pointer flex items-center justify-center active:bg-cream-dark transition-colors"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-bold text-brown-700">{qty}</span>
                <button
                  onClick={() => onAdd(item.id)}
                  className="w-8 h-8 rounded-full border border-selected bg-selected/10 text-selected-dark text-lg font-bold cursor-pointer flex items-center justify-center active:bg-selected/20 transition-colors"
                >
                  +
                </button>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
