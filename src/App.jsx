import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [numbers, setNumbers] = useState([1, 2, 3]);
  const [debounceNumbers, setDebounceNumbers] = useState([1, 2, 3]);
  const [debounceTime, setDebounceTime] = useState(1000);

  let timer;
  const debounceFn = (fn, time) => {
    clearTimeout(timer);
    timer = setTimeout(fn, time);
  };

  const handleDebounceClick = () => {
    console.log("clicked");
    debounceFn(() => {
      setDebounceNumbers([
        ...debounceNumbers,
        debounceNumbers[debounceNumbers.length - 1] + 1,
      ]);
    }, debounceTime);
    console.log(debounceNumbers);
  };

  const handleDebounceTimeChange = (event) => {
    setDebounceTime(event.target.value);
  };

  const handleNormalClick = () => {
    setNumbers([...numbers, numbers[numbers.length - 1] + 1]);
  };

  const resetLists = () => {
    setNumbers([1, 2, 3]);
    setDebounceNumbers([1, 2, 3]);
  };

  return (
    <div className="container">
      <h2>Explanation:</h2>
      <ul>
        <li>We are Starting with a list that has 1, 2, 3</li>
        <li>
          When you click on the red button a number will be added as soon as you
          click. Easy behaviour to understand.
        </li>
        <li>
          However: when you click on the blue button it will debounce the event
          and only fire once every{" "}
          <input
            onChange={handleDebounceTimeChange}
            type="number"
            name="number"
            id="number-input"
            min={0}
            max={10000}
            step={100}
            defaultValue={debounceTime}
          />
        </li>
      </ul>

      <div className="buttons-container">
        <button
          onClick={() => {
            handleNormalClick();
          }}
          className="normal-btn"
        >
          Normal Button
        </button>
        <button
          onClick={() => {
            handleDebounceClick();
          }}
          className="debounce-btn"
        >
          Debounce Button
        </button>
      </div>
      <div className="lists-container">
        <div className="normal-list">
          <span>Normal List: </span>
          {numbers.map((number) => {
            return <span key={number}>{`${number} - `}</span>;
          })}
        </div>

        <div className="debounce-list">
          <span>Debounce List: </span>
          {debounceNumbers.map((number) => {
            return <span key={number}>{`${number} - `}</span>;
          })}
        </div>
        <button onClick={resetLists} className="clear-lists">
          Reset Lists
        </button>
      </div>
    </div>
  );
}

export default App;
