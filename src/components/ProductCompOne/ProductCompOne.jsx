import './ProductCompOne.css';
import { addToCar } from '../../Redux/Action/index';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
export default function ProductCompOne({ item }) {
	const [show, setShow] = useState(false);
	const [comment, setComment] = useState('');
	const firstName = useSelector((state) => state.user.email);
	const history = useNavigate();
	const dispatch = useDispatch();

	const commentHandler = async (e) => {
		e.preventDefault();
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

	return (
		<div
			key={item._id}
			className="product_comp_one mx-1 mb-3 col-sm-6 col-md-4 col-lg-3 col-xl-2"
		>
			<h4 className="product_name">{item.productName}</h4>
			<img
				onClick={() => history(`/detail/?id=${item._id}`)}
				className="product_img"
				alt="productImg"
				src={item.productImg}
			/>
			<p
				className="product_description"
				onClick={() => history(`/detail/?id=${item._id}`)}
			>
				{item.productDescription}
			</p>
			<h6 className="product_price">
				€<strong>{item.productPrice}</strong>
			</h6>
			<h6 className="product_price">{item.productCategory}</h6>
			<h6 className="product_rating">
				<AiFillStar style={{ color: '#aa9115' }} />
				<AiOutlineStar style={{ color: '#aa9115' }} />
			</h6>
			{firstName ? (
				<button
					onClick={() => dispatch(addToCar())}
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
						<div on submit={commentHandler} className="comment_section">
							<Form.Control
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								type="email"
								placeholder="Enter your comment"
							/>
							<button type="submit">send</button>
						</div>
					) : null}
				</>
			) : (
				<></>
			)}
		</div>
	);
}

