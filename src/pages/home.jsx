import React from 'react';

export function Home() {
  const brands = [
    {name: 'Tesla', image: 'assets/tesla.png'},
    {name: 'Toyota', image: 'assets/toyota.png'},
    {name: 'Honda', image: 'assets/honda.png'},
    {name: 'Ford', image: 'assets/ford.png'},
  ];
  return (
    <div className="container my-5">
      <div className="row">
        {brands?.map((item, index) => (
          <div className="col" key={index}>
            <img
              src={item.image}
              alt={item.name}
              style={{width: '100%', height: 'auto', border: '1px solid black'}}
            />
            <span style={{fontWeight: 'bold'}}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
