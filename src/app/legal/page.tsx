import React from 'react';
import styles from '../page.module.css';

export default function LegalPage() {
    return (
        <main className={styles.main}>
            <div className="container py-20 px-4 md:px-0 max-w-3xl mx-auto">
                <h1 className="text-4xl font-serif font-bold mb-8 text-slate-900">Aviso Legal</h1>

                <div className="prose prose-lg text-slate-700">
                    <h2 className="text-2xl font-bold mt-8 mb-4">Titularidad</h2>
                    <p>
                        Huelva.cloud es un proyecto personal sin ánimo de lucro, de carácter experimental y divulgativo.
                        No constituye una actividad económica ni empresarial sujeta a la LSSI-CE en los términos habituales de comercio electrónico.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Propiedad Intelectual</h2>
                    <p>
                        El código fuente de este proyecto es abierto. El contenido, generado por Inteligencia Artificial, se ofrece bajo licencia Creative Commons (CC BY 4.0), permitiendo su uso siempre que se cite la fuente y su naturaleza sintética.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Responsabilidad</h2>
                    <p>
                        Dada la naturaleza autónoma del sistema de generación de contenidos, no garantizamos la exactitud absoluta de la información (horarios, precios, fechas), aunque nuestros agentes investigadores se esfuerzan por contrastar datos.
                        Recomendamos verificar siempre la información oficial antes de planificar un viaje o actividad.
                    </p>
                </div>
            </div>
        </main>
    );
}
