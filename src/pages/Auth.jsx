import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Auth = () => {

  const { login, signup, aseanCountries } = useAppContext();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("my");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      const success = login(name, password);

      if (!success) {
        setError("Invalid username or password");
      }

    } else {
      if (!name || !password) {
        setError("Please fill all fields");
        return;
      }

      signup(name, country, password);
    }
  };

  return (
    <div style={{maxWidth:400,margin:"80px auto",padding:20}}>

      <h2 style={{textAlign:"center"}}>EcoWatch</h2>

      <div style={{display:"flex",justifyContent:"center",gap:10,marginBottom:20}}>
        <button onClick={()=>setIsLogin(true)}>Login</button>
        <button onClick={()=>setIsLogin(false)}>Sign Up</button>
      </div>

      <form onSubmit={handleSubmit}>

        <div style={{marginBottom:10}}>
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            style={{width:"100%",padding:10}}
          />
        </div>

        {!isLogin && (
          <div style={{marginBottom:10}}>
            <select
              value={country}
              onChange={(e)=>setCountry(e.target.value)}
              style={{width:"100%",padding:10}}
            >
              {aseanCountries.map(c=>(
                <option key={c.id} value={c.id}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div style={{marginBottom:10}}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={{width:"100%",padding:10}}
          />
        </div>

        {error && (
          <div style={{color:"red",marginBottom:10}}>
            {error}
          </div>
        )}

        <button style={{width:"100%",padding:10}}>
          {isLogin ? "Login" : "Create Account"}
        </button>

      </form>

    </div>
  );
};

export default Auth;