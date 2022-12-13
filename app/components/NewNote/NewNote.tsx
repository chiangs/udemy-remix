import type { LinksFunction } from '@remix-run/node';
import styles from './NewNote.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

type Props = {};

export const NewNote = (props: Props) => {
    const NAME_COMPONENT = 'note-form';
    const formTitle = 'Title';
    const formContent = 'Content';
    const submitLabel = 'Add Note';

    return (
        <form method='post' id={NAME_COMPONENT} data-testid={NAME_COMPONENT}>
            <p>
                <label htmlFor='title'>{formTitle}</label>
                <input type='text' id='title' name='title' required />
            </p>
            <p>
                <label htmlFor='content'>{formContent}</label>
                <textarea id='content' name='content' rows={5} required />
            </p>
            <div className='form-actions'>
                <button>{submitLabel}</button>
            </div>
        </form>
    );
};
