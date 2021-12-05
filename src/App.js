import Home from './components/Home/Home';
import Navbar from './components/Nav/Navbar';
import Basket from './components/Basket/Basket';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/checkout" element={<Basket />} />
			</Routes>
		</BrowserRouter>
	);
}
