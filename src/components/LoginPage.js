const Login = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div class='form-outline mb-3'>
        <input
          id='username'
          type='text'
          value={username}
          name='Username'
          class='form-control form-control-lg'
          onChange={({ target }) => setUsername(target.value)}
          placeholder='Username'
        />
      </div>
      <div class='form-outline mb-4'>
        <input
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
          class='form-control form-control-lg'
          placeholder='Password'
        />
      </div>
      <button class='btn btn-dark w-100' id='login-button' type='submit'>
        Login
      </button>
    </form>
  );
};

const LoginPage = (props) => (
  <section class='vh-100 pt-3 login-page' style={{ backgroundColor: '#ccc' }}>
    <div class='container h-100'>
      <div class='row d-flex justify-content-center align-items-center h-100'>
        <div class='col-10 col-xl-8'>
          <div
            class='card text-black shadow overflow-auto'
            style={{ borderRadius: '1rem' }}
          >
            <div class='row g-0 h-100 d-flex justify-content-center'>
              <div class='col-sm-5 d-none d-md-block mh-100'>
                <div class='half-card'></div>
              </div>
              <div class='col-md-7 d-flex justify-content-center align-items-center m-4 m-sm-5 m-md-0 h-100'>
                <div class='ms-0 ms-sm-3 m-md-5'>
                  <h1 class='my-3 w-100'>Welcome!</h1>
                  <h5
                    class='mb-sm-3 fw-normal'
                    style={{ letterSpacing: '1px' }}
                  >
                    Log in to your account
                  </h5>
                  <Login {...props} />
                  <div class='divider d-flex align-items-center my-4'>
                    <p class='text-center fw-bold mx-3 mb-0'>Or</p>
                  </div>
                  <button
                    class='btn btn-dark w-100'
                    id='login-button'
                    type='submit'
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default LoginPage;
