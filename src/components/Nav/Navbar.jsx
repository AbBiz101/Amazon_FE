import './Navbar.css';
import {
	searchProducts,
	getAllProducts,
	searchReset,
} from '../../Redux/Action/index';
import { Link } from 'react-router-dom';
import {
	Button,
	Navbar,
	Nav,
	NavDropdown,
	FormControl,
	Form,
} from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import { RiShoppingCartLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { DropdownButton, Dropdown } from 'react-bootstrap';

export default function NavBar() {
	const history = useNavigate();
	const dispatch = useDispatch();
	const role = useSelector((state) => state.user.role);
	const firstName = useSelector((state) => state.user.firstName);
	const cartLength = useSelector((state) => state.user.cart.length);

	return (
		<>
			{/* <Navbar bg="dark" className="my_nav_bar" expand="lg">
				<Navbar.Brand className="header_logo d-none d-sm-block" href="/">
					<img
						className="header_logo"
						alt=""
						onClick={() => dispatch(searchReset(), getAllProducts())}
						src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="#link">Link</Nav.Link>
						<NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Form inline>
						<FormControl type="text" placeholder="Search" className="mr-sm-2" />
						<Button variant="outline-success">Search</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar> */}

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
		</>
	);
}

// <div className="header">
// 	<div className="header_location">
// 		<Link to="/">
// 			<img  getAllProducts()
// 				className="header_logo"
// 				alt=""
// 				onClick={() => dispatch(searchReset(), getAllProducts())}
// 				src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
// 			/>
// 		</Link>

// 		<div className="header_location_info">
// 			<div>
// 				<span>Deliver to {firstName}</span>
// 				<h5>Stuttgart 70327‌</h5>
// 			</div>
// 		</div>
// 	</div>
// 	{role === 'ADMIN' ? (
// 		<div className="header_back_office">
// 			<h5 onClick={(e) => history('/backOffice')}>Back Office</h5>
// 		</div>
// 	) : (
// 		<></>
// 	)}

// 	<div className="header_search">
// 		<DropdownButton
// 			as="ButtonGroup"
// 			id="dropdown-variants-secondary"
// 			title="All"
// 		>
// 			<Dropdown.Item eventKey="1">Action</Dropdown.Item>
// 			<Dropdown.Item eventKey="2">Another action</Dropdown.Item>
// 			<Dropdown.Item eventKey="3" active>
// 				Active Item
// 			</Dropdown.Item>
// 		</DropdownButton>

// 		<input
// 			onChange={(e) => dispatch(searchProducts(e.target.value))}
// 			type="text"
// 			className="header_search_input"
// 		/>
// 		<BsSearch size={25} className="header_search_icon" />
// 	</div>
// 	<div className="header_options">
// 		<div className="header_options_0">
// 			<DropdownButton as="ButtonGroup" id="dropdown-secondary" title="All">
// 				<Dropdown.Item eventKey="1">Action</Dropdown.Item>
// 				<Dropdown.Item eventKey="2">Another action</Dropdown.Item>
// 				<Dropdown.Item onClick={() => dispatch()} eventKey="3">
// 					Logout
// 				</Dropdown.Item>
// 			</DropdownButton>
// 		</div>

// 		<div className="header_options_1">
// 			<span>Hello</span>
// 			<h5>{firstName}</h5>
// 		</div>

// 		<div className="header_options_2">
// 			<span className="d-inline">Returns &</span>
// 			<h5>Orders</h5>
// 		</div>

// 		<div className="header_options_3">
// 			<span>Your</span>
// 			<h5>Prime</h5>
// 		</div>

// 		<div className="header_options_4">
// 			<Link to="/checkout">
// 				<h4 className="mt-1">
// 					<RiShoppingCartLine size={35} />
// 					{cartLength}
// 				</h4>
// 			</Link>
// 		</div>

// 		<Link to="login">
// 			<Button type="submit" className="mb-2 mx-5">
// 				Login
// 			</Button>
// 		</Link>
// 	</div>
// </div>

/*
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




*/
