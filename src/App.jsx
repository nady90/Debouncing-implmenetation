import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [numbers, setNumbers] = useState([1, 2, 3]);
  const [debounceNumbers, setDebounceNumbers] = useState([1, 2, 3]);
  const [throttleNumbers, setThrottleNumbers] = useState([1, 2, 3]);
  const [debounceTime, setDebounceTime] = useState(1000);
  const [shouldWait, setShouldWait] = useState(false); // Same solution without the need for useRef. You can persist a value through useState.
  const [shouldThrottleWait, setShouldThrottleWait] = useState(false);

  const throttleFn = (fn, time) => {
    if (shouldThrottleWait) {
      return;
    }

    fn();
    setShouldThrottleWait(true);

    setTimeout(() => {
      setShouldThrottleWait(false);
    }, time);
  };

  const handleThrottleClick = () => {
    throttleFn(() => {
      setThrottleNumbers([
        ...throttleNumbers,
        throttleNumbers[throttleNumbers.length - 1] + 1,
      ]);
    }, debounceTime);
  };

  let timer;
  const debounceFn = (fn, time) => {
    if (!shouldWait) {
      fn();
      setShouldWait(true);
      return;
    }

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
    setThrottleNumbers([1, 2, 3]);
    setShouldWait(false);
    setShouldThrottleWait(false);
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
        <button
          onClick={() => {
            handleThrottleClick();
          }}
          className="throttle-btn"
        >
          Throttle Button
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

        <div className="throttle-list">
          <span>Throttle List: </span>
          {throttleNumbers.map((number) => {
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
