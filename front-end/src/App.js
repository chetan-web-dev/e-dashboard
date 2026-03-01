import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './components/SignUp';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login"
import { Container } from "react-bootstrap-v5";
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import UpdateProduct from './components/UpdateProduct';
import Breacrumbs from './components/elements/Breacrumbs';
import Home from './components/Home';
import Profile from './components/Profile';
import LogoImg from './assets/images/logo.png'
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';

var link = document.querySelector("link[rel~='icon']");
if (!link) {
  link = document.createElement('link');
  link.rel = 'icon';
  document.head.appendChild(link);
}
link.href = 'http://localhost:3000/assets/images/' + LogoImg;

const mainMenus = [
  {title:"t1",link:"#",submenus:[]},
  {title:"t2",link:"#",submenus:[]},
  {title:"t3",link:"#",submenus:[
    {title:'t4',link:'#'},
    {title:'t5',link:'#'}
  ]},
];
console.log(mainMenus);

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Header />
        <Breacrumbs />
        <Container className='mt-4 mb-4'>
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path="/products" element={<Products />}></Route>
              <Route path="/product/add" element={<AddProduct />}></Route>
              <Route path="/product/update/:id" element={<UpdateProduct />}></Route>
              <Route path="/product/delete" element={<h1>Delete Product</h1>}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/logout" element={<h1>Logout</h1>}></Route>
            </Route>
            <Route path="/aboutus" element={<AboutUs />}></Route>
            <Route path="/contactus" element={<ContactUs />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>

        </Container>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
