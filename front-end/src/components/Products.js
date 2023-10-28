import React, { useState, useEffect } from "react";
import { Card, Row, Table, Button } from "react-bootstrap-v5";

const Products = () => {
    const [productsDetails, setProductsDetails] = useState([]);
    const [authError,setAuthError] = useState("");

    const getProducts = async () => {
        let result = await fetch(`${process.env.REACT_APP_API_ENDPOINT}products`, {
            headers: {
                authorization: JSON.parse(`"${localStorage.getItem('token')}"`)
            }
        });
        console.log(result);
        result = await result.json();
        if(result.auth){
            if(!result.response.error){
                setProductsDetails(result.response.result);
                setAuthError('')
            }  
        }else{
            setAuthError(result.authTokenError)
        }
    }

    useEffect(() => {
        console.log('useEffect');
        document.title = 'E-shopping || Products';
        getProducts();
    }, [])


    const deleteProduct = async (id) => {
        let result = await fetch(`${process.env.REACT_APP_API_ENDPOINT}product/delete/${id}`, {
            method: 'delete',
            headers:{
                authorization: JSON.parse(`"${localStorage.getItem('token')}"`)
            }
        });
        result = await result.json();
        if (!result.error) {
            alert('Product deleted successfully.')
            getProducts()
        }
    };

    const searchHandle = async (e) => {
        const keywords = e.target.value;
        if (keywords) {
            let searchResult = await fetch(`${process.env.REACT_APP_API_ENDPOINT}product/search/${keywords}`,{
                headers:{
                    authorization:JSON.parse(`"${localStorage.getItem('token')}"`)
                }
            });
            searchResult = await searchResult.json();
            if(searchResult.authTokenError){
                setAuthError(searchResult.authTokenError)
                return false;
            }            
            setProductsDetails(searchResult.result)
            console.warn(searchResult.result);
        } else {
            getProducts()
        }
    };

    return (
        <div className="products">
            <p className="invalid-input">{authError}</p>
            <Card>
                <Card.Header>
                    <Row>
                        <Card.Title>Search</Card.Title>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <div className="row mt-2">
                        <div className="col-lg-6 col-md-8 col-12">    
                            <label htmlFor="searchtxt" className="col-sm-2 col-form-label">Search By:</label>
                            <select name="searchby" className="form-control"> 
                                <option value="">Any</option>
                                <option value="name">Product Name</option>
                                <option value="category">Category</option>
                            </select>                      
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="searchtxt" className="col-sm-2 col-form-label">Search For:</label>
                            <div className="col-sm-9">                            
                                <input type="text" name="searchtxt" className="form-control" onChange={searchHandle} />
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            <Card>
                <Card.Header>
                    <Row>
                        <div className="col-md-11">
                            <h3>Products</h3>
                        </div>
                        <div className="col-md-1 float-right text-center">
                            <a className="d-inline p-1 ms-auto mb-2 col-lg-2 btn btn-outline-primary" href="/product/add">Add</a>
                            {/* <NavLink className="d-inline p-1 ms-auto mb-2 col-lg-2 btn btn-outline-primary col-sm-1" href="/products">Back</NavLink> */}
                        </div>

                        {/* <Card.Title>
                            <div className="d-inline1 col-md-10">
                                Products
                            </div>
                            <div className="d-inline col-md-2 float-right">
                                <NavLink className="d-inline p-1 ms-auto mb-2 col-lg-2 btn btn-outline-primary col-sm-1" href="/product/add">Add</NavLink>
                            </div>
                        </Card.Title> */}
                        {/* <a className="btn btn-outline-primary" href="/product/add" role="button">Add</a> */}
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Table className="mt-4" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th width="70">S. No</th>
                                <th width="250">Name</th>
                                <th width="100">Price</th>
                                <th width="250">Category</th>
                                <th width="250">Created At</th>
                                <th width="250">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsDetails.length > 0 ?
                                productsDetails.map((item, index) =>{
                                    const createdAtObj = new Date(item.createdAt);
                                    console.log(createdAtObj.toLocaleString())
                                        return(
                                            <tr key={item._id}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.price}</td>
                                                <td>{item.category}</td>
                                                <td>{createdAtObj.toLocaleString()}</td>
                                                <td>
                                                    <a className="btn btn-outline-primary m-1" href={`/product/update/${item._id}`}>Edit</a>
                                                    <Button onClick={() => deleteProduct(item._id)} variant="btn btn-outline-danger m-1">Danger</Button>
                                                </td>
                                            </tr>
                                        )                                        
                                    }                                                                        
                                )
                                : <tr><td colSpan={6}>Products not found</td></tr>
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Products;