import React, { useState, useEffect, useContext, useRef, useCallback, useMemo } from 'react';

// Creating a context
const ThemeContext = React.createContext();

function App() {
  const [count, setCount] = useState(0); // useState
  const [theme, setTheme] = useState('light'); // useState
  const inputRef = useRef(null); // useRef
  const list = [1, 2, 3, 4, 5];

  useEffect(() => {
    document.title = `Count: ${count}`; // useEffect
  }, [count]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const handleClick = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  const expensiveValue = useMemo(() => {
    console.log('Calculating expensive value...');
    return list.reduce((acc, curr) => acc + curr, 0);
  }, [list]);

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`bg-${theme === 'light' ? 'white' : 'gray-800'} text-${theme === 'light' ? 'black' : 'white'} min-h-screen flex items-center justify-center`}>
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-4">React Hooks Example</h1>
          <p>You clicked <span className="font-bold">{count}</span> times</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded mt-4" onClick={handleClick}>Increment</button>
          <button className="bg-blue-500 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded ml-2" onClick={toggleTheme}>Toggle Theme</button>
          <button className="bg-blue-500 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded ml-2" onClick={handleFocus}>Focus Input</button>
          <input ref={inputRef} type="text" className="border border-gray-300 mt-4 px-2 py-1 rounded" />
          <p className="mt-4">Expensive Value: {expensiveValue}</p>
          <ThemedButton />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext); // useContext
  return <button className={`bg-${theme === 'light' ? 'blue-500' : 'gray-500'} hover:bg-${theme === 'light' ? 'blue-600' : 'gray-600'} text-black font-bold py-2 px-4 rounded mt-4`}>{theme}</button>;
}

export default App;
