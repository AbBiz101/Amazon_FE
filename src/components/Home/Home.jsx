import './Home.css';
import { Carousel } from 'react-bootstrap';
import ProductCompFive from '../ProductCompFive/ProductCompFive';
import ProductCompFour from '../ProductCompFour/ProductCompFour';
import ProductCompThree from '../ProductCompThree/ProductCompThree';
import ProductCompTwo from '../ProductCompTwo/ProductCompTwo';
import ProductCompOne from '../ProductCompOne/ProductCompOne';

export default function Home() {
	return (
		<div className="home">
			<Carousel>
				<Carousel.Item>
					<img
						className="d-block w-100"
						src="https://wallpaper.dog/large/980042.jpg"
					/>
				</Carousel.Item>

				<Carousel.Item>
					<img
						className="d-block w-100"
						src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/342d4c106842259.5fad0b22f11da.jpg"
					/>
				</Carousel.Item>

				<Carousel.Item>
					<img
						className="d-block w-100"
						src="https://www.ethicalconsumer.org/sites/default/files/styles/primary_image_xlarge/public/images/2018-05/adidas%20company%20profile.jpg?h=9e499333&itok=w26tnycx"
					/>
				</Carousel.Item>
			</Carousel>
			<div className="home_product_row_1"></div>
			<div className="home_product_row_2"></div>
			<div className="home_product_row_3"></div>
			<div className="home_product_row_4"></div>
		</div>
	);
}
