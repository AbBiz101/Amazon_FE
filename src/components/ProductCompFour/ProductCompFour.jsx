import './ProductCompFour.css';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../Redux/Action/index';

export default function ProductCompFour({ i, item }) {
	const dispatch = useDispatch();

	return (
		<div className="product-comp-four">
			<img
				alt=""
				src="https://images.unsplash.com/photo-1637966495998-23d7fb7e03be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
			/>

			<div className="product_four_description">
				<h4>
					Product img elements must have an alt prop, either with meaningful
					text, or an empty string for decorative images
				</h4>
				<p className="my-0" style={{ color: 'green' }}>
					In stock
				</p>
				<button className="product_four_btn">
					<h6
						onClick={() => {
							console.log(i);
							dispatch(removeFromCart(i));
						}}
						className="mt-1"
					>
						Remove From Basket
					</h6>
				</button>
			</div>

			<div className="product_price">
				<h4>€ Price</h4>
			</div>
		</div>
	);
}
