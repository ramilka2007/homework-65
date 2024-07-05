import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import { PageContent } from '../../types';

const PageContent = () => {
  const { pageName } = useParams();
  const [page, setPage] = useState<PageContent | null>({
    title: '',
    content: '',
  });

  const fetchPage = useCallback(async () => {
    try {
      const { data: pageData } = await axiosApi.get<PageContent | null>(
        `/pages/${pageName}.json`,
      );
      if (!pageData) {
        setPage(null);
      } else {
        setPage(pageData);
      }
    } finally {
    }
  }, [pageName]);

  useEffect(() => {
    void fetchPage();
  }, [fetchPage]);
  return (
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
