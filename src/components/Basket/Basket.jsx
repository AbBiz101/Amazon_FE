import './Basket.css';
import { AiFillCheckCircle } from 'react-icons/ai/';
import { useSelector } from 'react-redux';
import ProductCompFour from '../ProductCompFour/ProductCompFour';

export default function Basket() {
	const cartLength = useSelector((state) => state.user.cart.length);
	const cart = useSelector((state) => state.user.cart);
	const accessToken = localStorage.getItem('accessToken');

	const sendCartItems = async (e) => {
		try {
			let res = await fetch('http://localhost:3011/user/me/cart', {
				method: 'POST',
				body: JSON.stringify({ cart }),
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${accessToken}`,
				},
			});

			if (res.ok) {
				let data = await res.json();
				console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="basket mt-3 container-fluid px-0 mx-0">
			<div className="row px-0 mx-0">
				<div className="col-12 col-md-8 col-lg-8 col-xl-8 basket_left">
					<h4 className="mx-3 my-1 basket_title">Your Items</h4>
					<ul className="basket_left_ul mx-0 px-0">
						{cartLength ? (
							cart.map((item, i) => (
								<li className="mx-0 px-0">
									<ProductCompFour item={item} i={i} />
								</li>
							))
						) : (
							<h5>Your cart is empty </h5>
						)}
					</ul>
				</div>

				<div className="col-12 col-md-4 col-lg-4 col-xl-4 basket_right">
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
						<h6 className="mt-1" onClick={(e) => sendCartItems()}>
							Proceed To Checkout
						</h6>
					</button>
				</div>
			</div>
		</div>
	);
}

