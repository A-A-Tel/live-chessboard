import noPfp from '../../../img/icons/no-pfp.jpg';
import { Link } from '@inertiajs/react';
import { User, OtherUser } from '@/types';

export default function UserCard({user, other}: {user?: User, other: OtherUser}) {

    const linkClasses = 'bg-dark-secondary secondary-text rounded-xl p-2 text-xl';

    const userAction = !user
        ? <Link href='/login' className={linkClasses}>Log in om toe te voegen</Link>
        : !other.relation
            ? <Link method='post' href={`/relations/request/${other.id}`} className={linkClasses}>Toevoegen als vriend</Link>
            : other.relation.status === 'pending'
                ? other.relation.sender === user.id
                    ? <Link className={linkClasses}>Verzoek verstuurd</Link>
                    : <Link method='patch' href={`/relations/${other.relation.id}/accept`} className={linkClasses}>Accepteer vriendschapverzoek</Link>
                : other.relation.status === 'blocked'
                    ? other.relation.sender === user.id
                        ? <Link method='delete' href={`/relations/${other.relation.id}`} className={linkClasses}>Deblokkeer persoon</Link>
                        : <Link className={linkClasses}>Vriendschapsverzoeken niet beschikbaar</Link>
                    : <Link method='delete' href={`/relations/${other.relation.id}`} className={linkClasses}>Verwijder vriend</Link>



    return (
        <div key={other.id} className="bg-secondary align-items-center flex h-40 w-[22vw] gap-5 rounded-2xl p-7">
            <img src={other.avatar == null ? noPfp : `/storage/avatars/${other.avatar}`} alt="avatar" className="h-25 w-25 rounded-full" />
            <div className="flex flex-col justify-between gap-4">
                <span className="primary-text text-4xl">{other.username}</span>
                <div className="flex gap-2">
                    <Link className={linkClasses} href={`/profile/${other.id}`}>
                        Profiel
                    </Link>
                    {userAction}
                </div>
            </div>
        </div>
    );
}
