import { useCallback, useState, useEffect, useRef } from 'react'
import pwImg from '../src/assets/pw-img.png'

function App() {
  const [length, setlength] = useState(8)
  const [numbers, setNumbers] = useState(false)
  const [characters, setcharacters] = useState(false)
  const [password, setpassword] = useState('')

  const passwordRef = useRef(null)

  const GeneratePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numbers) str += "0123456789"
    if (characters) str += "!@#$%^&*()_+"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setpassword(pass)
  }, [length, numbers, characters])

  const copypasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 33)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    GeneratePassword()
  }, [length, numbers, characters, GeneratePassword])

  return (
    <div className="h-screen w-full flex bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <div className="w-1/2 flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 " />
        <img
          src={pwImg} 
          alt="Illustration"
          className="w-96 h-96 object-cover rounded-xl shadow-lg opacity-80"
        />
      </div>

      <div className="w-1/2 flex items-center justify-center p-6 relative">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 text-gray-200 border border-gray-500/20">
          <h1 className="text-3xl font-semibold text-center text-white mb-8">
            Password Generator
          </h1>

          <div className="flex items-center shadow-sm rounded-lg overflow-hidden mb-6 bg-gray-800/30">
            <input
              type="text"
              value={password}
              readOnly
              ref={passwordRef}
              className="w-full py-2 px-4 bg-transparent outline-none text-gray-300 placeholder-gray-500"
              placeholder="Password"
            />
            <button
              onClick={copypasswordtoClipboard}
              className="bg-blue-600 text-white px-4 py-2 font-medium"
            >
              Copy
            </button>
          </div>

          <div className="mb-6">
            <label className="text-lg font-medium text-gray-300">
              Length: <span className="text-white">{length}</span>
            </label>
            <input
              type="range"
              min={8}
              max={32}
              value={length}
              onChange={(e) => setlength(Number(e.target.value))}
              className="w-full cursor-pointer mt-2 bg-gray-700 accent-blue-500"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={numbers}
                onChange={() => setNumbers((prev) => !prev)}
                className="cursor-pointer accent-blue-500"
              />
              <label className="ml-2 text-lg font-medium text-gray-300">
                Include Numbers
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={characters}
                onChange={() => setcharacters((prev) => !prev)}
                className="cursor-pointer accent-blue-500"
              />
              <label className="ml-2 text-lg font-medium text-gray-300">
                Include Special Characters
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
    </div>
  )
}

export default App
