import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

function App() {
  // Dynamic card data  
  const cards = [
    {
      id: 1,
      title: "Web Development",
      text: "Learn HTML, CSS, JavaScript and modern frameworks."
    },
    {
      id: 2,
      title: "React JS",
      text: "Build fast and interactive user interfaces using React."
    },
    {
      id: 3,
      title: "Bootstrap",
      text: "Create responsive layouts easily using Bootstrap components."
    }
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        Card-Based Layout Using Bootstrap
      </h2>

      <div className="row">
        {cards.map((card) => (
          <div className="col-md-4 mb-4" key={card.id}>
            <div className="card h-100 shadow">
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.text}</p>
                <button className="btn btn-primary">
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
