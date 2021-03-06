import './Navbar.css';
import {
	searchProducts,
	getAllProducts,
	searchReset,
	removeAProduct,
	logout,
} from '../../Redux/Action/index';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { RiShoppingCartLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { DropdownButton, Dropdown, SplitButton } from 'react-bootstrap';

export default function NavBar() {
	const history = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const role = useSelector((state) => state.user.role);
	const firstName = useSelector((state) => state.user.firstName);
	const lastName = useSelector((state) => state.user.lastName);
	const cartLength = useSelector((state) => state.user.cart.length);
	const [searchVal, setSearchVal] = useState('');

	const LOGOUT = async (e) => {
		history('/');
		dispatch(logout());
	};

	return (
		<div className="container-fluid px-0 d-flex xxxx">
			<div className="col-12 header">
				<div className="header_left">
					<Link to="/">
						<img
							className="d-sm-block d-none header_logo"
							alt=""
							onClick={() => dispatch(removeAProduct())}
							src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
						/>
					</Link>
					{!firstName ? (
						<></>
					) : (
						<div className="d-none d-xl-block header_user_location">
							<div>
								<span>Deliver to {firstName}</span>
								<h6>Stuttgart 70327‌</h6>
							</div>
						</div>
					)}
					{role === 'ADMIN' ? (
						<div className="d-none d-md-inline mt-3 header_back_office">
							<h6 onClick={(e) => history('/backOffice')}>Back Office</h6>
						</div>
					) : (
						<></>
					)}
				</div>

				<div className="header_search">
					<DropdownButton
						className="category_list"
						as="ButtonGroup"
						title="All"
					>
						<Dropdown.Item eventKey="1">Action</Dropdown.Item>
						<Dropdown.Item eventKey="2">Another action</Dropdown.Item>
						<Dropdown.Item eventKey="3">Active Item</Dropdown.Item>
					</DropdownButton>

					<input
						onChange={(e) => dispatch(searchProducts(e.target.value))}
						type="text"
						className="header_search_input"
					/>
					<BsSearch size={20} className="header_search_icon" />
				</div>

				{firstName ? (
					<div className="mt-2 header_options">
						<div className="d-none d-lg-block header_options_1">
							<span className="d-inline">Returns &</span>
							<h5>Orders</h5>
						</div>

						<div className="d-none d-lg-block header_options_2">
							<Link to="/checkout">
								<h4 className="mt-1">
									<RiShoppingCartLine size={35} />
									{cartLength}
								</h4>
							</Link>
						</div>

						<div className="userbutn">
							<SplitButton
								className="header_options_3"
								key="left"
								drop="left"
								title={firstName}
							>
								<Dropdown.Item
									className="d-block d-sm-none"
									onClick={() => history('/')}
								>
									Home
								</Dropdown.Item>

								<Dropdown.Item
									className="d-block d-lg-none"
									onClick={() => history('/checkout')}
								>
									<RiShoppingCartLine size={25} />
									<span> {cartLength}</span>
								</Dropdown.Item>
								<Dropdown.Item onClick={() => history('/me')}>
									My profile
								</Dropdown.Item>
								{role === 'ADMIN' ? (
									<Dropdown.Item
										className="d-block d-md-none"
										onClick={(e) => history('/backOffice')}
									>
										Back Office
									</Dropdown.Item>
								) : (
									<></>
								)}
								<Dropdown.Item className="d-block d-lg-none">
									Returns & Orders
								</Dropdown.Item>
								<Dropdown.Item onClick={(e) => LOGOUT()}>Logout</Dropdown.Item>
							</SplitButton>
						</div>
					</div>
				) : (
					<Link to="login">
						<Button type="submit" className="mt-2 bbttnn">
							Login
						</Button>
					</Link>
				)}
			</div>
		</div>
	);
}
