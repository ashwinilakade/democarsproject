import React, {useEffect, useState} from 'react';

const details = require('../db.json');

export function Products() {
  const [isList, setIsList] = useState(true);
  const [data, setData] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    setData(details.products);
  }, []);

  const handleDelete = (id) => {
    const newData = data.filter((product) => product.id !== id);
    setData(newData);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setIsList(false);
  };

  const handleCancelEdit = () => {
    setEditProduct(null);
    setIsList(true);
  };

  const handleUpdate = (updatedProduct, isNewRecord = true) => {
    let updatedData;
    if (isNewRecord) updatedData = updatedProduct;
    else {
      updatedData = data.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
    }
    setData(updatedData);
    setEditProduct(null);
    setIsList(true);
  };

  return (
    <div className="container my-5">
      {isList ? (
        <ProductList
          products={data}
          showForm={() => {
            setIsList(!isList);
          }}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ) : (
        <ProductForm
          products={data}
          product={editProduct}
          handleCancelEdit={handleCancelEdit}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

const ProductList = (props) => {
  return (
    <>
      <h2 className="text-center mb-3"> List of Cars Data </h2>
      <button
        onClick={props.showForm}
        type="button"
        className="btn btn-primary me-2"
      >
        {' '}
        Create{' '}
      </button>
      <table className="table">
        <thead>
          <tr>
            <th> ID </th> <th> Name </th> <th> Brand </th> <th> Category </th>{' '}
            <th> Price </th> <th> Created At </th> <th> Action </th>{' '}
          </tr>
        </thead>
        <tbody>
          {props.products?.map((product, index) => {
            return (
              <tr key={index}>
                <td> {product.id} </td> <td> {product.name} </td>
                <td> {product.brand} </td> <td> {product.category} </td>
                <td> {product.price} </td> <td> {product.createdAt} </td>
                <td style={{width: '10px', whiteSpace: 'nowrap'}}>
                  <button
                    onClick={() => props.handleEdit(product)}
                    type="button"
                    className="btn btn-primary btn-sm me-2"
                  >
                    {' '}
                    Edit{' '}
                  </button>
                  <button
                    onClick={() => props.handleDelete(product.id)}
                    type="button"
                    className="btn btn-danger btn-sm me-2"
                  >
                    {' '}
                    Delete{' '}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

function ProductForm(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const product = Object.fromEntries(formData.entries());
    if (
      !product.name ||
      !product.brand ||
      !product.category ||
      !product.price
    ) {
      alert('Please provide all the required fields');
      return;
    }
    if (props.product) {
      // Editing existing product
      props.handleUpdate({...props.product, ...product}, false);
    } else {
      // Creating a new product
      const oldData = props.products;
      product.createdAt = new Date().toISOString().slice(0, 10);
      product.id = props.products[oldData?.length - 1]?.id + 1;
      let data = oldData?.map((item) => {
        return item;
      });
      data.push(product);
      props.handleUpdate(data, true);
    }
  }

  return (
    <div>
      <h2 className="text-center mb-3">
        {' '}
        {props.product ? 'Edit Product' : 'Create New Product'}{' '}
      </h2>
      <button
        onClick={props.handleCancelEdit}
        type="button"
        className="btn btn-secondary me-2"
      >
        {' '}
        Cancel{' '}
      </button>
      <div className='"row'>
        <div className="col-lg-6 mx-auto">
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="row mb-3">
              <label className="col-sm-4 col-from-label"> Name </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="name"
                  defaultValue={props.product ? props.product.name : ''}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-from-label"> Brand </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="brand"
                  defaultValue={props.product ? props.product.brand : ''}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-from-label"> Category </label>
              <div className="col-sm-8">
                <select
                  className="form-select"
                  name="category"
                  defaultValue={props.product ? props.product.category : ''}
                >
                  <option value="Other"> Other </option>
                  <option value="Compact"> Compact </option>
                  <option value="Midsize"> Midsize </option>
                  <option value="Full-Size"> Full-Size </option>
                  <option value="Luxury"> Luxury </option>
                  <option value="Crossover"> Cameras </option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-from-label"> Price </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="price"
                  defaultValue={props.product ? props.product.price : ''}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-from-label"> Description </label>
              <div className="col-sm-8">
                <textarea
                  className="form-control"
                  name="description"
                  defaultValue={props.product ? props.product.description : ''}
                />
              </div>
            </div>
            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary btn-sm me-3">
                  Save{' '}
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <button
                  onClick={props.handleCancelEdit}
                  type="button"
                  className="btn btn-secondary me-2"
                >
                  {' '}
                  Cancel{' '}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
