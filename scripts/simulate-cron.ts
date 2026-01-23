/*
  Simulación Local de Cron Job (Serverless)
  Ejecutar: npx tsx scripts/simulate-cron.ts
*/

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function runCronSimulation() {
  console.log("🚀 Iniciando simulación de Cron Job (Serverless)...");
  
  // En entorno local, Next.js corre en localhost:3000
  const url = 'http://localhost:3000/api/cron/daemon';
  const secret = process.env.CRON_SECRET || 'test_secret';

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${secret}`
      }
    });

    const data = await res.json();
    console.log(`[STATUS] ${res.status} ${res.statusText}`);
    console.log("[RESPONSE]", JSON.stringify(data, null, 2));

  } catch (err) {
    console.error("❌ Error conectando con API local:", err);
    console.log("⚠️ Asegúrate de que tienes 'npm run dev' ejecutándose en otra terminal.");
  }
}

runCronSimulation();
