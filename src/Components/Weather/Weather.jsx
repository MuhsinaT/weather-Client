import React, { useEffect, useState } from 'react';
import { Card, Button, Table } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Weather.css';

function Weather() {
    const [users, setUsers] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [city, setCity] = useState('India');

    useEffect(() => {
        fetchUsers();
        weatherdata();
    }, []);

    const fetchUsers = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
    };

    const weatherdata = async () => {
        const apiKey = '59b9ed52174d0f3b8c3d82f44670aa15';
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            const forecastData = data.list.map(item => ({
                date: item.dt_txt,
                temp: item.main.temp
            }));

            setForecast(forecastData);
            console.log(forecastData);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const generatePDF = () => {
        const pdf = new jsPDF();
        const inputUsers = document.getElementById('users-table');
        const inputChart = document.getElementById('weather-chart');

        html2canvas(inputUsers).then((canvas) => {
            const imgDataUsers = canvas.toDataURL('image/png');
            pdf.addImage(imgDataUsers, 'PNG', 10, 10, 190, (canvas.height * 190) / canvas.width);
            pdf.addPage();

            html2canvas(inputChart).then((canvas) => {
                const imgDataChart = canvas.toDataURL('image/png');
                pdf.addImage(imgDataChart, 'PNG', 10, 10, 190, (canvas.height * 190) / canvas.width);
                pdf.save('dashboard.pdf'); 
            });
        });
    };

    return (
        <>
            <Button onClick={generatePDF} style={{ marginBottom: '20px' }} className='pdf'>Download PDF</Button>
            <div id="pdf-content">
               
                <Card id="weather-chart" className="weather-card" style={{ marginTop: '20px' }}>
                    <Card.Body>
                        <Card.Title>Weather Forecast for {city}</Card.Title>
                        {forecast.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={forecast}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" tickFormatter={(date) => date.slice(5, 16)} />
                                    <YAxis dataKey="temp" label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <p>Wait a second..!!!</p>
                        )}
                    </Card.Body>
                </Card>


                <Card id="users-table" className="user-card">
                    <Card.Body>
                        <Card.Title>User Data</Card.Title>
                        <Table striped bordered hover className='responsive'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

            </div>
        </>
    );
}

export default Weather;
