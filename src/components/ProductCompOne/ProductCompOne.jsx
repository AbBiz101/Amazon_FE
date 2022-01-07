import './ProductCompOne.css';
import { addToCar, getAProduct } from '../../Redux/Action/index';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Form } from 'react-bootstrap';

export default function ProductCompOne({ item }) {
	const history = useNavigate();
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [comment, setComment] = useState('');
	const firstName = useSelector((state) => state.user.email);

	const commentHandler = async (e) => {
		try {
			let res = await fetch(
				`https://amazon-be-completed.herokuapp.com/product/${item._id}/comments`,
				{
					method: 'POST',
					body: JSON.stringify({
						comment,
					}),
					headers: { 'Content-Type': 'application/json' },
				},
			);

			if (res.ok) {
				let data = await res.json();
				localStorage.setItem('accessToken', data.accessToken);
				localStorage.setItem('refreshToken', data.refreshToken);
				console.log(data);
				history('/home');
			}
		} catch (error) {
			console.log(error);
			history('/register');
		}
	};

	const goToDetail = async (e) => {
		dispatch(getAProduct(item._id));
		history(`/detail/?id=${item._id}`);
	};

	return (
		<div
			key={item._id}
			className="product_comp_one d-flex mx-2 mt-3 col-sm-5 col-md-4 col-xl-2"
		>
			<h4 className="product_name">{item.productName}</h4>
			<img
				onClick={() => history(`/detail/?id=${item._id}`)}
				className="mt-1 img-fluid product_img"
				alt="productImg"
				src={item.productImg}
			/>

			<p
				className="product_description mt-3 p-0 m-0"
				onClick={(e) => goToDetail()}
			>
				{item.productDescription}
			</p>

			<h6 className="mt-2 product_price">
				€<strong>{item.productPrice}</strong>
			</h6>

			<h6 className="product_price">{item.productCategory}</h6>

			<h6 className="product_rating">
				<AiFillStar style={{ color: '#aa9115' }} />
				<AiOutlineStar style={{ color: '#aa9115' }} />
			</h6>

			{firstName ? (
				<button
					onClick={() => dispatch(addToCar(item))}
					className="add_product_btn"
				>
					Add To Basket
				</button>
			) : (
				<button onClick={() => history('/login')} className="add_product_btn">
					Login to buy items!
				</button>
			)}
			{firstName ? (
				<>
					<p onClick={() => setShow(!show)} className="comment_toggle">
						comment
					</p>
					{show ? (
						<div className="comment_section">
							<Form.Control
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								type="email"
								placeholder="Enter your comment"
							/>
							<button onClick={(e) => commentHandler()} type="submit">
								send
							</button>
						</div>
					) : null}
				</>
			) : (
				<></>
			)}
		</div>
	);
}
