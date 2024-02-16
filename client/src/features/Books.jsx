import { useGetAllBooks } from "../components/api/api"
import React, { useState, useEffect } from "react";
import { createAction } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";


function AllBooks() {
  const navigate = useNavigate();
  const { data = {}, error, isLoading } = useGetAllBooks();
  const [booksData, setBooksData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    if (data?.data?.books) {
      // Filter books based on the search query
      const filteredBooks = data.data.books.filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setBooksData(filteredBooks);
    }
  }, [data, searchQuery]);

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
        <div key={book.id} className="book-card">
          <img
            onClick={() => navigate(`/books/${book.id}`)}
            src={book.imageUrl}
            alt={book.title}
            className="book-image"
          />
          <div className="player-details">
            <h2> {book.title} </h2>
            <p> {book.price} </p>
            <p> {book.description} </p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default AllBooks;
export const setSearchQuery = createAction("search/setQuery");
export const clearSearchQuery = createAction("search/clearQuery");
