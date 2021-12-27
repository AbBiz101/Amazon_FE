import React from 'react';
import './BackOffice.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';

export default function BackOffice() {
	const dispatch = useDispatch();

	const [productName, setName] = useState('');
	const [productPrice, setPrice] = useState('');
	const [productCategory, setCategory] = useState('');
	const [productDescription, setDescription] = useState('');
	const [image, setImage] = useState([]);
	const [productImg, setImageURL] = useState('');
	let img;
	const registerHandler = async (e) => {
		e.preventDefault();
		try {
			let formDt = new FormData();
			formDt.append('product', image);
			let res = await fetch(
				'https://amazon-be-completed.herokuapp.com/product/Image',
				{
					method: 'POST',
					body: formDt,
				},
			);
			if (res) {
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
				console.log('error posting a project');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div className="offset-md-3 offset-sm-0 col-6 backOffice_form">
				<h3>Product Details</h3>
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

					<Form.Group controlId="exampleForm.ControlInput1">
						<Form.Label>Image</Form.Label>
						<Form.Control
							required
							type="file"
							accept="image/png, image/jpeg"
							placeholder="Product name"
							onChange={(e) => setImage(e.target.files[0])}
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

					<Button className="mt-3" type="submit">
						Submit
					</Button>
				</Form>
			</div>
		</div>
	);
}
