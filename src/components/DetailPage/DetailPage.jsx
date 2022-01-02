import './DetailPage.css';
import {
	getAProduct,
	getComments,
	removeAProduct,
} from '../../Redux/Action/index.js';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, ListGroupItem, Form, Card } from 'react-bootstrap';

export default function DetailPage() {
	const history = useNavigate();
	const dispatch = useDispatch();
	const [id, setId] = useSearchParams();
	const val = id.get('id');
	const [image, setImage] = useState([]);
	const role = useSelector((state) => state.user.role);
	const comments = useSelector((state) => state.comments.comments);
	const productGet = useSelector((state) => state.singleProduct.product);

	const [productName, setName] = useState('');
	const [productImg, setImageURL] = useState('');
	const [productPrice, setPrice] = useState('');
	const [productCategory, setCategory] = useState('');
	const [productDescription, setDescription] = useState('');

	console.log();

	const imageHandler = async (e) => {
		try {
			let formDt = new FormData();
			formDt.append('product', image);
			let res = await fetch('http://localhost:3011/product/Image', {
				method: 'POST',
				body: formDt,
			});
			if (res.ok) {
				const obj = await res.json();
				console.log(obj);
				setImageURL(obj.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const updateHandler = async (e) => {
		console.log(val);
		try {
			let req = await fetch('http://localhost:3011/product/' + val, {
				method: 'PUT',
				body: JSON.stringify({
					productName,
					productPrice,
					productDescription,
					productCategory,
					productImg,
				}),
				headers: { 'Content-Type': 'application/json' },
			});
			history(`/`);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteHandler = async (e) => {
		try {
			let req = await fetch('http://localhost:3011/product/' + val, {
				method: 'DELETE',
				body: JSON.stringify({}),
				headers: { 'Content-Type': 'application/json' },
			});
			if (req.ok) {
				setTimeout(() => {
					history('/');
				}, 1000);
				dispatch(removeAProduct());
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		dispatch(getComments(val));
		dispatch(getAProduct(val));
	}, []);

	useEffect(() => {
		if (productGet) {
			setImageURL(productGet.productImg);
			setName(productGet.productName);
			setPrice(productGet.productPrice);
			setCategory(productGet.productCategory);
			setDescription(productGet.productDescription);
		}
	}, [productGet]);

	return (
		<div className="detail_page_single_P">
			{!productGet ? (
				<>Loading</>
			) : (
				<>
					{role === 'ADMIN' ? (
						<div className="d-flex mt-5 object_cont">
							<div>
								<img className="user_image_editing" alt="" src={productImg} />
								<input
									required
									type="file"
									accept="image/png, image/jpeg"
									placeholder="Product name"
									onChange={(e) => setImage(e.target.files[0])}
								/>
								<button
									onClick={(e) => imageHandler()}
									className="obj_image_provider"
								>
									Update image
								</button>
							</div>

							<div className="mt-3">
								<h6>Product Name</h6>
								<form
									onClick={(e) => updateHandler()}
									className="login_page_form"
								>
									<input
										className="login_page_input"
										type="text"
										value={productName}
										placeholder={productName}
										onChange={(e) => setName(e.target.value)}
									/>
									<h6 className="mt-3 ">Product Category</h6>
									<Form.Group controlId="login_page_input exampleForm.ControlSelect1">
										<Form.Control
											value={productCategory}
											placeholder={productCategory}
											onChange={(e) => setCategory(e.target.value)}
											as="select"
										>
											<option>Category 1</option>
											<option>Category 2</option>
											<option>Category 3</option>
											<option>Category 4</option>
											<option>Category 5</option>
										</Form.Control>
									</Form.Group>

									<h6 className="mt-3 ">Product Price</h6>
									<input
										className="login_page_input"
										type="number"
										placeholder={productPrice}
										value={productPrice}
										onChange={(e) => setPrice(e.target.value)}
									/>
									<h6 className="mt-3 ">Product Description</h6>

									<textarea
										className=" login_page_input"
										cols="50"
										rows="4"
										productPrice={productDescription}
										value={productDescription}
										onChange={(e) => setDescription(e.target.value)}
									/>

									<button className="login_page_btn1">
										Update Product Info
									</button>
								</form>
							</div>
							<button
								onClick={(e) => deleteHandler()}
								className="login_page_btn1 toDelete"
							>
								Delete Product
							</button>
						</div>
					) : (
						<>
							<Card className="detail_page_single">
								<Card.Img className="p_img" variant="top" src={productImg} />
								<Card.Body>
									<Card.Title>{productName}</Card.Title>
								</Card.Body>
								<ListGroup className="list-group-flush">
									<ListGroupItem>Price-{productPrice}€</ListGroupItem>
									<ListGroupItem>{productCategory}</ListGroupItem>
									<ListGroupItem>{productDescription}</ListGroupItem>
								</ListGroup>
							</Card>
							<ListGroup className="comment_list">
								<h5>Comments</h5>
								{comments.map((x) => (
									<ListGroup.Item>{x}</ListGroup.Item>
								))}
							</ListGroup>
						</>
					)}
				</>
			)}
		</div>
	);
}
