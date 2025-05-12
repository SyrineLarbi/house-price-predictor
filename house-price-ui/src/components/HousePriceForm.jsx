import React, { useState } from 'react';
import axios from "axios";

const HousePriceForm = () => {
  const [formData, setFormData] = useState({
    OverallQual: '',
    GrLivArea: '',
    GarageCars: '',
    TotalBsmtSF: '',
    YearBuilt: '',
    FullBath: '',
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      OverallQual,
      GrLivArea,
      GarageCars,
      TotalBsmtSF,
      YearBuilt,
      FullBath
    } = formData;

    if (
      !OverallQual || !GrLivArea || !GarageCars ||
      !TotalBsmtSF || !YearBuilt || !FullBath
    ) {
      setError('Please fill in all fields');
      return;
    }

    if (
      OverallQual <= 0 || GrLivArea <= 0 || GarageCars < 0 ||
      TotalBsmtSF < 0 || YearBuilt <= 0 || FullBath < 0
    ) {
      setError('Please enter valid positive numbers');
      return;
    }

    setError('');
    setLoading(true);
    setPrediction(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/predict', {
        OverallQual: parseInt(OverallQual),
        GrLivArea: parseFloat(GrLivArea),
        GarageCars: parseInt(GarageCars),
        TotalBsmtSF: parseFloat(TotalBsmtSF),
        YearBuilt: parseInt(YearBuilt),
        FullBath: parseInt(FullBath),
      });
      setPrediction(response.data.predicted_price);
    } catch (error) {
      setError('There was an error fetching the price. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="wrapper">
        <h2>House Price Form</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1" htmlFor={field}>
                {field}
              </label>
              <input
                type="number"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
          ))}
          <button type='submit' disabled={loading}>
            {loading ? 'Estimating...' : 'Get Price Estimate'}
          </button>
        </form>

        {prediction !== null && (
          <div className="result">
            <h3>Predicted Price: ${prediction.toFixed(2)}</h3>
          </div>
        )}
        {error && <div className='error'>{error}</div>}
      </div>
    </div>
  );
};

export default HousePriceForm;
