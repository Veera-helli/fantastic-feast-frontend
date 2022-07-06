import { useState } from 'react';

const CreateForm = ({ create, toggleVisibility }) => {
  const [title, setTitle] = useState('');
  const [url, setURL] = useState('');
  const [weekday, setWeekday] = useState('');

  const handleCreate = (event) => {
    event.preventDefault();
    create(title, url, weekday);
    setTitle('');
    setURL('');
    setWeekday('');
  };

  return (
    <>
      <h3 class='mx-3 fs-4'>Create New Blog</h3>
      <form onSubmit={handleCreate}>
        <div class='mx-3'>
          Title:
          <input
            className='titleInput m-1'
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div class='mx-3'>
          URL:
          <input
            className='urlInput m-1'
            type='text'
            value={url}
            name='URL'
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <div class='mx-3'>
          Weekday:
          <input
            className='weekdayInput m-1'
            type='text'
            value={weekday}
            name='Weekday'
            onChange={({ target }) => setWeekday(target.value)}
          />
        </div>
        <button
          class='btn btn-dark'
          className='create-button btn btn-dark m-3 ms-5'
          type='submit'
          onClick={toggleVisibility}
        >
          create
        </button>

        <button class='btn btn-dark m-3 ms-1' onClick={toggleVisibility}>
          cancel
        </button>
      </form>
    </>
  );
};

export default CreateForm;
