import { useEffect } from "react";
import { useState, useCallback, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [capsAllowed, setCapsAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  // Passsword Generator Method
  // useCallback is used to cache the function with keeping the result of the previous renders
  // useEffect is to run the method or event at the loading of the page.
  // useRef is used when u need the reference of an element.
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+={}[]`~";
    if (capsAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, capsAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    // Optimization
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // useEffect
  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numberAllowed, capsAllowed, passwordGenerator]);
  return (
    <>
      <section className="h-screen flex items-center justify-center">
        <div className="w-full max-w-2xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-100 mx-auto shadow-md rounded-lg px-4 py-6 my-8 text-white bg-gray-800 text-2xl text-center ">
          Password Generator
          <div className="flex shadow rounded-lg overflow-hidden mb-4 mt-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3 text-gray-500"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              className="bg-orange-500 text-white px-3 py-0.5 shrink-0 hover:bg-orange-700 active:bg-orange-300 "
              onClick={copyPassword}
            >
              copy
            </button>
          </div>
          <div className="flex text-sm gap-x-3">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={8}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label className="text-orange-500">Length:{length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultValue={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput" className="text-orange-500">
                Numbers
              </label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultValue={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput" className="text-orange-500">
                Characters
              </label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultValue={capsAllowed}
                id="capsInput"
                onChange={() => {
                  setCapsAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="capsInput" className="text-orange-500">
                Caps Alphabets
              </label>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
