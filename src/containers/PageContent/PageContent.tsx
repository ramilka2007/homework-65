import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import { PageContent } from '../../types';
import Spinner from '../../components/Spinner/Spinner';

const PageContent = () => {
  const { pageName } = useParams();
  const [page, setPage] = useState<PageContent | null>({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPage = useCallback(
    async (url) => {
      setLoading(true);
      try {
        const { data: pageData } = await axiosApi.get<PageContent | null>(url);
        if (!pageData) {
          setPage(null);
        } else {
          setPage(pageData);
        }
      } finally {
        setLoading(false);
      }
    },
    [pageName],
  );

  useEffect(() => {
    if (pageName !== undefined) {
      void fetchPage(`pages/${pageName}.json`);
    } else {
      void fetchPage(`pages/home.json`);
    }
  }, [fetchPage]);
  return loading ? (
    <Spinner />
  ) : (
    page && (
      <div>
        <h1>{page.title}</h1>
        <p>
          <strong>{page.content}</strong>
        </p>
      </div>
    )
  );
};

export default PageContent;
