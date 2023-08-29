//gte || gt & lte || lt need to be matched to $gte & $lte
export const getFilteredQuery = (query) => {
  let filterQuery = JSON.stringify(query);
  filterQuery = filterQuery.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  return JSON.parse(filterQuery);
};

//to sort the data from mongoose
export const getSortBy = (sort) =>
  sort ? sort.replace(",", " ") : "-createdAt";

//to select the fields
export const getFieldsBy = (fields) =>
  fields ? fields.replace(",", " ") : "-__v";

//Pagination
export const getSkip = (page, limit=10) => (page - 1) * limit;