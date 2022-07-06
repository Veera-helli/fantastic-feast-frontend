import { useState, useEffect } from 'react';
import Recipelist from './components/Recipelist';
//import LoginForm from './components/LoginForm';
import recipeService from './services/recipes';
import loginService from './services/login';
import LoginPage from './components/LoginPage';
import heroimg from './images/front_hero.jpg';
import ContentPage from './components/ContentPage';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setMessage] = useState('');

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      recipeService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      const newRecipes = await recipeService.getAll();
      setRecipes(newRecipes);
    };
    fetchRecipes();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      recipeService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setMessage('Wrong username or password!');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const loginPage = () => (
    <LoginPage
      handleLogin={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    />
  );

  const contentPage = () => (
    <ContentPage
      user={user}
      setUser={setUser}
      setMessage={setMessage}
      recipes={recipes}
      setRecipes={setRecipes}
    />
  );

  return (
    <div style={{ backgroundColor: '#ccc' }}>
      <nav class='navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top'>
        <div class='container'>
          <div class='navbar-brand'>Fantastic Feast</div>
        </div>
      </nav>
      {user === null ? loginPage() : contentPage()}
    </div>
  );
};

export default App;
