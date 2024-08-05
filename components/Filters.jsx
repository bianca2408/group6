import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './Filters.css';

const Filters = () => {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({
    isin: [],
    cusip: [],
    issuer: [],
    counterparty: [],
  });

  const [selectedIsin, setSelectedIsin] = useState(null);
  const [selectedCusip, setSelectedCusip] = useState(null);
  const [selectedIssuer, setSelectedIssuer] = useState(null);
  const [selectedCounterparty, setSelectedCounterparty] = useState(null);

  const [filteredData, setFilteredData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get('trades.json')
      .then(response => {
        const fetchedData = response.data;
        setData(fetchedData);
        setOptions({
          isin: [...new Set(fetchedData.map(item => item.isin))].map(value => ({ value, label: value })),
          cusip: [...new Set(fetchedData.map(item => item.cusip))].map(value => ({ value, label: value })),
          issuer: [...new Set(fetchedData.map(item => item.issuer_name))].map(value => ({ value, label: value })),
          counterparty: [...new Set(fetchedData.map(item => item.counterparty_name || ''))].map(value => ({ value, label: value })),
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleFilterChange = (selectedOption, { name }) => {
    switch (name) {
      case 'isin':
        setSelectedIsin(selectedOption);
        break;
      case 'cusip':
        setSelectedCusip(selectedOption);
        break;
      case 'issuer':
        setSelectedIssuer(selectedOption);
        break;
      case 'counterparty':
        setSelectedCounterparty(selectedOption);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = data.filter(item => {
      return (
        (selectedIsin ? item.isin === selectedIsin.value : true) &&
        (selectedCusip ? item.cusip === selectedCusip.value : true) &&
        (selectedIssuer ? item.issuer_name === selectedIssuer.value : true) &&
        (selectedCounterparty ? item.counterparty_name === selectedCounterparty.value : true)
      );
    });
    if (filtered.length === 0) {
      setErrorMessage('No results found matching the selected filters.');
    } else {
      setErrorMessage('');
    }
    setFilteredData(filtered);
  };

  return (
    <div className="filters-container">
      
      <h1>Filter Options</h1>
      <form className="filters-form" onSubmit={handleSubmit}>
        <div className="filter-group">
          <label htmlFor="isin">ISIN:</label>
          <Select
            name="isin"
            options={options.isin}
            value={selectedIsin}
            onChange={(option) => handleFilterChange(option, { name: 'isin' })}
            placeholder="Select ISIN"
            isClearable
          />
        </div>

        <div className="filter-group">
          <label htmlFor="cusip">CUSIP:</label>
          <Select
            name="cusip"
            options={options.cusip}
            value={selectedCusip}
            onChange={(option) => handleFilterChange(option, { name: 'cusip' })}
            placeholder="Select CUSIP"
            isClearable
          />
        </div>

        <div className="filter-group">
          <label htmlFor="issuer">Issuer Name:</label>
          <Select
            name="issuer"
            options={options.issuer}
            value={selectedIssuer}
            onChange={(option) => handleFilterChange(option, { name: 'issuer' })}
            placeholder="Select Issuer"
            isClearable
          />
        </div>

        <div className="filter-group">
          <label htmlFor="counterparty">Counterparty Name:</label>
          <Select
            name="counterparty"
            options={options.counterparty}
            value={selectedCounterparty}
            onChange={(option) => handleFilterChange(option, { name: 'counterparty' })}
            placeholder="Select Counterparty"
            isClearable
          />
        </div>

        <button type="submit" className="submit-button">Apply Filters</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <table className="data-table">
        <thead>
          <tr>
              <th>Book ID</th>
              <th>Book name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Trade ID</th>
              <th>Security ID</th>
              <th>ISIN</th>
              <th>CUSIP</th>
              <th>Issuer Name</th>
              <th>Counterparty ID</th>
              <th>Counterparty Name</th>
              <th>Quantity</th>
              <th>Unit price</th>
              <th>Currency</th>
              <th>Coupon</th>
              <th>Type</th>
              <th>Face Value</th>
              <th>Buy/Sell Indicator</th>
              <th>Trade Date</th>
              <th>Settlement Date</th>
              <th>Maturity date</th>
              <th>Status</th>

          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
              <tr key={item.trade_id}>
                <td>{item.book_id}</td>
                <td>{item.book_name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.trade_id}</td>
                <td>{item.security_id}</td>
                <td>{item.isin}</td>
                <td>{item.cusip}</td>
                <td>{item.issuer_name}</td>
                <td>{item.counterparty_id}</td>
                <td>{item.counterparty_name}</td>
                <td>{item.quantity}</td>
                <td>{item.unit_price}</td>
                <td>{item.currency}</td>
                <td>{item.coupon}</td>
                <td>{item.type}</td>
                <td>{item.face_value}</td>
                <td>{item.buy_sell_indicator}</td>
                <td>{item.trade_date}</td>
                <td>{item.settlement_date}</td>
                <td>{item.maturity_date}</td>
                <td>{item.status}</td>
              </tr>
            ))}

        </tbody>
      </table>
    </div>
  );
};

export default Filters;
