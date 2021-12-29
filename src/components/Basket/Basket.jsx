import './Basket.css';
import { AiFillCheckCircle } from 'react-icons/ai/';
import { useSelector } from 'react-redux';
import ProductCompFour from '../ProductCompFour/ProductCompFour';

export default function Basket() {
	const cartLength = useSelector((state) => state.user.cart.length);
	const cart = useSelector((state) => state.user.cart);
	return (
		<div className="basket">
			<div className="basket_left">
				<h4 className="mx-3 my-1 basket_title">Your Items</h4>
				<ul className="basket_left_ul">
					{cartLength ? (
						cart.map((item, i) => (
							<li>
								<ProductCompFour item={item} i={i} />
							</li>
						))
					) : (
						<h5>Your cart is empty </h5>
					)}
				</ul>
			</div>
			<div className="basket_right">
				<div className="my-2 mx-3 basket_right_description">
					<AiFillCheckCircle size={20} />
					<p className=" mx-1 d-inline">
						Your order qualifies for Free Domestic and International Delivery.
					</p>
				</div>
				<h4 className="mx-3 mt-1 basket_title">
					Subtotal ({cartLength} items): €
					<strong>
						{cartLength
							? cart.reduce(
									(acc, item) => acc + parseFloat(item.productPrice),
									0,
							  )
							: 0}
					</strong>
				</h4>
				<div className="my-3">
					<input className="mx-3" type="checkbox" />
					<h6 className="d-inline">This order contains a gift</h6>
				</div>
				<button className="d-block basket_checkout_btn">
					<h6 className="mt-1">Proceed To Checkout</h6>
				</button>
			</div>
		</div>
	);
}
