import './DetailPage.css';
import { ListGroup, ListGroupItem, Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { getAProduct, getComments } from '../../Redux/Action/index.js';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
export default function DetailPage() {
	const product = useSelector((state) => state.singleProduct.product);
	const loading = useSelector((state) => state.singleProduct.isLoading);
	const loading1 = useSelector((state) => state.comments.isLoading);
	const comments = useSelector((state) => state.comments.comments);
	const [id, setId] = useSearchParams();
	const val = id.get('id');
	console.log(comments);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getComments(val));
		dispatch(getAProduct(val));
	}, []);

	return (
		<div className="detail_page_single_P">
			{loading ? (
				<></>
			) : (
				<>
					<Card className="detail_page_single">
						<Card.Img
							className="p_img"
							variant="top"
							src={product.productImg}
						/>
						<Card.Body>
							<Card.Title>{product.productName}</Card.Title>
						</Card.Body>
						<ListGroup className="list-group-flush">
							<ListGroupItem>Price-{product.productPrice}€</ListGroupItem>
							<ListGroupItem>{product.productCategory}</ListGroupItem>
							<ListGroupItem>{product.productDescription}</ListGroupItem>
							{/* {comments.map((x) => (
								<ListGroupItem>{x}</ListGroupItem>
							))} */}
						</ListGroup>
					</Card>
					<ListGroup className="comment_list">
						<h5>Comments</h5>
						{comments.map((x) => (
							<ListGroup.Item>{x}</ListGroup.Item>
						))}
					</ListGroup>
				</>
			)}
		</div>
	);
}
