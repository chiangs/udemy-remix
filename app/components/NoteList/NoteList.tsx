import type { LinksFunction } from '@remix-run/node';
import styles from './NoteList.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

type Props = {
    notes: { title: string; content: string; id: string }[];
};

export const NoteList = ({ notes = [] }: Props) => {
    const NAME_COMPONENT = 'note-list';

    const noteListItems = notes.map((note, index) => (
        <li key={note.id} className='note'>
            <article>
                <header>
                    <ul className='note-meta'>
                        <li>#{index + 1}</li>
                        <li>
                            <time dateTime={note.id}>
                                {new Date(note.id).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </time>
                        </li>
                    </ul>
                    <h2>{note.title}</h2>
                </header>
                <p>{note.content}</p>
            </article>
        </li>
    ));

    return (
        <ul id={NAME_COMPONENT} data-testid={NAME_COMPONENT}>
            {noteListItems}
        </ul>
    );
};
