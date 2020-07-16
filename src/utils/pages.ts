export function getPages(pageNumber: string | number = 1, limit = 10) {
  const page = Number(pageNumber) - 1 || 0;
  const skip = page * limit;

  return {
    skip,
    limit,
    page
  };
}
