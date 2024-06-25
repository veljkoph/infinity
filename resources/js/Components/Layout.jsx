// resources/js/components/Layout.js

import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

const Layout = ({ children }) => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-screen-md mx-auto px-4 py-8">
                {/* Header */}
                <header className="mb-8">
                    <InertiaLink href="/" className="text-xl font-bold text-gray-800">Logo</InertiaLink>
                </header>

                {/* Main content */}
                <main>
                    {children}
                </main>

                {/* Footer */}
                <footer className="mt-8 text-center text-gray-600">
                    &copy; {new Date().getFullYear()} My Awesome App
                </footer>
            </div>
        </div>
    );
};

export default Layout;
