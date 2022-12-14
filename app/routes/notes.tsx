import type {
    ActionFunction,
    LinksFunction,
    LoaderFunction,
} from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getStoredNotes, storeNotes } from '~/data/notes';
import { NewNote, newNoteLinks, NoteList, noteListLinks } from '~/components';

export const links: LinksFunction = () => [
    ...newNoteLinks(),
    ...noteListLinks(),
];

export const loader: LoaderFunction = async () => {
    const notes = await getStoredNotes();
    return notes;
};

export const action: ActionFunction = async ({ request }) => {
    // Get action data object
    const formData = await request.formData();

    // Validate here

    // Get New NoteData from form
    // const noteData = {
    //     title: formData.get('title'),
    //     content: formData.get('content');
    // }
    //
    const noteData = Object.fromEntries(formData);

    // Get existing notes to update
    const existingNotes = await getStoredNotes();

    // Update New Note with ID
    noteData.id = new Date().toISOString();

    // Update collection of Notes
    const updatedNotes = existingNotes.concat(noteData);

    // Update DB
    await storeNotes(updatedNotes);

    // Reroute or some post DB update action response
    return redirect('/notes');
};

type Props = {};

const Notes = (props: Props) => {
    const NAME_COMPONENT = 'notes';
    const title = 'A better way of keeping track of your notes';

    const notes = useLoaderData();

    return (
        <main id={NAME_COMPONENT} data-testid={NAME_COMPONENT}>
            <h1>{title}</h1>
            <NewNote />
            <NoteList notes={notes} />
        </main>
    );
};

export default Notes;
