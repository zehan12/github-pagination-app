import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const fetchRepos = async (tag) => {
    const res = await axios.get(
      `https://api.github.com/search/repositories?q=stars:%3E1+language:${tag}&sort=stars&order=desc&type=Repositories`
    );

    setRepositories(res.data.items);
    setTotalCount(res.data.total_count);
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <div className="w-full h-[100vh] bg-gray-900 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-teal-600">
        <b className="text-pink-500">Github</b> Pagination App
      </h1>
      <div className=" w-4/12 h-3/6 m-10  overflow-y-auto overflow-x-hidden  text-white scroll-smooth scrollbar-thumb-gray-400 scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track">
        {repositories &&
          repositories.map(({ id, name, owner, description }) => (
            <div key={id} className="flex m-2 p-2 items-center gap-2 rounded-lg cursor-pointer bg-teal-600">
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
        <button className="bg-teal-600 text-black font-medium rounded-full h-9 w-9 text-3xl">
          {"<"}
        </button>
        <p>Page</p> | <p>Total Results{" " + totalCount}</p>
        <button className="bg-teal-600 text-black font-medium rounded-full h-9 w-9 text-3xl">
          {">"}
        </button>
      </div>
    </div>
  );
}

export default App;
