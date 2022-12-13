import type { LinksFunction } from '@remix-run/node';
import { NewNote, newNoteLinks } from '~/components';

type Props = {};

export const links: LinksFunction = () => [...newNoteLinks()];

const Notes = (props: Props) => {
    const NAME_COMPONENT = 'notes';
    const title = 'A better way of keeping track of your notes';

    return (
        <main id={NAME_COMPONENT} data-testid={NAME_COMPONENT}>
            <h1>{title}</h1>
            <NewNote />
        </main>
    );
};

export default Notes;
