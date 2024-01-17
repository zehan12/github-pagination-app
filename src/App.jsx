import "./App.css";

function App() {
  return (
    <div className="w-full h-[100vh] bg-gray-900 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-teal-600">
        <b className="text-pink-500">Github</b> Pagination App
      </h1>
      <div className=" w-4/12 h-96 border-2 m-10"></div>
      <div className="flex items-center text-white gap-7">
        <button className="bg-teal-600 text-black font-medium rounded-full h-10 w-10 text-3xl">
          {"<"}
        </button>
        <p>Page</p> | <p>Results</p>
        <button className="bg-teal-600 text-black font-medium rounded-full h-10 w-10 text-3xl">
          {">"}
        </button>
      </div>
    </div>
  );
}

export default App;
