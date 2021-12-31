import './DetailPage.css';
import { ListGroup, ListGroupItem, Form, Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import {
	getAProduct,
	getComments,
	removeAProduct,
} from '../../Redux/Action/index.js';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isElementOfType } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { useNavigate } from 'react-router';

export default function DetailPage() {
	const history = useNavigate();
	const dispatch = useDispatch();

	const [id, setId] = useSearchParams();
	const val = id.get('id');

	const role = useSelector((state) => state.user.role);
	const product = useSelector((state) => state.singleProduct.product);
	const comments = useSelector((state) => state.comments.comments);

	const [image, setImage] = useState([]);
	const [productName, setName] = useState(product.productName);
	const [productImg, setImageURL] = useState(product.productImg);
	const [productPrice, setPrice] = useState(product.productPrice);
	const [productCategory, setCategory] = useState(product.productCategory);
	const [productDescription, setDescription] = useState(
		product.productDescription,
	);



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
	}, [val]);

	return (
		<div className="detail_page_single_P">
			{!product ? (
				<></>
			) : (
				<>
					{role === 'ADMIN' ? (
						<div className="d-flex mt-5 object_cont">
							<div onClick={(e) => imageHandler()}>
								<img
									className="user_image_editing"
									alt=""
									src={product.productImg}
								/>

								<input
									required
									type="file"
									value={productImg}
									accept="image/png, image/jpeg"
									placeholder="Product name"
									onChange={(e) => setImage(e.target.files[0])}
								/>
								<button className="obj_image_provider">Update image</button>
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
										placeholder={product.productImg}
										onChange={(e) => setName(e.target.value)}
									/>
									<h6 className="mt-3 ">Product Category</h6>
									<Form.Group controlId="login_page_input exampleForm.ControlSelect1">
										<Form.Control
											value={productCategory}
											placeholder={product.productCategory}
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
										placeholder={product.productPrice}
										value={productPrice}
										onChange={(e) => setPrice(e.target.value)}
									/>
									<h6 className="mt-3 ">Product Description</h6>

									<textarea
										className=" login_page_input"
										cols="50"
										rows="4"
										productPrice={product.productDescription}
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
								<Card.Img
									className="p_img"
									variant="top"
									src={product.productImg}
								/>
								<Card.Body>
									<Card.Title>{product.productName}</Card.Title>
								</Card.Body>
								<ListGroup className="list-group-flush">
									<ListGroupItem>Price-{product.productPrice}€</ListGroupItem>
									<ListGroupItem>{product.productCategory}</ListGroupItem>
									<ListGroupItem>{product.productDescription}</ListGroupItem>
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
