import './ProductCompFour.css';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../Redux/Action/index';

export default function ProductCompFour({ i, item }) {
	const dispatch = useDispatch();

	return (
		<div className="product-comp-four">
			<img alt="" src={item.productImg} />

			<div className="product_four_description">
				<h4>{item.productName}</h4>
				<h6>{item.productDescription}</h6>
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
				<h5>Price-€{item.productPrice}</h5>
			</div>
		</div>
	);
}
