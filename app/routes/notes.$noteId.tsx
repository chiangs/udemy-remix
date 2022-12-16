import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useCatch, useLoaderData } from '@remix-run/react';
import type { CatchBoundaryComponent } from '@remix-run/react/dist/routeModules';
import { getStoredNotes } from '~/data/notes';
import { NoteDetails, noteDetailsLinks } from '~/components';

export const links: LinksFunction = () => [...noteDetailsLinks()];

/**
 * Destructuring the arg can get you request, params, etc.
 */
export const loader: LoaderFunction = async ({ params }) => {
    const noteId = params.noteId;
    const notes: { id: string; tite: string; content: string }[] =
        await getStoredNotes();
    const note = notes.find((n) => n.id === noteId);
    // good place for catch boundary
    if (!note) {
        throw json(
            { message: `Could not find note for id ${noteId}` },
            { status: 404 }
        );
    }
    return note;
};

export const CatchBoundary: CatchBoundaryComponent = () => {
    const caughtResponse = useCatch();
    const message =
        caughtResponse.data?.message || 'Caught response data not found';
    return (
        <main className='error'>
            <h1>{caughtResponse.status}</h1>
            <p>{message}</p>
            <p>
                Go back to <Link to='/'>safety</Link>
            </p>
        </main>
    );
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
