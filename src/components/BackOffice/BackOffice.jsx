import React from 'react';
import './BackOffice.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Form } from 'react-bootstrap';
import { removeAProduct } from '../../Redux/Action/index.js';

export default function BackOffice() {
	const dispatch = useDispatch();
	const history = useNavigate();
	
	const [image, setImage] = useState([]);
	const [productName, setName] = useState('');
	const [productPrice, setPrice] = useState('');
	const [productImg, setImageURL] = useState('');
	const [productCategory, setCategory] = useState('');
	const [productDescription, setDescription] = useState('');

	const imageHandler = async (e) => {
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
			if (res.ok) {
				const obj = await res.json();
				setImageURL(obj.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const registerHandler = async (e) => {
		e.preventDefault();
		try {
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
				if (response.ok) {
					setTimeout(() => {
						history('/');
						setName('');
						setPrice('');
						setCategory('');
						setDescription('');
						setImage([]);
						setImageURL('');
						dispatch(removeAProduct());
					}, 1000);
				}
			} else {
				console.log('img loading error');
			}
		} catch (error) {}
	};

	return (
			<div className="p-2 backOffice_form">
				<h3>Product Details</h3>

				<div
					onClick={(e) => imageHandler()}
					className="image_containin_box d-flex"
				>
					<Form.Label>Image</Form.Label>
					<div className=" d-flex">
						<input
							required
							onClick={(e) => imageHandler()}
							type="file"
							accept="image/png, image/jpeg"
							placeholder="Product name"
							onChange={(e) => setImage(e.target.files[0])}
						/>
						<button className="obj_image_provider">Add image</button>
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
	);
}
