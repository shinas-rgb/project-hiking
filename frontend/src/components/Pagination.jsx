
export default function Pagination({ page, setPage, totalPages }) {
  const end = page + 2 >= totalPages ? totalPages : page + 2
  const start = Math.max(page - 2, 1)
  const numbers = Array.from({ length: end - start + 1 }, (_, i) => start + i)
  console.log(start, end)
  numbers.map((num, index) => {
    console.log(num)
  })
  return (
    <>
      <button onClick={() => setPage(1)}
        className={`${page === 1 ? 'border-2 border-zinc-700 bg-zinc-800' : 'border-0'} text-white px-4 py-2 rounded-2xl hover:cursor-pointer`}
      >1</button>
      {page > 3 && (
        <p className="text-white">...</p>
      )}
      {numbers.map((number, index) => (
        <>
          {number !== 1 && number !== totalPages && (
            <button onClick={() => setPage(number)}
              className={`${page === number ? 'border-2 border-zinc-700 bg-zinc-800' : 'border-0'} text-white px-4 py-2 rounded-2xl hover:cursor-pointer`}
            >{number}</button>
          )}
        </>
      ))}
      {page < totalPages - 3 && (
        <p className="text-white">...</p>
      )}
      <button onClick={() => setPage(totalPages)}
        className={`${page === totalPages ? 'border-2 border-zinc-700 bg-zinc-800' : 'border-0'} text-white px-4 py-2 rounded-2xl hover:cursor-pointer`}
      >{totalPages}</button>
    </>
  )
}
