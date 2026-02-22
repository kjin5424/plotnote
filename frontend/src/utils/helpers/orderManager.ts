export const reorder = (list: string[], startIndex: number, endIndex: number): string[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const addToOrder = (list: string[], newId: string, position: number = -1): string[] => {
  if (position === -1) {
    return [...list, newId];
  }
  const result = [...list];
  result.splice(position, 0, newId);
  return result;
};

export const removeFromOrder = (list: string[], targetId: string): string[] => {
  return list.filter((id) => id !== targetId);
};

export const reverseOrder = (list: string[]): string[] => {
  return list.reverse();
};
