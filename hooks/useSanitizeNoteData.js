export const sanitizeNoteData = (rawData) => {
  return {
    ...rawData,
    priority: Number(rawData.priority),
  };
};