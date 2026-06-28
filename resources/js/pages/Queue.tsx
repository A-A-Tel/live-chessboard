import { useEchoPresence } from '@laravel/echo-react';
import { useEffect } from 'react';
import { router } from "@inertiajs/react"
import { Auth } from '@/types';
import Header from '@/components/header';

export default function Queue({ auth }: { auth: Auth }) {
    useEchoPresence('game-queue', 'MatchFound', (e: {gameId: number }) => {
        router.visit(`/play/${e.gameId}`);
    });

    useEffect(() => {
        return () => {
            window.navigator.sendBeacon('/queue', JSON.stringify({ _method: 'DELETE' }));
        };
    }, []);

    return (
        <div className="flex h-screen flex-col">
            <Header user={auth.user} />
            <div className="grid w-full flex-1 place-items-center">
                <h1 className="primary-text text-5xl">
                    Wachten op een beschikbare speler...
                </h1>
            </div>
        </div>
    );
}
