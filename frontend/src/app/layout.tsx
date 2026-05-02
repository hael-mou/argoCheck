
import { Metadata } from 'next';
import "@/styles/global.css";
import QueryProvider from '@/app/providers';
import { Toaster } from 'sonner';
import Footer from '@/components/ui/Footer';


// === types : ==================================================================
type MainLayoutProps = {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
};

// === Metadata : ===============================================================
export const metadata: Metadata = {
    title: 'ArgoCheck',
    description: "ArgoCheck est un outil intelligent qui aide les agriculteurs à choisir les meilleurs produits en se basant sur les avis des utilisateurs, les notes de qualité et les informations des fournisseurs."
};

// === MainLayout : =============================================================
const MainLayout = async (props: MainLayoutProps) => (
        <html lang="fr">
            <body>
                <QueryProvider>
                    <Toaster position="top-center" />
                    <main>
                        {props.children}
                    </main>
                    <Footer />
                </QueryProvider>
            </body>
        </html>
);

export default MainLayout;
