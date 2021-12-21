import './register.css';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { register } from '../../Redux/Action/index';

export default function Register() {
	const history = useNavigate();
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [image, setImage] = useState('');
	const [password, setPassword] = useState('');
	const [lastName, setLastName] = useState('');
	const [firstName, setFirstName] = useState('');

	const registerHandler = async (e) => {
		e.preventDefault();
		try {
			// const params = new URLSearchParams(window.location.search);
			// const accessToken =
			// 	localStorage.getItem('ACCESS_TOKEN') || params.get('accessToken');

			let res = await fetch('http://localhost:3003/users/register', {
				method: 'POST',
				body: JSON.stringify({
					email,
					password,
					firstName,
					lastName,
					image,
				}),
				headers: { 'Content-Type': 'application/json' },
			});

			if (res.ok) {
				let data = await res.json();
				localStorage.setItem('accessToken', data.accessToken);
				localStorage.setItem('refreshToken', data.refreshToken);
				console.log(data);
				history('/home');
			}
		} catch (error) {
			console.log(error);
			history('/register');
		}
	};

	return (
		<div onSubmit={registerHandler} className="login_container">
			<img
				className="login_logo"
				alt=""
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2000px-Amazon_logo.svg.png"
			/>
			<div className="register_page">
				<form className="register_page_form">
					<h1 className="register_page_title">Register</h1>

					<h5 className="register_page_label">First Name</h5>
					<input
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						className="register_page_input"
						type="text"
						required
						placeholder="Your First Name"
					/>

					<h5 className="register_page_label">Last Name</h5>
					<input
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						className="register_page_input"
						type="text"
						required
						placeholder="Your Last Name"
					/>

					<h5 className="register_page_label">Profile Picture(optional)</h5>
					<input
						value={image}
						onChange={(e) => setImage(e.target.value)}
						className="register_page_fileInput"
						type="file"
						placeholder="Your Last Name"
					/>

					<h5 className="register_page_label">
						E-mail(phone for mobile account)
					</h5>
					<input
						className="register_page_input"
						type="text"
						placeholder="YourEmail@...com"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<h5 className="register_page_label">Password</h5>
					<Form.Control
						className="register_page_input"
						type="password"
						placeholder="Password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<p className="register_page_text">
						<input className="mx-2" type="checkbox" />
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
						nonummy nibh euismod tincidunt ut laoreet
					</p>

					<button
						type="submit"
						className="register_page_btn1"
						onClick={() =>
							dispatch(register(email, image, password, lastName, firstName))
						}
					>
						Register
					</button>
				</form>
			</div>
		</div>
	);
}
