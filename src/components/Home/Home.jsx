import './Home.css';
import { useEffect } from 'react';
import { Carousel, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllProducts,
	searchProducts,
	logIn,
} from '../../Redux/Action/index';
import ProductCompOne from '../ProductCompOne/ProductCompOne';
import ProductCompTwo from '../ProductCompTwo/ProductCompTwo';
import ProductCompThree from '../ProductCompThree/ProductCompThree';
import { useNavigate } from 'react-router';
import Footer from '../Footer/Footer';
import { useSearchParams } from 'react-router-dom';

export default function Home() {
	const history = useNavigate();
	const dispatch = useDispatch();
	const search = useSelector((state) => state.search.stock);
	const searchLength = useSelector((state) => state.search.stock.length);
	const product = useSelector((state) => state.product.stock.allProducts);
	const productLoading = useSelector((state) => state.product.isLoading);
	const searchLoading = useSelector((state) => state.search.isLoading);
	const [id, setId] = useSearchParams();
	const accessToken = id.get('accessToken');
	localStorage.setItem('accessToken', accessToken);

	const cheOauthLogin = async () => {
		try {
			let req = await fetch(
				'https://amazon-be-completed.herokuapp.com/user/getUser',
				{
					headers: { authorization: `Bearer ${accessToken}` },
				},
			);

			if (req.ok) {
				const data = await req.json();
				dispatch(logIn(data));
			} else {
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		cheOauthLogin();
	}, []);

	useEffect(() => {}, [search]);

	useEffect(() => {
		dispatch(searchProducts());
		dispatch(getAllProducts());
	}, []);

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

			<div className="container-fluid objectcont px-0 d-flex">
				<ProductCompTwo />
				<ProductCompThree />
			</div>
			<br />
			<div className=" container-fluid objectcont_1 px-0 d-flex gx-5 ">
				{productLoading ? (
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				) : (
					<>
						{searchLength
							? search.map((item) => <ProductCompOne item={item} />)
							: product.map((item) => <ProductCompOne item={item} />)}
					</>
				)}
			</div>
			<Footer />
		</div>
	);
}
