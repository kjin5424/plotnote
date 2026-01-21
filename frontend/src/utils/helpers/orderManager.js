export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const addToOrder = (order, newId, position = -1) => {
  if (position === -1) {
    return [...order, newId];
  }
  const result = [...order];
  result.splice(position, 0, newId);
  return result;
};

export const removeFromOrder = (order, targetId) => {
  return order.filter((id) => id !== targetId);
};
