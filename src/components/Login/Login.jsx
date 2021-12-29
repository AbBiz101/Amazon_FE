import './login.css';
import { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logIn } from '../../Redux/Action/index';

export default function Login() {
	const history = useNavigate();
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [lastName, setLastName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [avatar, setAvatar] = useState('');
	const [role, setRole] = useState('');
	const [cart, setCart] = useState([]);
	const [_id, setId] = useState('');

	const userInfo = { email, lastName, firstName, avatar, role, cart, _id };
	const loginHandler = async (e) => {
		console.log(212212);
		e.preventDefault();
		try {
			let res = await fetch(
				'https://amazon-be-completed.herokuapp.com/user/login',
				{
					method: 'POST',
					body: JSON.stringify({
						email,
						password,
					}),
					headers: { 'Content-Type': 'application/json' },
				},
			);

			if (res.ok) {
				let data = await res.json();
				console.log(data);
				localStorage.setItem('accessToken', data.accessToken);
				localStorage.setItem('refreshToken', data.refreshToken);
				dispatch(logIn(data.user));
				history('/');
			} else {
				<Alert variant="danger">Incorrect Username or Password</Alert>;
				history('/login');
			}
		} catch (error) {
			history('/login');
			console.log(error);
		}
	};

	return (
		<div className="login_container">
			<img
				className="login_logo"
				alt=""
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2000px-Amazon_logo.svg.png"
			/>
			<div className="login_page">
				<form onSubmit={loginHandler} className="login_page_form">
					<h1 className="login_page_title">Sign in</h1>
					<h5 className="login_page_label">E-mail(phone for mobile account)</h5>
					<input
						className="login_page_input"
						type="text"
						placeholder="YourEmail@...com"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<h5 className="login_page_label">Password</h5>
					<Form.Control
						className="login_page_input"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						type="password"
						placeholder="Password"
					/>

					<button className="login_page_btn1" type="submit">
						Sing in
					</button>

					<p className="login_page_text">
						<input className="mx-2" type="checkbox" />
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
						nonummy nibh euismod tincidunt ut laoreet
					</p>
					<button
						type="button"
						onClick={(e) => {
							history('/register');
						}}
						className="login_page_btn2"
					>
						Create Your Amazon Account
					</button>
					<a href="https://amazon-be-completed.herokuapp.com/user/googleLogin">
						<button type="button" className="login_page_btn2">
							<img
								alt=""
								src="https://library.kissclipart.com/20180829/zlq/kissclipart-google-logo-png-clipart-google-logo-google-search-6aa66a36629c5f13.jpg"
							/>
							Sign in with Google Account
						</button>
					</a>
				</form>
			</div>
		</div>
	);
}
