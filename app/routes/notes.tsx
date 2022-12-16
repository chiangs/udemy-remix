import type {
    ActionFunction,
    ErrorBoundaryComponent,
    LinksFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Link, useCatch, useLoaderData } from '@remix-run/react';
import type { CatchBoundaryComponent } from '@remix-run/react/dist/routeModules';
import { getStoredNotes, storeNotes } from '~/data/notes';
import { NewNote, newNoteLinks, NoteList, noteListLinks } from '~/components';

export const links: LinksFunction = () => [
    ...newNoteLinks(),
    ...noteListLinks(),
];

export const meta: MetaFunction = () => ({
    title: 'All Notes',
    description: 'Manage your notes.',
});

export const loader: LoaderFunction = async () => {
    const notes = await getStoredNotes();
    if (!notes) {
        throw json(
            { message: 'Could not find notes!' },
            { status: 404, statusText: 'Not Found' }
        );
    }
    return notes;
};

export const action: ActionFunction = async ({ request }) => {
    // Get action data object
    const formData = await request.formData();
    const noteData = Object.fromEntries(formData) as {
        title: string;
        content: string;
        id?: string;
    };
    // Get New NoteData from form
    // const noteData = {
    //     title: formData.get('title'),
    //     content: formData.get('content');
    // }
    //

    // Validate here
    if (noteData.title.trim().length < 5) {
        return { message: 'Invalid title - must be at least five characters`' };
    }

    // Get existing notes to update
    const existingNotes = await getStoredNotes();

    // Update New Note with ID
    noteData.id = new Date().toISOString();

    // Update collection of Notes
    const updatedNotes = existingNotes.concat(noteData);

    // Update DB
    await storeNotes(updatedNotes);

    // Test navigation hook submitting
    // await new Promise((resolve, reject) =>
    //     setTimeout(() => resolve(() => {}), 2000)
    // );

    // Reroute or handle mutation
    return redirect('/notes');
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

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
    // Could make a base error boundary UI with props and children to override
    return (
        <main className='error'>
            <h1>Error with fetching or saving your notes!</h1>
            <p>{error.message}</p>
            <p>
                Go back to <Link to='/'>safety</Link>
            </p>
        </main>
    );
};

type Props = {};

const Notes = (props: Props) => {
    const NAME_COMPONENT = 'notes';
    const title = 'A better way of keeping track of your notes';

    const notes = useLoaderData();
    // could useActionData here and pass it to the child or use it in the child

    return (
        <main id={NAME_COMPONENT} data-testid={NAME_COMPONENT}>
            <h1>{title}</h1>
            <NewNote />
            <NoteList notes={notes} />
        </main>
    );
};

export default Notes;
