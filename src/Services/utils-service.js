export const later = (delay = 1500) =>
  new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });

export const isValidObject = (data) =>
  typeof data === "object" && data ? Object.keys(data).length > 0 : false;
