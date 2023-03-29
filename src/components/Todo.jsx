import { useState } from "react";
import { useEffect } from "react";

function Todo() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  function del(id) {
    setData(data.filter((item) => item.id !== id));
  }

  return (
    <div className='container'>
      <div className='text-center m-4'>Todos:</div>
      {loading ? (
        <div className='w-full h-screen absolute top-0 left-0 overflow-hidden bg-slate-900 flex flex-col justify-center text-center'>
          <span className='loading'>loading...</span>
        </div>
      ) : (
        <ul className='list-group'>
          {data.map((item, index) => {
            return (
              <li
                className='list-group-item d-flex aligin-item-center justify-content-between'
                key={index}
              >
                {item.title}
                <div
                  className={
                    item.completed
                      ? "cursor-pointer line-through text-green-500"
                      : "cursor-pointer"
                  }
                ></div>
                <button
                  className='btn btn-outline-danger'
                  onClick={() => del(item.id)}
                >
                  x
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Todo;
