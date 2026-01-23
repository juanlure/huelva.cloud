import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config({ path: '.env.local' });
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Faltan variables de entorno NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function setupBucket() {
  console.log("🗄️  Configurando Supabase Storage...");
  const BUCKET_NAME = 'media';

  // 1. Verificar si existe
  const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets();
  
  if (listError) {
    console.error("❌ Error listando buckets:", listError.message);
    return;
  }

  const exists = buckets?.find(b => b.name === BUCKET_NAME);

  if (exists) {
    console.log(`✅ El bucket '${BUCKET_NAME}' ya existe.`);
  } else {
    // 2. Crear si no existe
    console.log(`🔨 Creando bucket '${BUCKET_NAME}'...`);
    const { data, error } = await supabaseAdmin.storage.createBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 5242880, // 5MB limit
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    });

    if (error) {
      console.error("❌ Error creando bucket:", error.message);
    } else {
      console.log(`✅ Bucket '${BUCKET_NAME}' creado exitosamente.`);
    }
  }

  // 3. Verificar estado final
  const { data: finalBuckets } = await supabaseAdmin.storage.listBuckets();
  console.log("📋 Buckets disponibles:", finalBuckets?.map(b => b.name).join(', '));
}

setupBucket();
