import './ProductCompOne.css';
import { addToCar } from '../../Redux/Action/index';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useNavigate } from 'react-router';

export default function ProductCompOne({ item }) {
	const userName = useSelector((state) => state.user.userName);
	const history = useNavigate();
	const dispatch = useDispatch();
	return (
		<div
			key={item._id}
			onClick={() => history(`/detail/?id=${item._id}`)}
			className="product_comp_one mx-1 mb-3 col-sm-6 col-md-4 col-lg-3 col-xl-2"
		>
			<h4 className="product_name">{item.productCategory}</h4>
			<img className="product_img" alt="productImg" src={item.productImg} />
			<p
				className="product_description"
				onClick={() => history(`/detail/?id=${item._id}`)}
			>
				{item.productDescription}
			</p>
			<h6 className="product_price">
				€<strong>{item.productPrice}</strong>
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
				<button onClick={() => history('/login')} className="add_product_btn">
					Login to buy items!
				</button>
			)}
		</div>
	);
}
