import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllBooksQuery } from "../components/api/BookApi";
import { createAction } from "@reduxjs/toolkit";
// Import CSS file for styles not sure if we will need this or not
// import "./AllBooks.css"; 

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

     // Check if this is the first time hovering-line 33
     // Add class to indicate first hover-line 35
     // Apply spinning animation-line-37, uncomment lines 31-39 to use
  // const handleMouseEnter = (e) => {
    
  //   if (!e.target.classList.contains("first-hover")) {
      
  //     e.target.classList.add("first-hover");
     
  //     e.target.style.animation = "spin-twice 1s ease-out forwards";
  //   }
  // };


    // Remove spinning animation on mouse leave uncomment lines 43-46 to use
  // const handleMouseLeave = (e) => {
    
  //   e.target.style.animation = "none";
  // };

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
            src={book.imgUrl}
            alt={book.title}
            className="book-image"
          />
          <div className="player-details">
            <h2>{book.title}</h2>
            <p>{book.price}</p>
            <p>{book.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default AllBooks;
export const setSearchQuery = createAction("search/setQuery");
export const clearSearchQuery = createAction("search/clearQuery");

// there are minor differences with the return if we want to use the extra css styling below. just replaces the below return code with the return above and uncomment the lines 7, 31-39, and 43-46 provided you did not add any changes

// return (
//   <div className="books-container">
//     <input
//       type="text"
//       placeholder="Search by book name"
//       value={searchQuery}
//       onChange={handleSearchChange}
//     />
//     {booksData.map((book) => (
//       <div
//         key={book.id}
//         className="book-card"
//         onClick={() => navigate(`/books/${book.id}`)}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <div className="book-info">
//           <img
//             src={book.imgUrl}
//             alt={book.title}
//             className="book-image"
//           />
//           <div className="book-details">
//             <h2>{book.title}</h2>
//             <p>{book.price}</p>
//             <p>{book.description}</p>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// );
// }