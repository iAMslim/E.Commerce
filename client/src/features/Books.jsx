import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserByIdQuery } from "../components/api/UserApi";
import { useGetAllBooksQuery } from "../components/api/BookApi";
import React, { useEffect } from "react";
import { createAction } from "@reduxjs/toolkit";
import { useUpdateCartMutation } from "../components/api/CartApi";

function AllBooks() {
  const navigate = useNavigate();
  const {data: books, error, isLoading }= useGetAllBooksQuery();
  const result = useGet
  const [booksData, setBooksData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useSelector((state) => state.authSlice)

  useEffect(() => {
    if (books) {
      const filteredBooks = books.filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setBooksData(filteredBooks);
    }
  }, [booksData, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Can't Fetch Books - {error.message}</div>;
  }

  return (
    <div className="books">
      <input
        type="text"
        placeholder="Search by book name"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {booksData.map((book) => (
        <div key={books.id} className="book-card">
          <img
            onClick={() => navigate(`/books/${books.id}`)}
            src={books.imageUrl}
            alt={books.title}
            className="book-image"
          />
          <div className="player-details">
            <h2> {books.title} </h2>
            <p> {books.price} </p>
            <p> {books.description} </p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default AllBooks;
export const setSearchQuery = createAction("search/setQuery");
export const clearSearchQuery = createAction("search/clearQuery");
