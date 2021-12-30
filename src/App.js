import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NavBar from './components/Nav/Navbar';
import Basket from './components/Basket/Basket';
import Register from './components/Register/Register';
import DetailPage from './components/DetailPage/DetailPage';
import User from './components/User/User';
import BackOffice from './components/BackOffice/BackOffice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
export default function App() {
	return (
		<div className="container-fluid px-0 mx-0">
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/checkout" element={<Basket />} />
					<Route path="/me" element={<User />} />
					<Route path="/login" element={<Login />} />
					<Route path="/backOffice" element={<BackOffice />} />
					<Route path="/register" element={<Register />} />
					<Route path="/detail" element={<DetailPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
