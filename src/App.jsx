import React, { useEffect, useRef, useState } from "react"
import { useCallback } from "react"

function App() {
  const [length,setLength] = useState(0)
  const [password,setPassword]=useState("")
  const [numberallowed,setNumberallowed]=useState(false)
  const [charallowed,setCharallowed]=useState(false)

   const passwordref=useRef(null)
   
  const passwordgen=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (charallowed) str+="!@#$%^&*(){}[]"
    if (numberallowed) str+="1234567890"
    for (let i = 0; i <= length; i++) {
      const char = Math.floor(Math.random()*str.length +1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[numberallowed,charallowed,length,setPassword])


  const copy=useCallback(()=>{
    passwordref.current?.select()
    passwordref.current?.setSelectionRange(0,99)
    window.navigator.clipboard.writeText(password)
  },[password])
  
  
   
    useEffect(()=>{passwordgen()},[
      charallowed,numberallowed,length,passwordgen
    ])
  
  

  return (
    <>
    <div className='w-full max-w-lg mx-auto my-12 rounded-lg bg-white px-4 py-4  text-black shadow-lg '>
      <h3 className='text-center my-2 text-2xl '>Password Manager </h3>
     <div className='flex flex-shadow '>
      <input type="text"
      placeholder='Here is your password'
      value={password}
      readOnly
      ref={passwordref}
      

      className='w-full outline-gray-400 overflow-hidden py-1 px-2 rounded-l-lg'
       />
      <button className='outline-none bg-blue-900 px-5 py-1  text-white rounded-r-lg hover:bg-blue-300'
      onClick={copy}
       > Copy </button>
      </div>
     <div className='flex text-sm  gap-x-1 mt-6'>
       <div className='flex  items-center'>
           
            <input type="range" 
            className='gap-x-3 items-center cursor-pointer'
            onChange={(e)=>setLength(e.target.value)}
            min={6}
            max={100}
            value={length}/>
 <label  className='mx-3'> Length :{length}</label>
       </div>
       <div className='flex items-center gap-x-3'>
            <input type="checkbox" 
            defaultValue={charallowed}
            id="characterinput"
            onChange={()=>{setCharallowed((prev)=>!prev)}}/>
            <label htmlFor='characterinput'>Characters</label>
       </div>
       <div className='flex items-center gap-x-3 ml-2'>
            <input type="checkbox"
            onChange={()=>{setNumberallowed((prev)=>!prev)}}
            id="numbersinput" />
            <label htmlFor='numbersinput' >Numbers</label>
       </div>

     </div>
     </div>
    
    </>
  )
}

export default App
