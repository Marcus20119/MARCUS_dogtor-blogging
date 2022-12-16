import { deleteObject, getStorage, ref } from 'firebase/storage';

async function deleteOldImage({ imgName, folderRef = 'images/' }) {
  const storage = getStorage();
  const imageRef = ref(storage, folderRef + imgName);
  await deleteObject(imageRef);
}

export { deleteOldImage };
