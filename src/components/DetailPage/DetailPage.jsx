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
	const [product, setProduct] = useState({});
	const [productName, setName] = useState('');
	const [image, setImage] = useState('');
	const [productImg, setImageURL] = useState('');
	const [productPrice, setPrice] = useState('');
	const [productCategory, setCategory] = useState('');
	const [productDescription, setDescription] = useState('');

	const getP = async () => {
		try {
			let res = await fetch('http://localhost:3011/Product' ,{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (res.ok) {
				let data = await res.json();
				setImageURL(data.productImg);
				setName(data.productName);
				setPrice(data.productPrice);
				setCategory(data.productCategory);
				setDescription(data.productDescription);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const role = useSelector((state) => state.user.role);
	const comments = useSelector((state) => state.comments.comments);
	const productGet = useSelector((state) => state.singleProduct.product);

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
		getP();
		dispatch(getComments(val));
		dispatch(getAProduct(val));
	}, []);

	return (
		<div className="detail_page_single_P">
			{!productName ? (
				<></>
			) : (
				<>
					{role === 'ADMIN' ? (
						<div className="d-flex mt-5 object_cont">
							<div onClick={(e) => imageHandler()}>
								<img
									className="user_image_editing"
									alt=""
									src={productImg}
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
										placeholder={productGet.productImg}
										onChange={(e) => setName(e.target.value)}
									/>
									<h6 className="mt-3 ">Product Category</h6>
									<Form.Group controlId="login_page_input exampleForm.ControlSelect1">
										<Form.Control
											value={productCategory}
											placeholder={productGet.productCategory}
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
										placeholder={productGet.productPrice}
										value={productPrice}
										onChange={(e) => setPrice(e.target.value)}
									/>
									<h6 className="mt-3 ">Product Description</h6>

									<textarea
										className=" login_page_input"
										cols="50"
										rows="4"
										productPrice={productGet.productDescription}
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
