import type {
    ErrorBoundaryComponent,
    LinksFunction,
    MetaFunction,
} from '@remix-run/node';
import {
    Link,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useCatch,
} from '@remix-run/react';
import type { CatchBoundaryComponent } from '@remix-run/react/dist/routeModules';
import styles from '~/styles/main.css';
import { MainNavigation } from '~/components';

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'New Remix App',
    viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

/**
 * Overrides the Remix 404 and is final catch for any uncaught requests
 * fx: non-existing page
 */
export const CatchBoundary: CatchBoundaryComponent = () => {
    const caughtResponse = useCatch();
    const message = caughtResponse.data?.message || 'Page not found';

    return (
        <html lang='en'>
            <head>
                <Meta />
                <Links />
                <title>{caughtResponse.statusText}</title>
            </head>
            <body>
                <header>
                    <MainNavigation />
                </header>
                <main className='error'>
                    <h1>{caughtResponse.statusText}</h1>
                    <p>{message}</p>
                    <p>
                        Go back to <Link to='/'>safety</Link>
                    </p>
                </main>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
};

/**
 * This would trigger fx if going to /notes and the notes.json didn't exist
 * This is the last resort boundary
 */
export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
    return (
        <html lang='en'>
            <head>
                <Meta />
                <Links />
                <title>An error occurred!</title>
            </head>
            <body>
                <header>
                    <MainNavigation />
                </header>
                <main className='error'>
                    <h1>An error occurred!</h1>
                    <p>{error.message}</p>
                    <p>
                        Go back to <Link to='/'>safety</Link>
                    </p>
                </main>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
};

export default function App() {
    return (
        <html lang='en'>
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <header>
                    <MainNavigation />
                </header>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
