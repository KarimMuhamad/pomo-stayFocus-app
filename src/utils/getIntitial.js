const getInitial = (name) => {
  if (!name) return null;
  const part = name.trim().split(" ");
  if (part.length === 1) return part[0][0].toUpperCase();
  return part[0][0].toUpperCase() + part[1][0].toUpperCase();
}

export default getInitial;