import { User } from '@/types';

type HeaderProps = {
    user?: User;
}

export default function Header(props: HeaderProps) {

    if (!props.user) {
        return (
            <header className='h-[10vh] bg-dark-primary'>

            </header>
        );
    }

    return (
        <>

        </>
    );
}
