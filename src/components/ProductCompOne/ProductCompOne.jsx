import './ProductCompOne.css';
import { addToCar } from '../../Redux/Action/index';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

export default function ProductCompOne({ item }) {
	const userName = useSelector((state) => state.user.userName);
	const dispatch = useDispatch();

	return (
		<div className="product_comp_one">
			<h4 className="product_name">Title</h4>
			<img
				className="product_img"
				alt=""
				src="https://images.unsplash.com/photo-1637966495998-23d7fb7e03be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
			/>
			<p className="product_description" style={{ textoverflow: 'ellipsis' }}>
				Gifts for Men, Magnetic Bracelet Craftsman – Best Men Gifts, Magnetic
				Bracelet Tool with 15 Magnets,Gifts for Men,
			</p>
			<h6 className="product_price">
				€ <strong>25.00</strong>
			</h6>
			<h6 className="product_rating">
				<AiFillStar style={{ color: '#aa9115' }} />
				<AiOutlineStar style={{ color: '#aa9115' }} />
			</h6>
			{userName ? (
				<button
					onClick={() => dispatch(addToCar())}
					className="add_product_btn"
				>
					Add To Basket
				</button>
			) : (
				<h4>Log in to add items to your cart!</h4>
			)}
		</div>
	);
}
