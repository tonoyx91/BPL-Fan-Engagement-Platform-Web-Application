import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

function Community() {
  const isAdmin = localStorage.getItem('email') === 'admin.bpl.23@gmail.com';
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('email'));

  useEffect(() => {
    // Define a function to fetch comments
    const fetchComments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/comments');
        if (response.status === 200) {
          // Update the comments state with the fetched data
          setComments(response.data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    // Call the fetchComments function when the component mounts
    fetchComments();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!loggedIn) {
      alert('You must log in to post comments.');
      return;
    }
    if (newComment.trim() === '') {
      alert('Please enter a comment.');
      return;
    }

    const date = new Date().toISOString(); // Convert date to ISO format

    try {
      const payload = {
        email: loggedIn,
        comment: newComment,
        date: date, // Use the ISO format date
      };

      if (newImage) {
        payload.image = newImage;
      }

      const response = await axios.post('http://localhost:5000/api/store-comment', payload);
      if (response.status === 201) {
        // Handle successful comment submission
        alert('Comment posted successfully!');
        window.location.reload();
        // After posting a new comment, fetch comments again to update the list
        fetchComments();
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setNewComment('');
      setNewImage(null);
      setImagePreview(null); // Clear the image preview after posting
    }
  };

  const handleDeleteComment = async (comment) => {
    try {
      const response = await axios.delete('http://localhost:5000/api/delete-comment', {
        data: { comment }, // Pass the comment string in the request body
      });

      if (response.status === 200) {
        alert('Comment deleted successfully!');
        window.location.reload();
        // Fetch comments again to update the list
        fetchComments();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setNewImage(selectedImage);

      // Show image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='h-full bg-black w-full font-poppins'>
        <div className='max-w-5xl mx-auto p-4'>
          <h1 className='text-3xl font-extrabold text-lime-400 mb-4 text-center'>
            BPL FAN COMMUNITY
          </h1>
          <p className='text-xl font-bold text-blue-300 mb-6 text-center'>
            Share! Explore! Enjoy!
          </p>

          {loggedIn ? (
            <form onSubmit={handleCommentSubmit} className='mb-6 flex flex-col space-y-4 items-center'>
              <textarea
                className='w-full h-32 px-4 py-2 text-white bg-gray-800 border rounded-lg focus:outline-none focus:border-blue-500'
                placeholder='Write your comment...'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              ></textarea>
              <div className='flex items-center space-x-4'>
                <label className='bg-green-500 hover:bg-green-700 text-white font-bold text-s px-2 rounded focus:outline-none focus:bg-green-700 cursor-pointer'>
                  Add Image
                  <input type='file' accept='image/*' onChange={handleImageChange} className='hidden' />
                </label>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt='Image Preview'
                    className='max-h-32 rounded-lg'
                  />
                )}
                <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg py-0 px-6 rounded focus:outline-none focus:bg-blue-700'>
                  Post
                </button>
              </div>
            </form>
          ) : (
            <p className='text-red-400 text-center font-semibold py-4'>
              Please log in to post comments!!!
            </p>
          )}

          {/* Display Comments */}
          <div className='grid grid-cols-2 gap-4'>
            {comments.map((comment) => (
              <div
                key={comment._id} // Use _id as the unique key
                className='bg-gray-800 rounded-lg p-4 text-white relative'
              >
                <p className='text-gray-500 text-sm'>{comment.date}</p>
                <p className='text-lg'>{comment.comment}</p>
                {comment.image && (
                  <img
                    src={comment.image}
                    alt='Comment'
                    className='mt-2 rounded-lg'
                  />
                )}
                <p className='text-gray-500 text-sm'>
                  Posted by: {comment.email}
                </p>
                {isAdmin && (
                  <button
                    onClick={() => handleDeleteComment(comment.comment)} // Pass the comment string to the delete function
                    className='absolute top-2 right-2 text-red-500 hover:text-red-700'
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Community;
