import { Auth, Comment, ListGame, User } from '@/types';
import Header from '@/components/header';
import Comments from '@/components/comments';
import Games from '@/components/games';

export type ProfileProps = {
    auth: Auth
    profileUser: User
    comments: Comment[]
    games: ListGame[]
}

export default function Profile(props: ProfileProps) {
    return (
        <>
            <Header user={props.auth.user} />
            <div className="m-24 flex gap-24">
                <Comments user={props.auth.user} comments={props.comments} postRoute={'user'} postId={props.profileUser.id} />
                <Games games={props.games}/>
            </div>
        </>
    );
}
