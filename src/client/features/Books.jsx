import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllBooksQuery } from "../redux/api/BookApi";
import "../styles/books.css";

function AllBooks() {
  const navigate = useNavigate();
  const { data: books, error, isLoading } = useGetAllBooksQuery();
  const [booksData, setBooksData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (books) {
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setBooksData(filteredBooks);
    }
  }, [books, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) {
    return <div className="books-state">Loading...</div>;
  }

  if (error) {
    return <div className="books-state">Error: Can't Fetch Books</div>;
  }

  return (
    <div className="books-page">
      <div className="books-container">
        <div className="books-header">
          <h1 className="books-title">Book Store</h1>
          <input
            type="text"
            placeholder="Search by book title"
            value={searchQuery}
            onChange={handleSearchChange}
            className="books-search"
          />
        </div>

        <div className="books-grid">
          {booksData.map((book) => (
            <div
              key={book.id}
              className="book-card"
              onClick={() => navigate(`/books/${book.id}`)}
            >
              <div className="book-image-wrapper">
                <img
                  src={book.imgUrl}
                  alt={book.title}
                  className="book-image"
                />
              </div>

              <div className="book-card-body">
                <h2 className="book-title">{book.title}</h2>
                <p className="book-price">${Number(book.price).toFixed(2)}</p>
                <p className="book-description">
                  {book.description.length > 100
                    ? `${book.description.slice(0, 100)}...`
                    : book.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllBooks;