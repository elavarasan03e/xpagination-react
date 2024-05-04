import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';

function App() {
  const [employeeData,setEmployeeData] =useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);


  useEffect(()=>{
    fetchEMployeeDetails();
  },[])

  const fetchEMployeeDetails=()=>{
    try {
      fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch data');
          }
          return res.json();
        })
        .then(data => setEmployeeData(data))
        .catch(err => {
          console.error(err);
          alert('Failed to fetch data');
        });
    } catch (error) {
      console.error(error);
      alert('Failed to fetch data');
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employeeData.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  }

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <div className='table-container'>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
        
          {currentItems.map(employee=>(
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr> 
          ))}
        </tbody>
      </table>
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1} className="button">Previous</button>
        <span>   {currentPage}     </span>
        <button onClick={nextPage} disabled={currentItems.length < itemsPerPage} className="button">Next</button>
      </div>
    </div>
  );
}

export default App;
