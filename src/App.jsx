import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [localStorageItem, setLocalStorageItem] = useState(
    JSON.parse(localStorage.getItem("repositories"))
  );

  const itemsPerPage = 8;

  const calculateIndexes = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return { startIndex };
  };

  const { startIndex } = calculateIndexes();

  const fetchRepos = async (tag = "javascript", page = currentPage) => {
    try {
      setLoading(true);
      setRepositories([]);
      const res = await axios.get(
        `https://api.github.com/search/repositories?q=stars:%3E1+language:${tag}&sort=stars&order=desc&type=Repositories&page=${page}&offset=${itemsPerPage}`
      );
      console.log(res);
      setRepositories(res.data.items);
      setTotalCount(res.data.total_count);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePrevious = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (startIndex + itemsPerPage < totalCount) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleItemClicked = (id) => {
    let array = localStorageItem ? [...localStorageItem] : [];

    const index = array.findIndex((item) => item === id);

    if (index !== -1) {
      array.splice(index, 1);
    } else {
      if (!array.includes(id)) array.push(id);
    }

    localStorage.setItem("repositories", JSON.stringify(array));
    setLocalStorageItem(array);
  };

  const handleResetLocalStorage = () => {
    // Clear the localStorage
    localStorage.removeItem("repositories");
    // Update the state to reflect the empty array
    setLocalStorageItem([]);
  };

  useEffect(() => {
    fetchRepos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchRepos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className="w-full h-[100vh] bg-gray-900 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-teal-600">
        <b className="text-pink-500">Github</b> Pagination App
      </h1>
      <div className="md:w-4/12 h-3/6 m-10 overflow-y-auto overflow-x-hidden text-white scroll-smooth scrollbar-thumb-gray-400 scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track">
        {repositories.length !== 0 &&
          repositories.slice(0, 7).map(({ id, name, owner, description }) => (
            <div
              onClick={() => handleItemClicked(id)}
              key={id}
              className={`flex m-2 p-2 items-center gap-2 rounded-lg cursor-pointer ${
                localStorageItem.includes(id) ? "bg-pink-500" : "bg-teal-600"
              }`}
            >
              <img
                className="align-middle m-2 w-12 h-12 rounded-full"
                src={owner.avatar_url}
                alt={id}
              />
              <div className="flex flex-col">
                <h4 className=" font-bold truncate text-wrap">{name}</h4>
                <p className="truncate line-clamp-1 text-wrap">{description}</p>
              </div>
            </div>
          ))}
        {loading &&
          repositories.length === 0 &&
          Array.from({ length: 7 }, (x, i) => i).map((_) => (
            <div
              key={_}
              className="flex m-2 h-20 p-2 items-center gap-2 rounded-lg cursor-pointer bg-gray-200/15 animate-pulse"
            ></div>
          ))}
      </div>
      <div className="flex items-center text-white gap-4">
        <button
          onClick={handlePrevious}
          className="bg-teal-600 text-black font-medium rounded-full h-9 w-9 text-3xl disabled:bg-gray-400"
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <p>Page {" " + currentPage}</p> | <p>Total Results{" " + totalCount}</p>
        <button
          onClick={handleNext}
          className="bg-teal-600 text-black font-medium rounded-full h-9 w-9 text-3xl"
          disabled={startIndex + itemsPerPage >= totalCount}
        >
          {">"}
        </button>
      </div>
      <button className="m-5 px-2 py-1 shadow-2xl text-sm rounded-lg font-sans text-white bg-red-600" onClick={handleResetLocalStorage}>Reset LocalStorage</button>
    </div>
  );
}

export default App;
