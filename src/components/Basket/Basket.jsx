import './Basket.css';
import ProductCompFour from '../ProductCompFour/ProductCompFour';
import { AiFillCheckCircle } from 'react-icons/ai/';

export default function Basket() {
	return (
		<div className="basket">
			<div className="basket_left">
				<h4 className="mx-3 my-1 basket_title">Your Items</h4>
				<ProductCompFour />
			</div>
			<div className="basket_right">
				<div className="basket_right_description">
					<AiFillCheckCircle size={20} />
					<p className=" mx-1 d-inline">
						Your order qualifies for Free Domestic and International Delivery.
					</p>
				</div>
				<h4 className="mx-3 mt-1 basket_title">
					Subtotal (2 items): € <strong>202.55</strong>
				</h4>
				<div className="my-3">
					<input className="mx-3" type="checkbox" />
					<h6 className="d-inline">This order contains a gift</h6>
				</div>
				<button className="d-block basket_checkout_btn">
					Proceed to Checkout
				</button>
			</div>
		</div>
	);
}
