import React from 'react';
import axiosApi from '../../axiosApi';
import { useNavigate } from 'react-router-dom';
import { EditPage } from '../../types';

const EditPage = () => {
  const navigate = useNavigate();

  const [editPage, setEditPage] = React.useState<EditPage>({
    category: 'about',
    title: '',
    content: '',
  });

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const edited: EditPage = {
      title: editPage.title,
      content: editPage.content,
    };

    try {
      await axiosApi.put(`/pages/${editPage.category}.json`, edited);
    } catch (error) {
      console.error('Error happened');
      throw error;
    } finally {
      navigate('/pages/' + editPage.category);
    }

    setEditPage({
      title: '',
      content: '',
    });
  };

  const changeForm = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setEditPage((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <>
        <form onSubmit={onFormSubmit}>
          <h2 className="text-center mb-4">Edit post</h2>
          <div className="form-group mb-3 text-start w-75 mx-auto">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              required
              className="form-control form-select fs-5"
              aria-label="Default select example"
              name="category"
              id="category"
              value={editPage.category}
              onChange={changeForm}
            >
              <option value="about">About</option>
              <option value="contacts">Contacts</option>
              <option value="projects">Projects</option>
              <option value="partnership">Partnership</option>
              <option value="reviews">Reviews</option>
            </select>
          </div>
          <div className="form-group mb-3 text-start w-75 mx-auto">
            <label htmlFor="Title" className="form-label">
              Title
            </label>
            <input
              required
              type="text"
              name="title"
              id="title"
              className="form-control"
              value={editPage.title}
              onChange={changeForm}
            />
          </div>
          <div className="form-group mb-3 text-start w-75 mx-auto">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea
              required
              name="content"
              id="content"
              className="form-control"
              value={editPage.content}
              onChange={changeForm}
            ></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Edit
            </button>
          </div>
        </form>
      </>
    </>
  );
};

export default EditPage;
