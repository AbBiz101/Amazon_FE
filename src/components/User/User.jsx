import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './user.css';
import { useState } from 'react';


export default function User() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const id = user._id;
	const [email, setEmail] = useState(user.email);
	const [image, setImage] = useState(user.avatar);
	const [lastName, setLastName] = useState(user.lastName);
	const [firstName, setFirstName] = useState(user.firstName);
	const accessToken = localStorage.getItem('accessToken');

	const imageHandler = async (e) => { console.log(22)}
	
	const updateHandler = async (e) => {
		e.preventDefault();
		console.log(email, firstName, lastName, accessToken);
		try {
			let res = await fetch('http://localhost:3011/user/me', {
				method: 'PUT',
				body: JSON.stringify({
					email,
					firstName,
					lastName,
					id,
				}),
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${accessToken}`,
				},
			});

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
			<div onSubmit={imageHandler}>
				<img
					className="user_image_provider_2 login_logo"
					alt=""
					src={user.avatar}
				/>
				<input
					required
					type="file"
					accept="image/png, image/jpeg"
					placeholder="Product name"
					onChange={(e) => setImage(e.target.files[0])}
				/>

				<button className="obj_image_provider" type="submit">
					Update image
				</button>
			</div>
			<div className="login_page">
				<form onSubmit={updateHandler} className="login_page_form">
					<h6>First Name</h6>
					<input
						className="login_page_input"
						type="text"
						placeholder={user.firstName}
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<h6 className="mt-3">Last Name</h6>
					<input
						className="login_page_input"
						type="text"
						placeholder={user.lastName}
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
					<h6 className="mt-3">Email</h6>
					<input
						className="login_page_input"
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
