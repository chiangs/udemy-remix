import type { LinksFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import homeStyles from '~/styles/home.css';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: homeStyles },
];

export default function Index() {
    const NAME_COMPONENT = 'content';
    const title = 'A better way of keeping track of your notes';
    const body =
        'Try our early beta and never loose track of your notes again!';
    const ctaLabel = 'Try Now!';

    return (
        <main id={NAME_COMPONENT} data-testid={NAME_COMPONENT}>
            <h1>{title}</h1>
            <p>{body}</p>
            <p id='cta'>
                <Link to='/notes'>{ctaLabel}</Link>
            </p>
        </main>
    );
}
