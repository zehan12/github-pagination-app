import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchRepos = async (tag = "javascript", page = currentPage) => {
    const res = await axios.get(
      `https://api.github.com/search/repositories?q=stars:%3E1+language:${tag}&sort=stars&order=desc&type=Repositories&page=${page}`
    );
    console.log(res);
    setRepositories(res.data.items);
    setTotalCount(res.data.total_count);
  };

  const handlePrevious = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
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
      <div className=" md:w-4/12 h-3/6 m-10  overflow-y-auto overflow-x-hidden  text-white scroll-smooth scrollbar-thumb-gray-400 scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track">
        {repositories &&
          repositories.map(({ id, name, owner, description }) => (
            <div
              key={id}
              className="flex m-2 p-2 items-center gap-2 rounded-lg cursor-pointer bg-teal-600"
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
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default App;
