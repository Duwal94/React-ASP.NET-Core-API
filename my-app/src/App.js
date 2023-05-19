import React, { useState } from "react";
import Constants from "./Utilities/Constants";
import PostCreateform from "./Components/PostCreateform";
import PostUpdateForm from "./Components/PostUpdateform";

export default function App() {

  const [posts, setPosts] = useState([]);
  const [showingCreateNewPostForm, setShowingCreateNewPostForm] = useState(false);
  const [postCurrentlyBeingUpdated, setPostCurrentlyBeingUpdated] = useState(null);



  return (
    <div className="container">
      {(showingCreateNewPostForm === false && postCurrentlyBeingUpdated === null) && (
        <div className="d-flex align-items-center flex-column justify-content-center h-100 bg-dark text-white m-2 rounded-top" id="header">

          <h1>Contacts</h1>
          <div className="d-grid gap-1 col-3 mx-auto">
            <button onClick={getPosts} type="button" class="btn btn-success m-1" >Get Contacts</button>
            <button onClick={() => setShowingCreateNewPostForm(true)} type="button" class="btn btn-success m-1" >Create new Post</button>
          </div>


        </div>)}
        {(posts.length > 0 && showingCreateNewPostForm === false && postCurrentlyBeingUpdated === null) && renderPostsTable()}
      {showingCreateNewPostForm && <PostCreateform onPostCreated={onPostCreated} />}
      {postCurrentlyBeingUpdated !== null && <PostUpdateForm post={postCurrentlyBeingUpdated} onPostUpdated={onPostUpdated} />}
    </div>

  );

  function getPosts() {
    const url = Constants.API_URL_GET_ALL_POSTS;


    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(postsFromServer => {
        console.log(postsFromServer);
        setPosts(postsFromServer);
      })
      .catch((error) => {

        console.log(error);
        alert(error);
      });
  }

  function renderPostsTable() {
    const handleDelete = (id) => {
      deletePostById(id);
    };

    
    return (
      <table className="table table-striped table-bordered table-responsive m-2">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>City</th>
            <th>Region</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            return (
              <tr key={post.id}>
                <th scope="row">{post.id}</th>
                <td>{post.name}</td>
                <td>{post.email}</td>
                <td>{post.phone}</td>
                <td>{post.address}</td>
                <td>{post.city}</td>
                <td>{post.region}</td>
                <td>
                  <button onClick={() => setPostCurrentlyBeingUpdated(post)} type="button" className="btn btn-success m-1">Update</button>
                  <button onClick={() => handleDelete(post.id)} type="button" className="btn btn-danger">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  function onPostCreated(createdPost) {

    setShowingCreateNewPostForm(false);

    if (createdPost === null) {
      return;
    }

    alert("Post created ")
    getPosts();
  }
  

  function onPostUpdated(updatedPost) {
    setPostCurrentlyBeingUpdated(null);

    if (updatedPost === null) {
      return;
    }

    let postsCopy = [...posts];

    const index = postsCopy.findIndex((postsCopyPost, currentIndex) => {
      if (postsCopyPost.id === updatedPost.id) {
        return true;
      }
    });

    if (index !== -1) {
      postsCopy[index] = updatedPost;
    }

    setPosts(postsCopy);

    alert(`Post successfully updated. After clicking OK, look for `);
  }

  function deletePostById(id) {
    const url = `https://localhost:7116/api/Contacts/${id}`;

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          // Post successfully deleted
          // You may want to perform additional actions here, such as updating the UI or fetching updated data
          console.log(`Post with ID ${id} has been deleted.`);
          getPosts();
        } else {
          // Post deletion failed
          console.log(`Failed to delete post with ID ${id}.`);
        }
      })
      .catch(error => {
        console.log(`An error occurred while deleting post with ID ${id}:`, error);
      });
  }

}


