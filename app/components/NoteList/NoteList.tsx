import type { LinksFunction } from '@remix-run/node';
import styles from './NoteList.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

type NoteData = { title: string; content: string; id: string };

type NoteProps = {
    note: NoteData;
    index: number;
};

type NoteListProps = {
    notes: NoteData[];
};

const Note = ({ note, index }: NoteProps) => {
    const noteIdString = `#${index + 1}`;
    const noteDateString = new Date(note.id).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <article>
            <header>
                <ul className='note-meta'>
                    <li>{noteIdString}</li>
                    <li>
                        <time dateTime={note.id}>{noteDateString}</time>
                    </li>
                </ul>
                <h2>{note.title}</h2>
            </header>
            <p>{note.content}</p>
        </article>
    );
};

export const NoteList = ({ notes = [] }: NoteListProps) => {
    const NAME_COMPONENT = 'note-list';

    const noteListItems = notes.map((note, index) => (
        <li key={note.id} className='note'>
            <Note note={note} index={index} />
        </li>
    ));

    return (
        <ul id={NAME_COMPONENT} data-testid={NAME_COMPONENT}>
            {noteListItems}
        </ul>
    );
};
