import { useState } from 'react';

const Recipe = ({ recipe, remove, user }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };
  // if no user or a wrong user is logged in the remove button is hidden
  // remove button is only shown to the user who has added the blog
  console.log(`Recipe: ${recipe.title} Recipe user: ${recipe.user}`);

  const removeButtonVisible = {
    display: user
      ? user.username === recipe.user?.username
        ? ''
        : 'none'
      : 'none',
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div
        className='recipe m-1 d-flex justify-content-between align-items-center'
        class='m-1 d-flex justify-content-between'
      >
        <p class='text-break'>{`${recipe.title}`}</p>
        <button
          className='view-button btn btn-dark'
          style={hideWhenVisible}
          onClick={toggleVisibility}
        >
          view
        </button>
        <button
          id='hide-button'
          class='btn btn-dark'
          style={showWhenVisible}
          onClick={toggleVisibility}
        >
          hide
        </button>
      </div>
      <div style={showWhenVisible} class='m-2'>
        <div id='moreInfo' style={showWhenVisible}>
          <button
            class='btn btn-dark mb-2'
            className='remove-button btn btn-dark mb-2'
            style={showWhenVisible}
            onClick={() =>
              window.open(recipe.url, '_blank', 'noopener,noreferrer')
            }
          >
            go to recipe
          </button>
        </div>
        <div id='moreInfo' style={showWhenVisible}>
          <button
            class='btn btn-dark m-3'
            className='remove-button btn btn-dark'
            style={showWhenVisible}
            onClick={() => remove(recipe)}
          >
            remove recipe
          </button>
        </div>
      </div>
    </>
  );
};

export default Recipe;
