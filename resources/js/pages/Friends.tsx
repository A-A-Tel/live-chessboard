import Header from '@/components/header';
import { Auth, OtherUser } from '@/types';
import UserCard from '@/components/user-card';

export type FriendsProps = {
    auth: Auth
    users: OtherUser[]
}

export default function Friends(props: FriendsProps){
    return <>
        <Header user={props.auth.user}/>
        <div className="mx-15 mt-15 flex flex-col gap-7">
            <h1 className="primary-text mb-11 text-6xl">Vrienden</h1>

            <div className="flex flex-wrap justify-between gap-10">
                {props.users.map((user) => (
                    <UserCard key={user.id} other={user} user={props.auth.user}/>
                ))}
            </div>
            {props.users.length === 0 && <div className="primary-text text-2xl">Geen gebruikers gevonden.</div>}
        </div>
    </>
}
