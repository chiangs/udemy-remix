import type { LinksFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import styles from './NoteDetails.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

type Props = {
    id: string;
    title: string;
    content: string;
};

export const NAME_COMPONENT = 'note-details';
export const NAME_NOTE_DETAILS = 'note-details';

export const NoteDetails = ({ id, title, content }: Props) => {
    const allNotesLink = '/notes';
    const linkLabel = 'Back to all notes';

    return (
        <main id={NAME_COMPONENT} data-testid={NAME_COMPONENT}>
            <header>
                <nav>
                    <Link to={allNotesLink}>{linkLabel}</Link>
                </nav>
                <h1>{title}</h1>
            </header>
            <p id={NAME_NOTE_DETAILS} data-testid={NAME_NOTE_DETAILS}>
                {content}
            </p>
        </main>
    );
};
