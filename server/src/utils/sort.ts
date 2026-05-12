import type { SortOrder } from 'mongoose';

const buildSortQuery = (sort: string): Record<string, SortOrder> => {
  if (sort === 'latest') {
    return { createdAt: -1 }; // Sort by createdAt in descending order
  } else {
    return { createdAt: 1 }; // Sort by createdAt in ascending order
  }
};

export default buildSortQuery;
