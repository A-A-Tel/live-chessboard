import { User } from '@/types';

const medals = ['🥇', '🥈', '🥉'];

export default function Leaderboard({ title, data }: { title: string; data: { user: User; wins: number }[] }) {
    return (
        <div className="bg-primary w-full rounded-2xl p-6">
            <h2 className="primary-text mb-4 text-4xl">{title}</h2>

            <div className="flex flex-col gap-3">
                {data.map((entry, index) => (
                    <div key={entry.user.id} className="bg-light-primary flex justify-between rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">{medals[index]}</span>
                            <span>{entry.user.username}</span>
                        </div>

                        <span>{entry.wins} wins</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
