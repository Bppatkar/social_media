const buildSearchQuery = (field: string, search: string) => {
  if (!search) return {};

  return {
    [field]: { $regex: search, $options: 'i' },
  };
};

export default buildSearchQuery;
