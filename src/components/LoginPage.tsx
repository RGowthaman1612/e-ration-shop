import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [cardId, setCardId] = useState("");
  const [password, setPassword] = useState("");
  const [action, setAction] = useState("Log In");
  const navigate = useNavigate();
  const clearInputs = () => {
    setCardId("");
    setPassword("");
  };

  const loginSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5555/api/cards/login', { cardId, password });
      if(response.status===205){
        console.log(response.data);
        console.log(cardId);
        localStorage.setItem('cardId', JSON.stringify(response.data));
        navigate('/changePassword');
      }else if (response.status === 200) {
        localStorage.setItem('cardId', JSON.stringify(response.data));
        navigate('/home');
      } else if (response.status === 401) {
        alert("Invalid Credentials");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response ? error.response.status : "Network Error";
        console.error("Error during login:", status);
        if (status === 401) {
          alert("Invalid Credentials");
        }
      } else {
        alert("Login failed. Please try again.");
      }
    } finally {
      clearInputs();
    }
  };
  
  

  // const signUpSubmit = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:5555/api/cards/signup', { cardId, password });
  //     console.log(response.data);
  //     console.log("Signed up successfully");
  //     setAction("Log In");
  //   } catch (error) {
  //     console.error("Error during signup", error);
  //   }
  //   clearInputs();
  // };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input
            type='text'
            name='cardId'
            id='cardId'
            placeholder='Card ID'
            value={cardId}
            required
            onChange={(e) => setCardId(e.target.value)}
          />
        </div>
        <div className="input">
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="forgot-password">
        Forgot Password?<span onClick={()=>navigate('/changePassword')}>Click Here</span>
      </div>
      <div className="submit-container">
        <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Log In"); loginSubmit(); }}>Log In</div>
      </div>
    </div>
  );
};
