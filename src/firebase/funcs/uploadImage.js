import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

async function uploadImage(file) {
  return new Promise(function (resolve, reject) {
    const storage = getStorage();
    // Để tránh tình trạng đăng cùng ảnh -> dẫn đến cùng tên và không đăng lên db
    const imageName = Date.now() + '-' + file.name;
    const storageRef = ref(storage, 'images/' + imageName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    let downloadURL = '';
    // Upload image
    uploadTask.on(
      'state_changed',
      // Show progress
      snapshot => {},
      error => {
        console.log(error);
        reject();
      },
      async () => {
        // Upload completed successfully, now we can get the download URL
        downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({ URL: downloadURL, name: imageName });
      }
    );
  });
}

export { uploadImage };
