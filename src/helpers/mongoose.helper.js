//gte & lte need to be matched
export const getFilteredQuery = (query) => {
  let filterQuery = JSON.stringify(query);
  filterQuery = filterQuery.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  return JSON.parse(filterQuery);
};
