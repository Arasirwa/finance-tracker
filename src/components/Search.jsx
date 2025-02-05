export default function Search(props) {
  return (
    <nav className="bg-white p-4 shadow-md rounded-lg flex flex-wrap justify-between items-center gap-4">
      <div className="flex items-center text-xl font-bold text-gray-800">
        <span>Finance Tracker</span>
      </div>

      <div className="flex items-center bg-gray-100 p-2 rounded-lg w-full md:w-1/3">
        <input
          type="text"
          placeholder="Search Expenditure..."
          className="bg-transparent w-full outline-none"
          value={props.searchQuery} // Bind search query to input
          onChange={(e) => props.handleSearch(e.target.value)}
        />
      </div>
    </nav>
  );
}
