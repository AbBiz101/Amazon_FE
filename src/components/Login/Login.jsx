import './login.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUserName } from '../../Redux/Action/index';
import { Link } from 'react-router-dom';

export default function Login() {
	const dispatch = useDispatch();
	const [username, setUsername] = useState('');

	return (
		<div className="login_container">
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
						onChange={(e) => setUsername(e.target.value)}
					/>
					<h5 className="login_page_label">Password</h5>
					<input
						className="login_page_input"
						type="text"
						placeholder="Your password"
					/>
					<Link to="/">
						<button
							className="login_page_btn1"
							onClick={() => dispatch(addUserName(username))}
						>
							Sing in
						</button>
					</Link>

					<p className="login_page_text">
						<input className="mx-2" type="checkbox" />
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
						nonummy nibh euismod tincidunt ut laoreet
					</p>
					<button className="login_page_btn2">
						Create Your Amazon Account
					</button>
				</form>
			</div>
		</div>
	);
}
