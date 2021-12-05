import './ProductCompThree.css';

export default function ProductCompThree() {
	return (
		<div className="product_comp_three">
			<h4>Recently viewed </h4>
			<div className="recently_viewed_items">
				<div className="recently_viewed">
					<div className="recently_viewed_object">
						<img
							className="product_img"
							alt=""
							src="https://m.media-amazon.com/images/I/81Xog5-EtIL._AC_SS450_.jpg"
						/>

						<h6 className="date">Today</h6>
					</div>
					<div className="recently_viewed_object">
						<img
							className="product_img"
							alt=""
							src="https://m.media-amazon.com/images/I/51RdCgzHn3L._AC_UY500_.jpg"
						/>

						<h6 className="date">Today</h6>
					</div>
				</div>

				<div className="recently_viewed">
					<div className="recently_viewed_object">
						<img
							className="product_img"
							alt=""
							src="https://m.media-amazon.com/images/I/81fYr1B7E4L._AC_SL1500_.jpg"
						/>

						<h6 className="date">Today</h6>
					</div>
					<div className="recently_viewed_object">
						<img
							className="product_img"
							alt=""
							src="https://m.media-amazon.com/images/I/71aHlVyJUlL._AC_UX395_.jpg"
						/>

						<h6 className="date">Today</h6>
					</div>
				</div>
			</div>
		</div>
	);
}
