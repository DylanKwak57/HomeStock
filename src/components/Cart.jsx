const BASE = import.meta.env.BASE_URL

export default function Cart({ items, onAdd, onSubtract, onRemove, onSubmit, onBack }) {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-[430px] mx-auto min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-brown-800 px-5 py-4 flex items-center gap-3">
          <button onClick={onBack} className="bg-transparent border-none text-xl cursor-pointer p-1 text-cream">
            ←
          </button>
          <span className="text-lg font-semibold text-cream">รายการ ({items.length})</span>
        </div>

        {/* Items */}
        <div className="p-4 pb-28">
          {items.map((item) => (
            <div key={item.id} className="flex items-center bg-white rounded-xl p-3.5 mb-2.5 gap-3 shadow-sm">
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-white flex-shrink-0">
                <img
                  src={`${BASE}${item.photo}`}
                  alt={item.name}
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-brown-700 leading-snug line-clamp-2">{item.name}</div>
              </div>
              {/* Quantity controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onSubtract(item.id)}
                  className="w-8 h-8 rounded-full border border-brown-200 bg-transparent text-brown-500 text-lg font-bold cursor-pointer flex items-center justify-center active:bg-cream-dark transition-colors"
                >
                  −
                </button>
                <span className="w-6 text-center text-base font-bold text-brown-700">{item.qty}</span>
                <button
                  onClick={() => onAdd(item.id)}
                  className="w-8 h-8 rounded-full border border-brown-200 bg-transparent text-brown-500 text-lg font-bold cursor-pointer flex items-center justify-center active:bg-cream-dark transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="bg-transparent border-none w-8 h-8 flex items-center justify-center text-base cursor-pointer text-brown-200 hover:text-brown-500 transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="fixed bottom-0 left-0 right-0 z-20 pointer-events-none">
          <div className="max-w-[430px] mx-auto p-4 pointer-events-auto bg-cream/90 backdrop-blur-sm">
            <button
              onClick={onSubmit}
              className="w-full py-4 rounded-2xl border-none bg-brown-800 text-cream text-lg font-semibold cursor-pointer tracking-wide active:scale-[0.98] transition-transform shadow-[0_4px_24px_rgba(62,39,35,0.3)]"
            >
              ส่งรายการ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
