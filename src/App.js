import "./App.css";
import React, { useState, useRef, useEffect } from "react";

function App() {
  const [value, setValue] = useState("");
  const [edit, setEdit] = useState("");
  const [array, setArray] = useState([]);
  const [action, setAction] = useState(true);

  const editRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.length <= 1) {
      throw alert("You need to enter something...");
    }

    let details = {
      mainId: Math.floor(Math.random() * 1000),
      list: value,
      state: true,
    };
    setArray((info) => [...info, details]);
    setValue("");
  };

  const deleteBtn = (id) => {
    let test = array.filter(({ mainId }) => mainId !== id);
    setArray(test);
  };

  const editBtn = (id) => {
    if (!edit.length < 1) {
      let changeInfo = array.filter(({ mainId }) => mainId === id);
      changeInfo.map((info) => {
        if (info.mainId === id) {
          info.list = edit;
        }
        return info;
      });
      editRef.current.value = "";
      setEdit("");
    } else {
      setEdit("");
      return edit;
    }
  };

  useEffect(() => {}, [action]);

  const displayInput = (id) => {
    let test = array.filter((info) => {
      if (info.mainId === id) {
        info.state = !info.state;
        setAction(info.state);
      }
    });

    return test;
  };

  function postInfo() {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: array,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  return (
    <div>
      <div className="headerContainer">
        <h2>My TODO List</h2>
      </div>
      <div className="inputContainer">
        <form onSubmit={handleSubmit}>
          <input
            className="displayInput"
            placeholder="Enter some text"
            type="text"
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
          />
          <button onClick={() => postInfo()} className="mainBtn">
            Submit
          </button>
        </form>
      </div>

      <div className="displayWrapper ">
        <ul>
          {array.map(({ list, mainId, state }, id) => (
            <div className="listContainer" key={id}>
              <div className="listWrapper">
                <li className="listItem">{list}</li>
              </div>

              <div className="btnWrapper">
                <button onClick={() => deleteBtn(mainId)} className="mainBtnD">
                  Delete
                </button>
                <button
                  className="mainBtnE"
                  value={edit}
                  onClick={(e) => {
                    editBtn(mainId);
                    displayInput(mainId);
                  }}
                >
                  Edit
                </button>
                {state ? (
                  ""
                ) : (
                  <input
                    className={state ? "noDisplay" : "displayInputTwo"}
                    ref={editRef}
                    type="text"
                    placeholder="Edit what is given"
                    onChange={(e) => {
                      setEdit(e.target.value);
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
