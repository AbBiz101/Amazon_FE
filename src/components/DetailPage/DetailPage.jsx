import './DetailPage.css';
import { ListGroup, ListGroupItem, Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAProduct, getComments } from '../../Redux/Action/index.js';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function DetailPage() {
	const role = useSelector((state) => state.user.role);
	const product = useSelector((state) => state.singleProduct.product);
	const loading = useSelector((state) => state.singleProduct.isLoading);
	const comments = useSelector((state) => state.comments.comments);

	const [productImg, setImageURL] = useState('');
	const [productName, setName] = useState('');
	const [productPrice, setPrice] = useState('');
	const [productCategory, setCategory] = useState('');
	const [productDescription, setDescription] = useState('');
	const [image, setImage] = useState(product.productImg);

	const [id, setId] = useSearchParams();
	const val = id.get('id');
	console.log(comments);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getComments(val));
		dispatch(getAProduct(val));
	}, []);

	return (
		<div className="detail_page_single_P">
			{loading ? (
				<></>
			) : (
				<>
					{role === 'ADMIN' ? (
						<div className="login_container">
							<div>
								<img
									className="user_image_provider_2 login_logo"
									alt=""
									src={product.productImg}
								/>
								<input
									required
									type="file"
									accept="image/png, image/jpeg"
									placeholder="Product name"
									onChange={(e) => setImage(e.target.files[0])}
									//onSubmit={imageHandler}
								/>

								<button className="obj_image_provider" type="submit">
									Update image
								</button>
							</div>

							<div className="login_page">
								<form className="login_page_form">
									<input
										className="login_page_input"
										type="text"
										placeholder={product.productName}
										value={productName}
										onChange={(e) => setName(e.target.value)}
									/>
									<input
										className="mt-3 login_page_input"
										type="text"
										placeholder={product.productCategory}
										value={productCategory}
										onChange={(e) => setCategory(e.target.value)}
									/>
									<input
										className="mt-3 login_page_input"
										type="number"
										placeholder={product.productPrice}
										value={productPrice}
										onChange={(e) => setPrice(e.target.value)}
									/>
									<textarea
										className="mt-3 login_page_input"
										cols="50"
										rows="4"
										placeholder={product.productDescription}
										value={productDescription}
										onChange={(e) => setDescription(e.target.value)}
									/>

									<button className="login_page_btn1" type="submit">
										Update Product Info
									</button>
								</form>
							</div>
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
