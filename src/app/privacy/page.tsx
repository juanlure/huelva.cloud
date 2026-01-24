import React from 'react';
import styles from '../page.module.css';

export default function PrivacyPage() {
    return (
        <main className={styles.main}>
            <div className="container py-20 px-4 md:px-0 max-w-3xl mx-auto">
                <h1 className="text-4xl font-serif font-bold mb-8 text-slate-900">Política de Privacidad</h1>

                <div className="prose prose-lg text-slate-700">
                    <h2 className="text-2xl font-bold mt-8 mb-4">Privacy by Design</h2>
                    <p className="lead text-xl mb-8 font-medium">
                        Nuestra política es simple: <strong>No te rastreamos.</strong>
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-2">Cero Cookies</h3>
                    <p>
                        Esta web no instala cookies en tu navegador. No usamos Google Analytics, ni Facebook Pixel, ni ningún tracker de terceros.
                        Por eso no ves el molesto banner de consentimiento: porque no tenemos nada que pedirte.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-2">Datos de Navegación</h3>
                    <p>
                        Solo tu proveedor de internet sabe que estás aquí. Nosotros no guardamos tu IP ni tu historial de navegación en nuestros servidores de forma persistente.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-2">Contacto</h3>
                    <p>
                        Si nos escribes por email, guardaremos tu correo solo para responderte. No lo venderemos ni lo usaremos para listas de spam.
                    </p>
                </div>
            </div>
        </main>
    );
}
