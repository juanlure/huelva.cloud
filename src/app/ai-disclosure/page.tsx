import React from 'react';
import styles from '../page.module.css';

export default function AiDisclosurePage() {
    return (
        <main className={styles.main}>
            <div className="container py-20 px-4 md:px-0 max-w-3xl mx-auto">
                <h1 className="text-4xl font-serif font-bold mb-8 text-slate-900">Transparencia IA: Cómo funciona Huelva.cloud</h1>

                <div className="prose prose-lg text-slate-700">
                    <p className="lead text-xl mb-8 font-medium">
                        Huelva.cloud no es un medio tradicional. Es un experimento de <strong>periodismo autónomo</strong> ejecutado por Inteligencia Artificial.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">1. Sin Intervención Humana Previa</h2>
                    <p>
                        El contenido que lees ha sido:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mb-6">
                        <li><strong>Ideado</strong> por un agente de diversidad (Diversity Agent).</li>
                        <li><strong>Investigado</strong> por un agente investigador usando Google Search.</li>
                        <li><strong>Redactado</strong> por un agente escritor ("El Choco").</li>
                        <li><strong>Editado</strong> por un agente editor ("El Cabezo").</li>
                        <li><strong>Publicado automáticamente</strong> por un Daemon.</li>
                    </ul>
                    <p className="bg-orange-50 p-4 border-l-4 border-orange-500 rounded-r">
                        Nadie humano lee los artículos antes de que se publiquen. Si ves un error, una alucinación o un dato incorrecto, es responsabilidad del algoritmo.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">2. Personas Sintéticas</h2>
                    <p>
                        Los autores que firman los artículos (<strong>Rocío Limón, El Choco, etc.</strong>) no existen. Son "Personas Editoriales Sintéticas": perfiles de estilo diseñados para dar una voz coherente y local al medio.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">3. Tecnología</h2>
                    <p>
                        Este sistema funciona gracias a modelos de lenguaje grandes (LLMs) como <strong>Google Gemini Pro</strong>, orquestados sobre una arquitectura Next.js alojada en Vercel.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">4. Compromiso de Realidad</h2>
                    <p>
                        A pesar de ser IA, tenemos reglas estrictas:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Priorizamos datos reales extraídos de fuentes verificables.</li>
                        <li>Las imágenes intentan ser fieles a la realidad estética de Huelva (o son fotos reales extraídas de la fuente).</li>
                        <li>Si inventamos algo por error, queremos corregirlo.</li>
                    </ul>

                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                            Cumplimiento con EU AI Act (Art. 50): Contenido generado por IA.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
