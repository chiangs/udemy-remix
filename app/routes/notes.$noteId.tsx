import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { NoteDetails, noteDetailsLinks } from '~/components';
import { getStoredNotes } from '~/data/notes';

export const links: LinksFunction = () => [...noteDetailsLinks()];

/**
 * Destructuring the arg can get you request, params, etc.
 */
export const loader: LoaderFunction = async ({ params }) => {
    const noteId = params.noteId;
    const notes: { id: string; tite: string; content: string }[] =
        await getStoredNotes();
    const note = notes.find((n) => n.id === noteId);
    return note || undefined;
};

type Props = {};

const NoteDetailsPage = (props: Props) => {
    const noteData = useLoaderData();
    const ui = noteData ? (
        <NoteDetails {...noteData} />
    ) : (
        <h1>Note not found.</h1>
    );
    return ui;
};
export default NoteDetailsPage;
