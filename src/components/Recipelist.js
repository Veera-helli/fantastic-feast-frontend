import Notification from './Notification';
import CreateForm from './CreateForm';
import Recipe from './Recipe';
import LoginForm from './LoginForm';
import recipeService from '../services/recipes';
import { useState } from 'react';

const Recipelist = ({
  username,
  setUsername,
  password,
  setPassword,
  errorMessage,
  setMessage,
  user,
  setUser,
  blogs,
  setBlogs,
  handleLogin,
}) => {
  const remove = async (blog) => {
    //HTTP DELETE
    if (window.confirm(`Are you sure you want to remove ${blog.name}?`)) {
      console.log('DELETING BLOG');
      await recipeService.remove(blog.id);
      const blogs = await recipeService.getAll();
      setBlogs(blogs);
    }
  };

  const create = async (title, author, url) => {
    try {
      await recipeService.create({
        title,
        author,
        url,
      });
      console.log('Created new blog!');
      setMessage('A new blog was added!');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      const blogs = await recipeService.getAll();
      setBlogs(blogs);
    } catch (exception) {
      setMessage('Could not add a new blog');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      console.log('Create form exception!');
    }
  };

  return (
    <div>
      <h2 class='mt-3'>Recipelist</h2>
      <Notification message={errorMessage} />

      {blogs
        .sort((a, b) => b.likes - a.likes) //sorting to order blogs by likes
        .map((blog) => (
          <Recipe key={blog.id} blog={blog} remove={remove} user={user} />
        ))}
    </div>
  );
};

export default Recipelist;

// const LoggedIn = () => {
//   const [visible, setVisible] = useState(false);

//   const hideWhenVisible = { display: visible ? 'none' : '' };
//   const showWhenVisible = { display: visible ? '' : 'none' };

//   const toggleVisibility = () => {
//     setVisible(!visible);
//     console.log(`logged in visibility: ${visible}`);
//   };
//   return (
//     <div>
//       <p>{user.name} logged in</p>
//       <button
//         class='btn btn-primary m-3'
//         onClick={() => {
//           window.localStorage.removeItem('loggedBlogappUser');
//           setUser(null);
//         }}
//       >
//         log out
//       </button>
//       <div>
//         <div style={showWhenVisible}>
//           <button class='btn btn-primary m-3' onClick={toggleVisibility}>
//             create new blog
//           </button>
//         </div>
//         <div style={hideWhenVisible}>
//           <CreateForm create={create} toggleVisibility={toggleVisibility} />

//           <button class='btn btn-primary m-3' onClick={toggleVisibility}>
//             cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Login = () => {
//   const [visible, setVisible] = useState(false);

//   const hideWhenVisible = { display: visible ? 'none' : '' };
//   const showWhenVisible = { display: visible ? '' : 'none' };

//   const toggleVisibility = () => {
//     setVisible(!visible);
//     console.log(`not logged in visibility: ${visible}`);
//   };

//   return (
//     <div>
//       <button
//         class='btn btn-primary m-3'
//         id='init-login'
//         style={hideWhenVisible}
//         onClick={toggleVisibility}
//       >
//         login
//       </button>
//       <div style={showWhenVisible}>
//         <LoginForm
//           handleLogin={handleLogin}
//           username={username}
//           setUsername={setUsername}
//           password={password}
//           setPassword={setPassword}
//         />
//         <button
//           class='btn btn-primary m-3'
//           id='cancel-login'
//           onClick={toggleVisibility}
//         >
//           cancel
//         </button>
//       </div>
//     </div>
//   );
// };
