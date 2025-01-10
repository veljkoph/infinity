import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import Layout from './Layouts/Layout';
import { I18nextProvider } from 'react-i18next';
import i18n from '../translations/i18n';

const appName = import.meta.env.VITE_APP_NAME || 'Infiniti';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        let page = pages[`./Pages/${name}.jsx`]
        page.default.layout = page.default.layout || (page => <Layout children={page} />)
        return page
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<I18nextProvider i18n={i18n} ><App {...props} /> </I18nextProvider>);
    },
    progress: {
        color: '#4B5563',
    },
});
