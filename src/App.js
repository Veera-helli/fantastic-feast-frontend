import { useState, useEffect } from 'react';
import recipeService from './services/recipes';
import loginService from './services/login';
import LoginPage from './components/LoginPage';
import ContentPage from './components/ContentPage';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setMessage] = useState('');

  const loggedUserJSON = window.localStorage.getItem('loggedRecipeappUser');
  const parsedUser = JSON.parse(loggedUserJSON);
  useEffect(() => {
    if (loggedUserJSON) {
      setUser(parsedUser);
      recipeService.setToken(parsedUser.token);
    }
  }, []);

  useEffect(() => {
    console.log('>>', parsedUser);
    const fetchRecipes = async () => {
      console.log('>>>>', parsedUser);
      const newRecipes = await recipeService.getAll(parsedUser?.id);
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

      window.localStorage.setItem('loggedRecipeappUser', JSON.stringify(user));

      recipeService.setToken(user.token);
      setUser(user);
      const newRecipes = await recipeService.getAll(user?.id);
      setRecipes(newRecipes);
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
      errorMessage={errorMessage}
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
