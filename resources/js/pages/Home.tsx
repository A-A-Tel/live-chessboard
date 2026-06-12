import Header from '@/components/header';
import { User } from '@/types';

export default function Home({user}: { user?: User }) {
    return (
        <>
            <Header user={user} />
        </>
    );
}
