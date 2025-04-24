import React, { useState } from 'react';
import axios from "axios";

const HousePriceForm = () => {

    const [sqft,setsqft]= useState('');
    const [bedrooms, setBedrooms]=useState('');
    const [bathrooms, setBathrooms]=useState('');
    const [loading, setLoading] = useState(false);
    const [predictedPrice,setPredictedPrice] = useState(null);   
    const [error, setError] = useState('');

    const handleSubmit = async (e)=> {
        e.preventDefault(); // Prevent page reload on form submission
        if (!sqft || !bedrooms || !bathrooms) {
            setError('Please fill in all fields');
            return;
          }
          if (sqft <= 0 || bedrooms <= 0 || bathrooms <= 0) {
            setError('Please enter positive numbers');
            return;
          }
          setError(''); // Clear any previous error message
          setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:8000/predict', {
                sqft : parseFloat(sqft),
                bedrooms : parseFloat (bedrooms),
                bathrooms : parseFloat(bathrooms)
            });
            setPredictedPrice(response.data.predicted_price);
        } catch (error) {
            setError('There was an error fetching the price. Please try again.')
        }
        finally {
            setLoading(false);
          }
    };

  return (
    <div className="form-container">
        <div className="wrapper">
        <h2>House Price Form</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Square Footage:</label>
                <input 
                    type="number"
                    value={sqft}
                    onChange={(e)=> setsqft(e.target.value)}
                    placeholder='Enter square footage'
                     required
                     min="1"
                />
            </div>
            <div>
                <label>Number of Bedrooms:</label>
                <input 
                  type="number" 
                  value = {bedrooms}
                  onChange={(e)=>setBedrooms(e.target.value)}
                  placeholder='Enter number of bedrooms'
                   required
                   min="1"
                />
            </div>
            <div>
                <label>Number of Bathrooms:</label>
                <input 
                    type="number" 
                    value={bathrooms}
                    onChange={(e)=>setBathrooms(e.target.value)}
                    placeholder='Enter number of bathrooms'
                     required
                    min="1"
                />
            </div>
            <button type='submit' disabled={loading}> {loading ? 'Estimating...' : 'Get Price Estimate'}</button>
        </form>
        <div class="drops">
    <div class="drop drop-1"></div>
    <div class="drop drop-2"></div>
    <div class="drop drop-3"></div>
    <div class="drop drop-4"></div>
    <div class="drop drop-5"></div>
  </div>
        {predictedPrice !== null && (
            <div className="result">
                <h3>Predicted Price : ${predictedPrice.toLocaleString()}</h3>
            </div>
        )}
        {error && <div className='error'>{error}</div>}
        </div>
       
    </div>
    
  )
}

export default HousePriceForm   