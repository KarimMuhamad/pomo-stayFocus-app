const getColorName = (name) => {
  if (!name) return null;
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 180}, 50%, 25%)`;
  return color;
}

export default getColorName;