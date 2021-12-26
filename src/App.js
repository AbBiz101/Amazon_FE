import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Navbar from './components/Nav/Navbar';
import Basket from './components/Basket/Basket';
import Register from './components/Register/Register';
import DetailPage from './components/DetailPage/DetailPage';
import BackOffice from './components/BackOffice/BackOffice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
	return (
		<div className="container">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/checkout" element={<Basket />} />
					<Route path="/login" element={<Login />} />
					<Route path="/backOffice" element={<BackOffice />} />
					<Route path="/register" element={<Register />} />
					<Route path="/detail" element={<DetailPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
