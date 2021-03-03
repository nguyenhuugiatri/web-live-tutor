// Create an array from start to end - 1: range(1, 3) --> [1, 2]
export const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

export const toBase64 = file => {
  if (!file) return null;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export const checkIsFavorite = (data, id) => {
  return data.findIndex(f => f?.secondInfo?.id === id) !== -1;
};

export const blobToImage = blob => {
  return new Promise(resolve => {
    const url = URL.createObjectURL(blob);
    let img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.src = url;
  });
};
