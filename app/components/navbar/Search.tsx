

const Search = () => {
  return (
    <div className=" hidden md:flex flex-1">
      <input className="px-3 py-2  border-none outline-none flex flex-1" type="text" placeholder="Arama Yap" />
      <button className="p-2 bg-orange-800 text-sm border border-transparent ">Ara</button>
    </div>
  )
}

export default Search