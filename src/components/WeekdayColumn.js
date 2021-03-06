import Recipe from './Recipe';

const WeekdayColumn = ({ weekday, recipes, remove, user }) => {
  console.log(`user: ${user.username}`);
  console.log(`weekday: ${weekday}`);
  console.log(`recipes: ${recipes}`);
  return (
    <div class='col-12 col-md-4'>
      <div
        class='card border-1 ms-1'
        style={{
          backgroundColor: 'rgba(250 250 250 / 0.9)',
        }}
      >
        <div class='p-2 text-center'>
          <div>{weekday}</div>
        </div>
      </div>

      {recipes ? (
        recipes
          .filter((recipe) => recipe.weekday === weekday)
          .map((recipe) => (
            <div
              key={recipe.id}
              class='card border-1 border-dark ms-1 p-1 g-2 mt-1'
              style={{
                backgroundColor: 'rgba(250 250 250 / 0.9)',
              }}
            >
              <Recipe
                key={recipe.id}
                recipe={recipe}
                remove={remove}
                user={user}
              />
            </div>
          ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default WeekdayColumn;
