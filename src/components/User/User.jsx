import './user.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from '../../Redux/Action/index.js';
export default function User() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const id = user._id;
	const [email, setEmail] = useState(user.email);
	const [image, setImage] = useState(user.avatar);
	const [lastName, setLastName] = useState(user.lastName);
	const [firstName, setFirstName] = useState(user.firstName);
	const accessToken = localStorage.getItem('accessToken');
	const [img, setIMG] = useState([]);

	const imageHandler = async (e) => {
		try {
			let formDt = new FormData();
			formDt.append('product', img);
			let res = await fetch('http://localhost:3011/product/Image', {
				method: 'POST',
				body: formDt,
			});
			if (res.ok) {
				const obj = await res.json();
				console.log(obj);
				setImage(obj.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const updateHandler = async (e) => {
		e.preventDefault();
		try {
			let res = await fetch('http://localhost:3011/user/me', {
				method: 'PUT',
				body: JSON.stringify({
					email,
					firstName,
					lastName,
					id,
					image,
				}),
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${accessToken}`,
				},
			});

			if (res.ok) {
				let data = await res.json();
				dispatch(logIn(data));
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container-fluid px-0 mx-0 ">
			<div className="user_container">
				<div className="user_picture d-flex">
					<img
						className="user_image_provider_2  user_logo"
						alt=""
						src={user.avatar}
					/>
					<div className="input_button px-3 mt-2 py-1 d-flex">
						<input
							required
							type="file"
							accept="image/png, image/jpeg"
							placeholder="Product name"
							onChange={(e) => setIMG(e.target.files[0])}
						/>

						<button
							onClick={(e) => imageHandler()}
							className="obj_image_provider"
							type="submit"
						>
							Update image
						</button>
					</div>
				</div>

				<div className="mt-0 user_page">
					<form onSubmit={updateHandler} className=" mt-0 user_page_form">
						<h6 className="mt-0">First Name</h6>
						<input
							className=" user_page_input"
							type="text"
							placeholder={user.firstName}
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<h6 className="mt-3">Last Name</h6>
						<input
							className=" user_page_input"
							type="text"
							placeholder={user.lastName}
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
						<h6 className="mt-3">Email</h6>
						<input
							className=" user_page_input"
							type="email"
							placeholder={user.email}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<button className=" user_page_btn1" type="submit">
							Update user Info
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
