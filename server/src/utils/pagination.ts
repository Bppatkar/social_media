interface PaginationQuery {
  page?: string;
  limit?: string;
}

const getPagination = (query: PaginationQuery) => {
  // current page
  const page = Math.max(Number(query.page) || 1, 1);  // minimum page is 1 not in zero or negative

  // limit per page
  const limit = Math.max(Number(query.limit) || 5, 1);

  // skip calculation
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

export default getPagination;
