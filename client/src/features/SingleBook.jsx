import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetBookByIdQuery } from "../components/api/BookApi";
// import { clearBook } from "../components/slices/BooksSlice";

const SingleBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  
const { books, book } = useSelector((state) => state.BooksSlice)

let data = []
if (!books.length) {
  useGetBookByIdQuery(id)
  data.push(book)
} else {
  data = books.filter((books) => books.id === Number(id))
}

  return data[0] ? (
    <div className="book-details">
      <div className="book-card">
        <img
          onClick={() => navigate(`/api/books`)}
          src={data[0].imgUrl}
          alt={data[0].title}
          className="book-image"
        />
        <div className="book-details">
          <h2>Author: {data[0].author}</h2>
          <p>Title: {data[0].title}</p>
          <p>Description: {data[0].description}</p>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default SingleBook;
