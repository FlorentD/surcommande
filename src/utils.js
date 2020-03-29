export const total = (withEggs, cartType) => {
  return (function () {
    switch (true) {
      case withEggs && cartType === "cart15":
        return 17;
      case !withEggs && cartType === "cart15":
        return 15;
      case withEggs && cartType === "cart20":
        return 22;
      case !withEggs && cartType === "cart20":
        return 20;
      default:
        return 0;
    }
  })();
};
