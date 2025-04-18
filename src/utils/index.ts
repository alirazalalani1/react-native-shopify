const increaseQuantity = state => {
  state(prev => prev + 1);
};

const decreaseQuantity = state => {
  state(prev => prev - 1);
};
