import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../authSlice';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { name, email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      alert(message); // You can replace this with a better notification 
    }
    if (isSuccess || user) {
      navigate('/'); // Redirect to homepage after successful registration
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Form inputs are the same as before */}
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email Address"
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          className="w-full p-3 border rounded-lg"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Register;