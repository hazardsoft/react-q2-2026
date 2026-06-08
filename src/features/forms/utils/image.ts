export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg'] as const;

export const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve(typeof reader.result === 'string' ? reader.result : '');
    reader.onerror = () =>
      reject(reader.error ?? new Error('Could not read the image file'));
    reader.readAsDataURL(file);
  });
