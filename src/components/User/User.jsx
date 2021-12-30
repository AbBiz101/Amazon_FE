import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import './user.css';
import { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router';

export default function User() {
	const user = useSelector((state) => state.user);

	const [email, setEmail] = useState(user.email);
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);

	const updateHandler = async (e) => {
		e.preventDefault();
		console.log(email, firstName, lastName);
		try {
			let res = await fetch(
				'https://amazon-be-completed.herokuapp.com/user/me',
				{
					method: 'PUT',
					body: JSON.stringify({
						email,
						firstName,
						lastName,
					}),
					headers: { 'Content-Type': 'application/json' },
				},
			);

			if (res.ok) {
				let data = await res.json();
				console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="login_container">
			<div>
				<img
					className="user_image_provider_2 login_logo"
					alt=""
					src={user.avatar}
				/>
				<button className="mx-2 user_image_provider" type="submit">
					Update
				</button>
			</div>
			<div className="login_page">
				<form onSubmit={updateHandler} className="login_page_form">
					<input
						className="login_page_input"
						type="text"
						placeholder={user.firstName}
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<input
						className="mt-3 login_page_input"
						type="text"
						placeholder={user.lastName}
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
					<input
						className="mt-3 login_page_input"
						type="email"
						placeholder={user.email}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<button className="login_page_btn1" type="submit">
						Update user Info
					</button>
				</form>
			</div>
		</div>
	);
}
