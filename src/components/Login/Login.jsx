import './login.css';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logIn } from '../../Redux/Action/index';

export default function Login() {
	const history = useNavigate();
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const userInfo = { email: email, password: password };
	const loginHandler = async (e) => {
		e.preventDefault();
		try {
			let res = await fetch('http://localhost:3010/user/login', {
				method: 'POST',
				body: JSON.stringify({
					email,
					password,
				}),
				headers: { 'Content-Type': 'application/json' },
			});

			if (res.ok) {
				let data = await res.json();
				localStorage.setItem('accessToken', data.accessToken);
				localStorage.setItem('refreshToken', data.refreshToken);
				console.log(data);
				history('/home');
			} else {
				history('/');
			}
		} catch (error) {
			history('/');
			console.log(error);
		}
	};

	return (
		<div onSubmit={loginHandler} className="login_container">
			<img
				className="login_logo"
				alt=""
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2000px-Amazon_logo.svg.png"
			/>
			<div className="login_page">
				<form className="login_page_form">
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
					<Link to="/">
						<button
							className="login_page_btn1"
							onClick={() => dispatch(logIn(userInfo))}
						>
							Sing in
						</button>
					</Link>

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
					<a href="http://localhost:3003/users/googleLogin">
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
