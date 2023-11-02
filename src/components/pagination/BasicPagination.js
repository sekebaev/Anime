import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import "./Pagin.css";

export default function BasicPagination({ currentPage, onPageChange, pageCount }) {
  return (
    <Stack spacing={2}>
      <Pagination count={pageCount}
        page={currentPage}
        onChange={onPageChange}/>
      {/* <Pagination count={10} color="primary" />
      <Pagination count={10} color="secondary" />
      <Pagination count={10} disabled /> */}
    </Stack>
  );
}
