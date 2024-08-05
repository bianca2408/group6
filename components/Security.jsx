import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Security.css'; 
import SearchBar from './SearchBar';

const Security = () => {
  const [filterStatus, setFilterStatus] = useState('');
  const [data, setData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('data.json'); 
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredData = filterStatus ? data.filter(item => item.bstatus === filterStatus) : data;

  return (
    
    <div className="table-container">
      <SearchBar/>
      <div className='filter-bar-container'>
      <select className="filter-dropdown" onChange={handleFilterChange} value={filterStatus}>
        <option value="">Status (All)</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <select className="filter-dropdown" >
        <option value="">Settlement due in:</option>
        <option value="five_days">5 days</option>
        <option value="ten_days">10 days</option>
      </select>

      <select className="filter-dropdown" >
        <option value="">Settlement due in:</option>
        <option value="last_five_days">Last 5 days</option>
        <option value="next_five_days">Next 5 days</option>
      </select>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ISIN</th>
            <th>CUSIP</th>
            <th>Issuer name</th>
            <th>Maturity date</th>
            <th>Coupon</th>
            <th>Btype</th>
            <th>Currency</th>
            <th>Face Value</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data) => (
            <tr key={data.securityId}>
              <td>{data.isin}</td>
              <td>{data.cusip}</td>
              <td>{data.issuer_name}</td>
              <td>{data.maturity_date}</td>
              <td>{data.coupon}</td>
              <td>{data.btype}</td>
              <td>{data.currency}</td>
              <td>{data.face_value}</td>
              <td>{data.bstatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Security;
