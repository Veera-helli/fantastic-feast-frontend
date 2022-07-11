import { useState } from 'react';
import WeekdayColumn from './WeekdayColumn';
import recipeService from '../services/recipes';
import CreateForm from './CreateForm';

const ContentPage = ({
  user,
  setUser,
  username,
  setUsername,
  password,
  setPassword,
  errorMessage,
  setMessage,
  recipes,
  setRecipes,
  handleLogin,
}) => {
  console.log('content page');

  const remove = async (recipe) => {
    //HTTP DELETE
    if (window.confirm(`Are you sure you want to remove ${recipe.name}?`)) {
      console.log('DELETING RECIPE');
      await recipeService.remove(recipe.id);
      const recipes = await recipeService.getAll(user.id);
      setRecipes(recipes);
    }
  };

  const create = async (title, url, weekday) => {
    try {
      await recipeService.create({
        title,
        url,
        weekday,
      });
      console.log('Created new recipe!');
      setMessage('A new recipe was added!');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      const recipes = await recipeService.getAll(user.id);
      setRecipes(recipes);
    } catch (exception) {
      setMessage('Could not add a new recipe');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      console.log('Create form exception!');
    }
  };

  const [visible, setVisible] = useState(true);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
    console.log(`logged in visibility: ${visible}`);
  };

  console.log(`user: ${user.username}`);

  return (
    <section class='vh-100 mt-4' style={{ backgroundColor: '#ccc' }}>
      <div class='d-flex justify-content-between align-items-center h-100'>
        <div class='d-flex g-0 h-100 col-12'>
          <div class='col-4 col-md-3 col-lg-2 d-none d-sm-block '>
            <div class='container d-flex justify-content-center side-img'>
              <div class='w-100'>
                <div
                  class='card mt-5 m-2 border-0'
                  style={{ backgroundColor: 'rgba(250 250 250 / 0.9)' }}
                >
                  <div class='mx-2 p-2 '>
                    <div>Logged in as </div>
                    <div class='fw-bold fs-4'>{user.name} </div>
                  </div>
                  <button
                    class='btn btn-dark m-2'
                    onClick={() => {
                      window.localStorage.removeItem('loggedRecipeappUser');
                      setUser(null);
                    }}
                  >
                    log out
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class='col-12 col-sm-8 col-md-9 col-lg-10 d-flex justify-content-center align-items-center m-0 h-100'>
            <div class='card content-card d-flex'>
              <div class='mx-3 mt-5'>
                <h1 class='w-100'>Hi {user.name.split(' ')[0]}!</h1>
              </div>
              <div>
                <div>
                  <div style={showWhenVisible}>
                    <button class='btn btn-dark m-3' onClick={toggleVisibility}>
                      create new recipe
                    </button>
                  </div>
                  <div style={hideWhenVisible}>
                    <CreateForm
                      create={create}
                      toggleVisibility={toggleVisibility}
                    />
                  </div>
                </div>
              </div>
              <div class='d-flex mx-2  overflow-auto' style={{ height: '80%' }}>
                <WeekdayColumn
                  weekday={'Monday'}
                  recipes={recipes}
                  remove={remove}
                  user={user}
                />
                <WeekdayColumn
                  weekday={'Tuesday'}
                  recipes={recipes}
                  remove={remove}
                  user={user}
                />
                <WeekdayColumn
                  weekday={'Wednesday'}
                  recipes={recipes}
                  remove={remove}
                  user={user}
                />
                <WeekdayColumn
                  weekday={'Thursday'}
                  recipes={recipes}
                  remove={remove}
                  user={user}
                />
                <WeekdayColumn
                  weekday={'Friday'}
                  recipes={recipes}
                  remove={remove}
                  user={user}
                />
                <WeekdayColumn
                  weekday={'Saturday'}
                  recipes={recipes}
                  remove={remove}
                  user={user}
                />
                <WeekdayColumn
                  weekday={'Sunday'}
                  recipes={recipes}
                  remove={remove}
                  user={user}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentPage;
