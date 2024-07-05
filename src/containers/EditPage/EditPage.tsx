import React, { useCallback, useEffect } from 'react';
import axiosApi from '../../axiosApi';
import { useNavigate } from 'react-router-dom';
import { EditPage, PageContent } from '../../types';
import Spinner from '../../components/Spinner/Spinner';

const EditPage = () => {
  const navigate = useNavigate();

  const [editPage, setEditPage] = React.useState<EditPage>({
    page: 'home',
    title: '',
    content: '',
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchEditPost = useCallback(async () => {
    setLoading(true);
    const { data: page } = await axiosApi.get<PageContent | null>(
      `pages/${editPage.page}.json`,
    );
    try {
      if (page !== null) {
        setEditPage({
          ...page,
          title: page.title,
          content: page.content,
          category: editPage.page,
        });
      }
    } finally {
      setLoading(false);
    }
  }, [editPage.page]);

  useEffect(() => {
    void fetchEditPost();
  }, [fetchEditPost]);

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const edited: PageContent = {
      title: editPage.title,
      content: editPage.content,
    };

    try {
      await axiosApi.put(`pages/${editPage.page}.json`, edited);
    } catch (error) {
      console.error('Error happened');
      throw error;
    } finally {
      navigate('/pages/' + editPage.page);
      setLoading(false);
    }
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

  return loading ? (
    <Spinner />
  ) : (
    <>
      <form onSubmit={onFormSubmit}>
        <h2 className="text-center mb-4">Edit post</h2>
        <div className="form-group mb-3 text-start w-75 mx-auto">
          <label htmlFor="page" className="form-label">
            Page
          </label>
          <select
            required
            className="form-control form-select fs-5"
            aria-label="Default select example"
            name="page"
            id="page"
            value={editPage.page}
            onChange={changeForm}
          >
            <option value="home">Home</option>
            <option value="about">About</option>
            <option value="contacts">Contacts</option>
            <option value="projects">Projects</option>
            <option value="partnership">Partnership</option>
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
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default EditPage;
