import './Home.css';
import { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ProductCompOne from '../ProductCompOne/ProductCompOne';
import ProductCompTwo from '../ProductCompTwo/ProductCompTwo';
import { getAllProducts } from '../../Redux/Action/index';
import ProductCompThree from '../ProductCompThree/ProductCompThree';

export default function Home() {
	const search = useSelector((state) => state.search.stock);
	const searchLoading = useSelector((state) => state.search.isLoading);
	const product = useSelector((state) => state.product.stock);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllProducts());
		console.log(product, searchLoading);
	}, [search]);
	return (
		<div className="home">
			<div className="home_product_carousel">
				<Carousel>
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
			</div>

			<div className="mb-2 home_product_promotion_row">
				<ProductCompTwo />
				<ProductCompThree />
			</div>

			<div className="home_product_row_1">
				{searchLoading
					? product.map((item) => <ProductCompOne item={item} />)
					: search.map((item) => <ProductCompOne item={item} />)}
			</div>
		</div>
	);
}
