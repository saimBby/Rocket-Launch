import React, { useState, useEffect } from 'react'

import { useAuthContext } from '../hooks/useAuthContext'
import { BiError } from "react-icons/bi"
import { Link } from "react-router-dom"

import { useNavigate } from 'react-router-dom'

function Login() {
    const { user } = useAuthContext()
    const { dispatch } = useAuthContext()

    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [finalPassword, setFinalPassword] = useState("");

    const navigate = useNavigate()

    const [errorresponse, setResponse] = useState({ ok: false, data: "", error: "" });

    const handleSubmit = async (e) => {
        e.preventDefault()

       
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, password })
              })
              const json = await response.json()
          
              if (!response.ok) {
                setResponse({ ok: false, data: "", error: json.error })
              }
              
              if (response.ok) {
                localStorage.setItem('user', JSON.stringify(json))

                // update the auth context
                dispatch({type: 'LOGIN', payload: json})
                navigate("/Paymentcheckout")
              }
      
            // Hier kannst du die Logik für das Absenden des Formulars implementieren
          
    } 

    const [isFilled, setIsFilled] = useState(false);

    const handleInputChange = (e, setValue) => {
      setValue(e.target.value);
    };
  
    const checkFormFilled = () => {
      if (email && password) {
        setIsFilled(true);
      } else {
        setIsFilled(false);
      }
    };

    return (
        <form onSubmit={handleSubmit}>
                <div className="flex h-screen bg-gradient-to-b from-rose-500 via-pink-300 to-purple-500 p-6">
                    <div className="flex h-full w-full bg-[#F7F7F7]/50  p-4 rounded-xl">
                        <div className="flex flex-col p-2 border-2 border-[#F7F7F7] w-full rounded-xl">
                            <div className="flex justify-center mb-2 p-2">
                                
                            </div>

                            <div className="flex-1 flex-col p-2 items-center">
                                <div className="flex justify-center">
                                    <h1 className="text-3xl font-bold text-pink-500">
                                        Sign in
                                    </h1>
                                </div>

                                <div className="flex justify-center">
                                    <h1 className="text-2xl font-semibold text-blue-700">
                                        & get early access
                                    </h1>
                                </div>

                                <div className="flex justify-center mt-2">
                                    <div className="flex flex-col">
                                        <div className="flex justify-center">
                                            <h1 className="font-semibold text-blue-800">
                                                Do you have an account?
                                            </h1>
                                            <Link to="/signup" className="font-semibold text-pink-500 ml-2">
                                                Sign up
                                            </Link>
                                        </div>
                                        
                                        <div className="flex justify-center p-2 w-full">
                                            <div className="flex flex-col w-full">
                                                <input
                                                    type="email"
                                                    placeholder="Email"
                                                    className="p-4 w-full mb-2 rounded-2xl mt-4"
                                                    onChange={(e) => {
                                                    handleInputChange(e, setEmail);
                                                    checkFormFilled();
                                                    }}
                                                />

                                                <input
                                                    type="password"
                                                    placeholder="Password"
                                                    className="p-4 w-full mb-2 rounded-2xl mt-4"
                                                    onChange={(e) => {
                                                    handleInputChange(e, setPassword);
                                                    checkFormFilled();
                                                    }}
                                                />

                                                <button
                                                    className={`w-full p-3 mt-4 rounded-2xl font-bold ${
                                                    isFilled ? 'bg-pink-500 text-white' : 'bg-pink-500/20 text-white glass-effect'
                                                    }`}
                                                    onClick={handleSubmit}
                                                >
                                                    Sign in
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {errorresponse.error && (
                                <div className="flex justify-end">
                                    <div className="static">
                                        <div className="absolute bottom-5 right-5 bg-[#FF1493] p-2 rounded-2xl text-white font-bold">
                                            <div className="flex justify-between">

                                                <div className="flex justify-center">
                                                    <BiError className="text-2xl mt-1"></BiError>
                                                </div>

                                                <div className="flex justify-center">
                                                    <span className="mr-2 ml-4 mt-0.5">{errorresponse.error}</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
    )
}

export default Login