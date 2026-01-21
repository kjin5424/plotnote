export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const addToOrder = (list, newId, position = -1) => {
  if (position === -1) {
    return [...list, newId];
  }
  const result = [...list];
  result.splice(position, 0, newId);
  return result;
};

export const removeFromOrder = (list, targetId) => {
  return list.filter((id) => id !== targetId);
};

export const reverseOrder = (list) => {
  return list.reverse();
};
