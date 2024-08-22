const setItemToLocalStorage = (key: string, item: unknown) => {
  const jsonItem = JSON.stringify(item);
  localStorage.setItem(key, jsonItem);
};

const getItemFromLocalStorage = <ItemType>(key: string) => {
  const item = localStorage.getItem(key);

  if (!item) {
    return undefined;
  }

  const parseItem: ItemType | undefined = JSON.parse(item);
  return parseItem;
};

const deleteLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};

export { setItemToLocalStorage, getItemFromLocalStorage, deleteLocalStorageItem };
