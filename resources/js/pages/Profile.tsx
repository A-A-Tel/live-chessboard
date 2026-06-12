import { User } from '@/types';
import Header from '@/components/header';
import Comments from '@/components/comments';

export type ProfileProps = {
    user?: User
}

export default function Profile(props: ProfileProps) {
    return (
        <>
            <Header user={props.user} />
            <div className='flex m-24 gap-24'>
                <Comments/>
                <Comments/>
            </div>
        </>
    )
}
