//gte || gt & lte || lt need to be matched to $gte & $lte
export const getFilteredQuery = (query) => {
  let filterQuery = JSON.stringify(query);
  filterQuery = filterQuery.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  return JSON.parse(filterQuery);
};

export const getSortBy = (sort) =>
  sort ? sort.replace(",", " ") : "-createdAt";
