export default function FlexibleContentSection({ columns = 2, content = [] }) {
  const columnCount = columns || content.length || 1
  const gridClass =
    columnCount === 1
      ? 'grid-cols-1'
      : columnCount === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : columnCount === 3
      ? 'grid-cols-1 md:grid-cols-3'
      : 'grid-cols-1 md:grid-cols-4'

  return (
    <section className="bg-black py-24 px-6">
      <div className={`max-w-7xl mx-auto grid ${gridClass} gap-12 items-start`}>
        {content.map((item, index) => (
          <div key={index} className="text-white space-y-6">
            <img src={item.imageSrc} alt={item.title} className="w-full rounded-xl shadow-lg" />
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <p className="text-lg text-gray-300">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
