// RegistrationController.js (Separate file)
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export async function registerUser(displayName, email, password, firstName, lastName, role, location, file) {
  try {
    // Create user
    const res = await createUserWithEmailAndPassword(auth, email, password);

    // Create a unique image name
    const date = new Date().getTime();
    const storageRef = ref(storage, `userDisplayPhotos/${displayName + date}`);

    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          // Update profile
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });
          // Create user on Firestore
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            firstName,
            lastName,
            role,
            location,
            photoURL: downloadURL,
          });

          // Create empty user chats on Firestore
          await setDoc(doc(db, "userChats", res.user.uid), {});
        } catch (err) {
          console.error(err);
          throw err;
        }
      });
    });

    return res.user.uid;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
