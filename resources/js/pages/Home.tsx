import Header from '@/components/header';
import { Auth } from '@/types';

export default function Home({auth} : { auth: Auth }) {
    return (
        <>
            <Header user={auth.user} />
        </>
    );
}
