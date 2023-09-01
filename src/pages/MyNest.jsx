import React from "react";

const MyNest = (props) => {
  const { location } = props;
  const userPosts = location.state ? location.state.userPosts : [];

  return (
    <div>
      <h1>My Nest</h1>
      {userPosts.length > 0 ? (
        <ul>
          {userPosts.map((post, index) => (
            <li key={index}>
              <h3>{post.listingName}</h3>
              <p>{post.postContent}</p>
              {/* ... Other post details ... */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts by you yet.</p>
      )}
    </div>
  );
};

export default MyNest;
