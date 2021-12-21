import './Navbar.css';
import {
	searchProducts,
	getAllProducts,
	searchReset,
} from '../../Redux/Action/index';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import { RiShoppingCartLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { DropdownButton, Dropdown } from 'react-bootstrap';

export default function Navbar() {
	const history = useNavigate();
	const dispatch = useDispatch();
	const role = useSelector((state) => state.user.role);
	const firstName = useSelector((state) => state.user.firstName);
	const cartLength = useSelector((state) => state.user.cart.length);

	console.log(firstName, role);

	return (
		<div className="header">
			<div className="header_location">
				<Link to="/">
					<img
						className="header_logo"
						alt=""
						onClick={() => dispatch(searchReset(), getAllProducts())}
						src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
					/>
				</Link>
				{!firstName ? (
					<></>
				) : (
					<>
						<div className="header_location_info">
							<div>
								<span>Deliver to {firstName}</span>
								<h5>Stuttgart 70327‌</h5>
							</div>
						</div>
					</>
				)}
			</div>
			{role === 'ADMIN' ? (
				<div className="header_back_office">
					<h5 onClick={(e) => history('/backOffice')}>Back Office</h5>
				</div>
			) : (
				<></>
			)}

			<div className="header_search">
				<DropdownButton
					as="ButtonGroup"
					id="dropdown-variants-secondary"
					title="All"
				>
					<Dropdown.Item eventKey="1">Action</Dropdown.Item>
					<Dropdown.Item eventKey="2">Another action</Dropdown.Item>
					<Dropdown.Item eventKey="3" active>
						Active Item
					</Dropdown.Item>
				</DropdownButton>

				<input
					onChange={(e) => dispatch(searchProducts(e.target.value))}
					type="text"
					className="header_search_input"
				/>
				<BsSearch size={25} className="header_search_icon" />
			</div>
			<div className="header_options">
				{firstName ? (
					<>
						<div className="header_options_0">
							<DropdownButton
								as="ButtonGroup"
								id="dropdown-secondary"
								title="All"
							>
								<Dropdown.Item eventKey="1">Action</Dropdown.Item>
								<Dropdown.Item eventKey="2">Another action</Dropdown.Item>
								<Dropdown.Item eventKey="3" active>
									<Button
										type="submit"
										className="mb-2"
										onClick={() => dispatch()}
									>
										Logout
									</Button>
								</Dropdown.Item>
							</DropdownButton>
						</div>

						<div className="header_options_1">
							<span>Hello</span>
							<h5>{firstName}</h5>
						</div>

						<div className="header_options_2">
							<span className="d-inline">Returns &</span>
							<h5>Orders</h5>
						</div>

						<div className="header_options_3">
							<span>Your</span>
							<h5>Prime</h5>
						</div>

						<div className="header_options_4">
							<Link to="/checkout">
								<h4 className="mt-1">
									<RiShoppingCartLine size={35} />
									{cartLength}
								</h4>
							</Link>
						</div>
					</>
				) : (
					<Link to="login">
						<Button type="submit" className="mb-2 mx-5">
							Login
						</Button>
					</Link>
				)}
			</div>
		</div>
	);
}
