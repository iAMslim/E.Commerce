import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import { useGetBookByIdQuery } from "../components/api/BookApi";

const SingleBook = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { data: book, isLoading, isError } = useGetBookByIdQuery(id);

  let bookDetails = null;

  if (isLoading) {
    bookDetails = <div>Loading...</div>;
  } else if (isError) {
    bookDetails = <div>Error: Unable to fetch book details</div>;
  } else if (book) {
    const { name, price, description } = book;

    bookDetails = (
      <div>
        <h2>{name}</h2>
        <p>Price: {price}</p>
        <p>Description: {description}</p>
      </div>
    );
  }

  return (
  <>
    <Navigation></Navigation>
    <div>
    {bookDetails}
    </div>;
    </>
  )
};

export default SingleBook;

//   useEffect(() => {
//     dispatch(useGetBookByIdQuery(id));
//   }, [dispatch, id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="book-details">
//       <div className="book-card">
//         <img
//           onClick={() => navigate(`/books`)}
//           src={book?.coverimage}
//           alt={book?.title}
//           className="book-image"
//         />
//         <div className="book-details">
//           <h2>Price: {book?.price}</h2>
//           <p>Title: {book?.title}</p>
//           <p>Description: {book?.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleBook;
