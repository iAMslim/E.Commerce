// import { useGetAllBooks } from "../components/api/BookApi"
import React from "react";
import { createAction } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserByIdQuery } from "../components/api/UserApi";

const AllBooks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { books } = useSelector((state) => state.BooksSlice);
  const { data: usersData } = useGetUserByIdQuery();
  const { token } = useSelector((state) => state.UserSlice);
  const [updateBook] = useUpdateBookMutation();
  const bookReservation = async (e) => {
    let parameters = {
      id: e.target.id,
      token: token,
      body: { available: false },
    };
    let info = await updateBook(parameters);
    console.log(`test`, info);
  };

  return (
    <div className="books">
      <input
        type="number"
        placeholder="Search by book id"
        // value={searchQuery}
        // onChange={handleSearchChange}
      />
      {books.map((books) => (
        <div key={books.id} className="book-card">
          <img
            onClick={() => navigate(`/books/${books.id}`)}
            src={books.imgUrl}
            alt={books.title}
            className="books-image"
          />
          <div className="books-details">
            <h2> {books.title} </h2>
            <h3> {books.price} </h3>
            <p> {books.description} </p>
            <p>{books ? "Available" : "Checked Out"} </p>
            {books && (
              <button id={books.id} onClick={bookReservation}>
                Checkout
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllBooks;
export const setSearchQuery = createAction("search/setQuery");
export const clearSearchQuery = createAction("search/clearQuery");

// function AllBooks() {
//   const navigate = useNavigate();
//   const { data = {}, error, isLoading } = useGetAllBooks();
//   const [booksData, setBooksData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     if (data?.data?.books) {
//       // Filter books based on the search query
//       const filteredBooks = data.data.books.filter((book) =>
//         book.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setBooksData(filteredBooks);
//     }
//   }, [data, searchQuery]);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: Can't Fetch Books - {error.message}</div>;
//   }

//   return (
//     <div className="books">
//       <input
//         type="text"
//         placeholder="Search by book name"
//         value={searchQuery}
//         onChange={handleSearchChange}
//       />
//       {booksData.map((book) => (
//         <div key={book.id} className="book-card">
//           <img
//             onClick={() => navigate(`/books/${book.id}`)}
//             src={book.imageUrl}
//             alt={book.title}
//             className="book-image"
//           />
//           <div className="player-details">
//             <h2> {book.title} </h2>
//             <p> {book.price} </p>
//             <p> {book.description} </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
// export default AllBooks;
// export const setSearchQuery = createAction("search/setQuery");
// export const clearSearchQuery = createAction("search/clearQuery");
