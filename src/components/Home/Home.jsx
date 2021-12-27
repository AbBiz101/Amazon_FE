import './Home.css';
import { useEffect } from 'react';
import { Carousel, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, searchProducts } from '../../Redux/Action/index';
import ProductCompOne from '../ProductCompOne/ProductCompOne';
import ProductCompTwo from '../ProductCompTwo/ProductCompTwo';
import ProductCompThree from '../ProductCompThree/ProductCompThree';
import { useNavigate } from 'react-router';

export default function Home() {
	const history = useNavigate();
	const dispatch = useDispatch();
	const search = useSelector((state) => state.search.stock);
	const product = useSelector((state) => state.product.stock.allProducts);
	const productLoading = useSelector((state) => state.product.stock.isLoading);
	const searchLoading = useSelector((state) => state.search.isLoading);
	const login = async () => {
		const params = new URLSearchParams(window.location.search);
		const accessToken =
			localStorage.getItem('ACCESS_TOKEN') || params.get('accessToken');

		if (!accessToken) {
			history('/');
		} else if (params.get('accessToken')) {
			history('/home');
		}
	};

	useEffect(() => {
		login();
		dispatch(getAllProducts());
		dispatch(searchProducts());
	}, [search]);

	return (
		<div>
			<Carousel className="col-12 home_product_carousel">
				<Carousel.Item>
					<img
						className="d-block w-100"
						src="https://wallpaper.dog/large/980042.jpg"
						alt=""
					/>
				</Carousel.Item>

				<Carousel.Item>
					<img
						className="d-block w-100"
						alt=""
						src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/342d4c106842259.5fad0b22f11da.jpg"
					/>
				</Carousel.Item>

				<Carousel.Item>
					<img
						className="d-block w-100"
						alt=""
						src="https://www.ethicalconsumer.org/sites/default/files/styles/primary_image_xlarge/public/images/2018-05/adidas%20company%20profile.jpg?h=9e499333&itok=w26tnycx"
					/>
				</Carousel.Item>
			</Carousel>

			<div className="container-fluid objectcont mt-5 px-0 d-flex">
				<ProductCompTwo />
				<ProductCompThree />
			</div>

			<div className="container-fluid objectcont_1 mt-5 px-0 d-flex">
				{productLoading ? (
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				) : (
					<>
						{!searchLoading
							? product.map((item) => <ProductCompOne item={item} />)
							: search.map((item) => <ProductCompOne item={item} />)}
					</>
				)}
			</div>
		</div>
	);
}
