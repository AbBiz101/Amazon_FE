import './Navbar.css';
import { BsSearch } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import { RiShoppingCartLine } from 'react-icons/ri';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function Navbar() {
	return (
		<div className="header">
			<div className="header_location">
				<Link to="/home">
					<img
						className="header_logo"
						alt=""
						src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
					/>
				</Link>

				<div className="header_location_info">
					<ImLocation size={30} />
					<div>
						<span>Deliver to User</span>
						<h5>Stuttgart 70327‌</h5>
					</div>
				</div>
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

				<input type="text" className="header_search_input" />
				<BsSearch size={25} className="header_search_icon" />
			</div>
			<div className="header_options">
				<div className="header_options_0">
					<DropdownButton as="ButtonGroup" id="dropdown-secondary" title="All">
						<Dropdown.Item eventKey="1">Action</Dropdown.Item>
						<Dropdown.Item eventKey="2">Another action</Dropdown.Item>
						<Dropdown.Item eventKey="3" active>
							Active Item
						</Dropdown.Item>
					</DropdownButton>
				</div>
				<div className="header_options_1">
					<span>Hello</span>
					<h5>User</h5>
				</div>
				<div className="header_options_2">
					<span>Returns</span>
					<h5>& Orders</h5>
				</div>
				<div className="header_options_3">
					<span>Your</span>
					<h5>Prime</h5>
				</div>
				<Link to="/checkout">
					<div className="header_options_4">
						<RiShoppingCartLine size={35} />
						<h4 className="mx-3">2</h4>
					</div>
				</Link>
			</div>
		</div>
	);
}
