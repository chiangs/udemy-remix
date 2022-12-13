import { NavLink } from '@remix-run/react';

type Props = {};

export const MainNavigation = (props: Props) => {
    const NAME_COMPONENT = 'main-navigation';
    const links: { name: string; path: string }[] = [
        {
            name: 'Home',
            path: '/',
        },
        {
            name: 'My Notes',
            path: '/notes',
        },
    ];

    const linkItems = links.map((l) => (
        <li key={l.name} className='nav-item'>
            <NavLink to={l.path}>{l.name}</NavLink>
        </li>
    ));

    return (
        <nav id={NAME_COMPONENT} data-testid={NAME_COMPONENT}>
            <ul>{linkItems}</ul>
        </nav>
    );
};
