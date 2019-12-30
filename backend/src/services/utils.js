const createSequelizeFilter = (obj) => {
  const filter = Object.keys(obj).reduce((acc, key) => {
    if (obj[key] !== null && obj[key] !== undefined) {
      if (typeof obj[key] === 'object') {
        if (
          Object.values(obj[key]).every((v) => v !== null && v !== undefined)
        ) {
          acc[key] = obj[key];
          return acc;
        }
        return acc;
      }
      acc[key] = obj[key];
    }
    return acc;
  }, {});

  // do not want to filter by anything so returning true
  if (!Object.values(filter).length) {
    return {};
  }

  return filter;
};

module.exports = {
  createSequelizeFilter,
};
