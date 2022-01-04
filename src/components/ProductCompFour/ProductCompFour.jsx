import './ProductCompFour.css';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../Redux/Action/index';

export default function ProductCompFour({ i, item }) {
	const dispatch = useDispatch();

	return (
		<div className="product-comp-four  my-0 p-0 ">
			<div className="firstBox d-flex ">
				<img alt="" src={item.productImg} />
				<hp className="pdItem mx-2 ">{item.productDescription}</hp>
			</div>

			<div className="product_four_description my-0 mx-0 py-0 px-0">
				<h5>{item.productName}</h5>
				<div className="d-flex mt-1 buttonAndPrice">
					<p className="my-0" style={{ color: 'green' }}>
						In stock
					</p>
					<h6 className="my-0 px-0">Price-€{item.productPrice}</h6>
				</div>
				<button
					onClick={() => {
						dispatch(removeFromCart(i));
					}}
					className="mt-2 mb-2 product_four_btn p-1"
				>
					<h6 className="my-0">Remove From Basket</h6>
				</button>
			</div>
		</div>
	);
}
