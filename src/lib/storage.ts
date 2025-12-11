import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Uploads a file to Firebase Storage and returns the download URL.
 * @param file The file object to upload.
 * @param path The path in storage (e.g., 'campaigns/image.jpg').
 * @returns The download URL of the uploaded file.
 */
export const uploadImage = async (file: File, path: string): Promise<string> => {
    if (!file) throw new Error("No file provided");

    const storageRef = ref(storage, path);

    try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};
