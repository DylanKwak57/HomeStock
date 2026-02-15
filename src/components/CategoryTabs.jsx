import { CATEGORIES } from '../data/items'

export default function CategoryTabs({ active, onChange }) {
  return (
    <div className="flex overflow-x-auto bg-cream-dark px-1 py-2 sticky top-0 z-10 gap-0.5" style={{ WebkitOverflowScrolling: 'touch' }}>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`flex-shrink-0 flex flex-col items-center py-2 px-2.5 border-none rounded-xl transition-all cursor-pointer ${
            active === cat.id
              ? 'bg-brown-800'
              : 'bg-transparent'
          }`}
        >
          <span className="text-xl">{cat.icon}</span>
          <span className={`text-[9px] mt-0.5 whitespace-nowrap ${
            active === cat.id ? 'font-bold text-cream' : 'font-medium text-brown-400'
          }`}>
            {cat.label}
          </span>
        </button>
      ))}
    </div>
  )
}
