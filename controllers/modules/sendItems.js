module.exports = (req, res, items) => {
  res.send({
    items: items.map((item) => {
      const [maxPrice, minPrice] = item.Options.reduce(
        (acc, y) => {
          return [Math.max(acc[0], y.price), Math.min(acc[1], y.price)];
        },
        [item.Options[0].price, item.Options[0].price]
      );
      const purchases = item.Options.reduce((acc, option) => {
        return (acc += option.ListItems.reduce(
          (acc2, list) => acc2 + list.quantity,
          0
        ));
      }, 0);
      const grade = item.Reviews.length > 0
        ? item.Reviews.reduce((acc, review) => {
          return (acc + review.grade)
        }, 0) / item.Reviews.length
        : 0;
      return {
        itemId: item.id,
        name: item.name,
        likes: item.Users.length,
        liked: (req.userId >= 0) ? item.Users.some(user => user.id === req.userId) : false,
        purchases,
        grade,
        reviews: item.Reviews.length,
        maxPrice,
        minPrice,
      };
    }),
  });
};
