import type { LinksFunction } from '@remix-run/node';
import {
    Form,
    useTransition as useNavigation,
    useActionData,
} from '@remix-run/react';
import styles from './NewNote.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

type Props = {};

export const NewNote = (props: Props) => {
    const NAME_COMPONENT = 'note-form';
    const formTitle = 'Title';
    const formContent = 'Content';
    const submitLabel = 'Add Note';
    const submittingLabel = 'Submitting...';
    const data = useActionData();

    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const buttonLabel = isSubmitting ? submittingLabel : submitLabel;

    const errors = data?.message ? (
        <p className='error'>{data.message}</p>
    ) : null;

    return (
        <Form method='post' id={NAME_COMPONENT} data-testid={NAME_COMPONENT}>
            {errors}
            <p>
                <label htmlFor='title'>{formTitle}</label>
                <input type='text' id='title' name='title' required />
            </p>
            <p>
                <label htmlFor='content'>{formContent}</label>
                <textarea id='content' name='content' rows={5} required />
            </p>
            <div className='form-actions'>
                <button disabled={isSubmitting}>{buttonLabel}</button>
            </div>
        </Form>
    );
};
