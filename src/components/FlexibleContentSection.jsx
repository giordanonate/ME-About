export default function FlexibleContentSection({ content = [] }) {
  return (
    <section className="bg-black py-24 h-[100vh] flex items-center">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-12 items-center px-6">
        {content.map((item, index) => (
          <div key={index} className="text-white space-y-6">
            <img
              src={item.imageSrc}
              alt={item.title}
              className="w-full max-w-sm mx-auto rounded-xl shadow-lg"
            />
            <h2 className="text-2xl font-bold text-center">{item.title}</h2>
            <p className="text-lg text-gray-300 text-center">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
