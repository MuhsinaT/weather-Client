import React, { useState,useEffect } from 'react'
import { Table } from 'react-bootstrap';
import './User.css'


function User() {
    const [user,setUser]=useState([])

    useEffect(()=>{
        getData()

    },[])

    const getData=async()=>{
        const res=await fetch('https://jsonplaceholder.typicode.com/users')
        const result= await res.json()
        setUser(result)
        console.log(user)
    }

  return (
  <>

      <div className="users-table">
      <h3 className="text-center">Users List</h3>

      <Table striped bordered hover variant="light" className='mt-5 responsive'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {user.map(user => (
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  
  
  </>
  )
}

export default User
