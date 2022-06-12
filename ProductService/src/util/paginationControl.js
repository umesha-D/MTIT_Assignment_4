"use strict";

/**
 * Pagination control
 *
 * @params {Array of objects - data}
 * @params {Integer page - page number}
 * @params {Integer limit - result count for a page}
 * @return {Array of objects} {Paginated Array of objects}
 */
const paginationControl = (data, page, limit) => {
  const result = {};
  const pageInt = Number.parseInt(page);
  const limitInt = Number.parseInt(limit);

  const startIndex = (pageInt - 1) * limitInt;
  const endIndex = pageInt * limitInt;

  if (startIndex > 0 && data.length > 0) {
    result.previous = {
      page: pageInt - 1,
      limit: limitInt,
    };
  }

  if (endIndex < data.length) {
    result.next = {
      page: pageInt + 1,
      limit: limitInt,
    };
  }

  result.results = data.splice(startIndex, endIndex);
  return result;
};

module.exports.paginationControl = paginationControl;
