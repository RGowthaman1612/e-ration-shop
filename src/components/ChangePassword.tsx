import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const ChangePassword = () => {
  const [cardId, setCardId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const clearInputs = () => {
    setCardId("");
    setPassword("");
    setConfirmPassword("");
  };

  const changePassword = async () => {
    if(password != confirmPassword){
        alert("New Password and Confirm New Password are not same");
        return;
    }
    try {
      const response = await axios.post('http://localhost:5555/api/cards/changePassword', { cardId, password });
      if (response.status === 200) {
        localStorage.setItem('cardId', JSON.stringify(response.data));
        alert("Password changed succesfully")
      } else if (response.status === 400) {
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
        alert("Change Password Failed.Please try again.");
      }
    } finally {
      clearInputs();
      navigate('/');
    }
  };
    return (
    <div className="container">
      <div className="header">
        <div className="text">Change Password</div>
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
            placeholder='New Password'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input">
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Confirm New Password'
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="submit-container">
        <div className="submit" onClick={() => { changePassword(); }}>Reset Password</div>
      </div>
    </div>
  )
}
