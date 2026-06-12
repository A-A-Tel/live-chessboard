import { User } from '@/types';
import Header from '@/components/header';

export type ProfileProps = {
    user?: User
}

export default function Profile(props: ProfileProps) {
    return (
        <>
            <Header user={props.user} />
        </>
    )
}
