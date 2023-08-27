import { z } from "zod";

export const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const base64ToFile = (
  base64String: string,
  filename = "image.png",
  mimeType = "image/png"
) => {
  const [, base64] = base64String.split(",");

  if (!base64) throw new Error("Invalid base64");
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const file = new File(byteArrays, filename, { type: mimeType });

  return file;
};

export const formValuesSchema = z.object({
  // {errors.tokenName && <FormError>{errors.tokenName.message}</FormError>}
  title: z.string().min(1, "Title name must be at least 1 character"),
  duration: z.string(),
  description: z.string(),
  portion: z.string(),
  ingredients: z.array(
    z.object({
      ingredient: z.string(),
      quantity: z.string(),
    })
  ),
  image: z
    .any()
    .transform(async (value: File[]) =>
      Array.isArray(value)
        ? {
            fileName: value[0]?.name,
            blob: value[0] && (await fileToBase64(value[0])),
          }
        : value
    )
    .optional(),
});

export const formValuesWithIdSchema = z.object({
  id: z.number(),
  data: formValuesSchema,
});

export type FormValues = z.infer<typeof formValuesSchema>;
export type FormValuesWithId = z.infer<typeof formValuesWithIdSchema>;
