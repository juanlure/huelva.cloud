import { supabaseAdmin } from './supabase';

const BUCKET_NAME = 'media';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

/**
 * Sube un archivo Buffer al bucket 'media' y devuelve la URL pública.
 */
export async function uploadFile(
  fileBuffer: Buffer | ArrayBuffer, 
  fileName: string, 
  contentType: string = 'image/jpeg'
): Promise<string | null> {
  try {
    const { data, error } = await supabaseAdmin
      .storage
      .from(BUCKET_NAME)
      .upload(fileName, fileBuffer, {
        contentType,
        upsert: true
      });

    if (error) {
      console.error(`[STORAGE] Error subiendo ${fileName}:`, error.message);
      // Si el error es "Bucket not found", es crítico.
      return null;
    }

    // Construir URL pública
    // Formato: https://<project>.supabase.co/storage/v1/object/public/<bucket>/<file>
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${fileName}`;
    console.log(`[STORAGE] Subido: ${publicUrl}`);
    return publicUrl;

  } catch (e) {
    console.error("[STORAGE] Excepción en upload:", e);
    return null;
  }
}

/**
 * Descarga una imagen externa y la sube a Supabase Storage.
 * Evita hotlinking y asegura persistencia.
 */
export async function uploadFromUrl(imageUrl: string, slug: string): Promise<string | null> {
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Extensión simple
    const ext = imageUrl.split('.').pop()?.split(/[?#]/)[0] || 'jpg';
    const fileName = `${slug}-${Date.now()}.${ext.substring(0, 4)}`;

    return await uploadFile(buffer, fileName, res.headers.get('content-type') || 'image/jpeg');
  } catch (e) {
    console.error(`[STORAGE] Fallo descargando URL ${imageUrl}:`, e);
    return null; // Fallback: devolver null para que se use la original o error
  }
}

/**
 * Sube una imagen en Base64 (sin prefijo data:image...) a Storage.
 */
export async function uploadFromBase64(base64Data: string, slug: string): Promise<string | null> {
  try {
    // Limpiar header si viene (data:image/jpeg;base64,...)
    const cleanB64 = base64Data.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(cleanB64, 'base64');
    
    const fileName = `${slug}-${Date.now()}.png`; // Asumimos PNG/JPG generado por IA
    return await uploadFile(buffer, fileName, 'image/png');
  } catch (e) {
    console.error("[STORAGE] Fallo procesando Base64:", e);
    return null;
  }
}

/**
 * Upload multiple images in parallel.
 * Returns array of successfully uploaded URLs.
 */
export async function uploadBatch(imageUrls: string[], slugBase: string): Promise<string[]> {
  console.log(`[STORAGE] Iniciando subida batch de ${imageUrls.length} imágenes...`);
  
  const uploadPromises = imageUrls.map(async (url, index) => {
    const uniqueSlug = `${slugBase}-${index + 1}`;
    return await uploadFromUrl(url, uniqueSlug);
  });

  const results = await Promise.all(uploadPromises);
  const successUrls = results.filter((url): url is string => url !== null);
  
  console.log(`[STORAGE] Batch completado. ${successUrls.length}/${imageUrls.length} subidas.`);
  return successUrls;
}
