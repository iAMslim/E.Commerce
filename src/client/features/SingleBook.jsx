import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetBookByIdQuery } from "../redux/api/BookApi";
import { useCreateCartMutation } from "../redux/api/CartApi";
import "../styles/singleBook.css";

const SingleBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books } = useSelector((state) => state.BooksSlice);

  const { data: fetchedBook } = useGetBookByIdQuery(id, {
    skip: books.length > 0,
  });

  const [createCart] = useCreateCartMutation();

  let book = null;

  if (books.length) {
    book = books.find((b) => b.id === Number(id));
  } else if (fetchedBook) {
    book = fetchedBook;
  }

  console.log(book);

  const handleAddToCart = async () => {
    try {
      await createCart({
        books: [{ bookId: book.id, quantity: 1 }],
      });
      alert("Book added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (!book) return <div className="single-book-state">Loading...</div>;

  return (
    <div className="single-book-page">
      <div className="single-book-container">
        <div className="single-book-layout">

          <div className="single-book-image-wrapper">
            <img
              src={book.imgUrl}
              alt={book.title}
              
              className="single-book-image"
              onClick={() => navigate("/books")}
            />
          </div>

          <div className="single-book-details">
            <h1 className="single-book-title">{book.title}</h1>
            <p className="single-book-author">By {book.author}</p>
            <p className="single-book-price">
              ${Number(book.price).toFixed(2)}
            </p>

            <p className="single-book-description">
              {book.description}
            </p>

            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SingleBook;