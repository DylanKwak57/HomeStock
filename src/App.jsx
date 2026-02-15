import { useState } from 'react'
import CategoryTabs from './components/CategoryTabs'
import ItemGrid from './components/ItemGrid'
import Cart from './components/Cart'
import SuccessScreen from './components/SuccessScreen'
import { useCart } from './hooks/useCart'

const WEBHOOK_URL = '' // n8n webhook URL - Phase 3에서 설정

export default function App() {
  const [activeCategory, setActiveCategory] = useState('laundry')
  const [view, setView] = useState('main') // main | cart | success
  const { add, subtract, remove, clear, getQty, isSelected, totalItems, uniqueCount, getSelectedItems } = useCart()

  const handleSubmit = async () => {
    const items = getSelectedItems()

    if (WEBHOOK_URL) {
      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map((i) => ({ id: i.id, name: i.name, name_ko: i.name_ko, qty: i.qty })),
            timestamp: new Date().toISOString(),
          }),
        })
      } catch {
        // 오프라인 시에도 성공 화면 표시
      }
    }

    setView('success')
    setTimeout(() => {
      setView('main')
      clear()
    }, 3000)
  }

  if (view === 'success') return <SuccessScreen />

  if (view === 'cart') {
    return (
      <Cart
        items={getSelectedItems()}
        onAdd={add}
        onSubtract={subtract}
        onRemove={remove}
        onSubmit={handleSubmit}
        onBack={() => setView('main')}
      />
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-[430px] mx-auto min-h-screen bg-cream relative">
        {/* Header */}
        <div className="bg-brown-800 text-cream px-6 pt-12 pb-5">
          <div className="text-2xl font-bold tracking-tight">สั่งของใช้ในบ้าน</div>
          <div className="text-sm text-brown-200 mt-1">เลือกของที่หมด แล้วกดส่ง</div>
        </div>

        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
        <ItemGrid
          category={activeCategory}
          isSelected={isSelected}
          getQty={getQty}
          onAdd={add}
          onSubtract={subtract}
        />

        {/* Floating Cart Button */}
        {uniqueCount > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-20 pointer-events-none">
            <div className="max-w-[430px] mx-auto p-4 pointer-events-auto">
              <button
                onClick={() => setView('cart')}
                className="w-full py-4 rounded-2xl border-none bg-brown-800 text-cream text-lg font-semibold cursor-pointer flex items-center justify-center gap-3 shadow-[0_4px_24px_rgba(62,39,35,0.3)] active:scale-[0.98] transition-transform"
              >
                <span className="text-xl">ดูรายการ</span>
                <span className="bg-accent text-brown-800 text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center">{totalItems}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
