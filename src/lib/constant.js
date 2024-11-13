export const ids = (id1, id2) => {
  if (id1 > id2) {
    return id1 + "_" + id2;
  } else {
    return id2 + "_" + id1;
  }
};

export function groupByDate(documents) {
  return documents?.reduce((acc, doc) => {
    const date = new Date(doc.$createdAt).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(doc);
    return acc;
  }, {});
}
