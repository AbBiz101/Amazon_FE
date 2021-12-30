import React from 'react';
import './BackOffice.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

export default function BackOffice() {
	const dispatch = useDispatch();

	const [productName, setName] = useState('');
	const [productPrice, setPrice] = useState('');
	const [productCategory, setCategory] = useState('');
	const [productDescription, setDescription] = useState('');
	const [image, setImage] = useState([]);
	const [productImg, setImageURL] = useState('');
	let img;

	const imageHandler = async (e) => {
		console.log(2222);
		// try {
		// 	let formDt = new FormData();
		// 	formDt.append('product', image);
		// 	let res = await fetch(
		// 		'https://amazon-be-completed.herokuapp.com/product/Image',
		// 		{
		// 			method: 'POST',
		// 			body: formDt,
		// 		},
		// 	);
		// 	const obj = res;
		// 	console.log(res);
		// 	if (obj) {
		// 		setImageURL(obj);
		// 	}
		// } catch (error) {
		// 	console.log(error);
		// }
	};

	const registerHandler = async (e) => {
		e.preventDefault();
		try {
			console.log(
				productName,
				productPrice,
				productDescription,
				productCategory,
				productImg,
			);
			if (productImg) {
				let response = await fetch(
					'https://amazon-be-completed.herokuapp.com/product',
					{
						method: 'POST',
						body: JSON.stringify({
							productName,
							productPrice,
							productDescription,
							productCategory,
							productImg,
						}),
						headers: { 'Content-Type': 'application/json' },
					},
				);
			} else {
				console.log('img loading error');
			}
		} catch (error) {}
	};

	return (
		<div>
			<div className="offset-md-3 offset-sm-0 col-6 backOffice_form">
				<h3>Product Details</h3>
				<div
					className="image_containin_box d-flex"
					onClick={(e) => imageHandler()}
				>
					<Form.Label>Image</Form.Label>
					<div className=" d-flex">
						<Form.Group
							onSubmit={imageHandler}
							controlId="exampleForm.ControlInput1"
						>
							<Form.Control
								required
								type="file"
								accept="image/png, image/jpeg"
								placeholder="Product name"
								onChange={(e) => setImage(e.target.files[0])}
								onSubmit={imageHandler}
							/>
						</Form.Group>
						<button className="obj_image_provider" type="submit">
							Add image
						</button>
					</div>
				</div>

				<Form onSubmit={registerHandler}>
					<Form.Group controlId="exampleForm.ControlInput1">
						<Form.Label>Name</Form.Label>
						<Form.Control
							value={productName}
							onChange={(e) => setName(e.target.value)}
							required
							type="text"
							placeholder="Product name"
						/>
					</Form.Group>
					<Form.Group controlId="exampleForm.ControlInput1">
						<Form.Label>Price</Form.Label>
						<Form.Control
							value={productPrice}
							onChange={(e) => setPrice(e.target.value)}
							required
							type="number"
							placeholder="Product name"
						/>
					</Form.Group>

					<Form.Group controlId="exampleForm.ControlSelect1">
						<Form.Label>Category</Form.Label>
						<Form.Control
							value={productCategory}
							onChange={(e) => setCategory(e.target.value)}
							required
							as="select"
						>
							<option>Category 1</option>
							<option>Category 2</option>
							<option>Category 3</option>
							<option>Category 4</option>
							<option>Category 5</option>
						</Form.Control>
					</Form.Group>

					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Label>Description</Form.Label>
						<Form.Control
							value={productDescription}
							onChange={(e) => setDescription(e.target.value)}
							required
							as="textarea"
							rows={3}
						/>
					</Form.Group>

					<button className="obj_image_provider mt-3" type="submit">
						Add Object
					</button>
				</Form>
			</div>
		</div>
	);
}
