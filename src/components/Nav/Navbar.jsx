import './Navbar.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import { RiShoppingCartLine } from 'react-icons/ri';
import { addUserName } from '../../Redux/Action/index';
import { useSelector, useDispatch } from 'react-redux';
import {
	searchProducts,
	getAllProducts,
	searchReset,
} from '../../Redux/Action/index';
import { DropdownButton, Dropdown } from 'react-bootstrap';

export default function Navbar() {
	const dispatch = useDispatch();
	const userName = useSelector((state) => state.user.userName);
	const cartLength = useSelector((state) => state.user.cart.length);

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
				{!userName ? (
					<></>
				) : (
					<>
						<div className="header_location_info">
							<ImLocation size={30} />
							<div>
								<span>Deliver to User</span>
								<h5>Stuttgart 70327‌</h5>
							</div>
						</div>
					</>
				)}
			</div>

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
				{userName ? (
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
										onClick={() => dispatch(addUserName(''))}
									>
										Logout
									</Button>
								</Dropdown.Item>
							</DropdownButton>
						</div>

						<div className="header_options_1">
							<span>Hello</span>
							<h5>{userName}</h5>
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
