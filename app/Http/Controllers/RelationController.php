<?php

namespace App\Http\Controllers;

use App\Models\Relation;
use App\Models\User;
use Illuminate\Http\RedirectResponse;

class RelationController extends Controller
{
    public function sendRequest(User $user): RedirectResponse
    {
        $auth = auth()->user();

        if ($auth->id === $user->id) {
            return redirect()->back()->with('failure', 'Schizofrenie is niet toegestaan..');
        }

        $user1 = min($auth->id, $user->id);
        $user2 = max($auth->id, $user->id);

        $relation = Relation::where([
            'user1_id' => $user1,
            'user2_id' => $user2,
        ])->first();

        if ($relation) {
            if ($relation->status === 'blocked') {
                return redirect()->back()->withErrors('failure', 'Dit is op dit moment niet mogelijk.');
            }
            if ($relation->status === 'pending') {
                return redirect()->back()->withErrors('failure', 'Er is al een verzoek gaande.');
            }
            if ($relation->status === 'accepted') {
                return redirect()->back()->withErrors('failure', 'Jullie zijn al vrienden.');
            }
        }

        Relation::create([
            'user1_id'  => $user1,
            'user2_id'  => $user2,
            'sender_id' => $auth->id,
            'status'    => 'pending',
        ]);

        return redirect()->back()->with('success', 'Verzoek verstuurd.');
    }
    public function accept(Relation $relation): RedirectResponse
    {
        $auth = auth()->user();

        if (! $this->isParticipant($relation, $auth->id)) {
            return redirect()->back()->withErrors('failure', 'Je bent geen onderdeel van deze relatie.');
        }
        if ($relation->sender_id === $auth->id) {
            return redirect()->back()->withErrors('failure', 'Je kan niet je eigen request accepteren.');
        }
        if ($relation->status !== 'pending') {
            return redirect()->back()->withErrors('failure', 'Deze relatie is niet relevant meer.');
        }

        $relation->update(['status' => 'accepted']);

        return redirect()->back()->withErrors('success', 'Geaccepteerd.');
    }

    public function block(Relation $relation): RedirectResponse
    {
        $auth = auth()->user();

        if (! $this->isParticipant($relation, $auth->id)) {
            return redirect()->back()->with('failure', 'Je bent geen onderdeel van deze relatie.');
        }
        if ($relation->status === 'blocked') {
            return redirect()->back()->with('failure', 'Deze relatie is al geblokkeerd.');
        }

        $relation->update([
            'sender_id' => $auth->id,
            'status'    => 'blocked',
        ]);

        return redirect()->back()->with('success', 'Gebruiker geblokkeerd.');
    }

    public function destroy(Relation $relation): RedirectResponse
    {
        $auth = auth()->user();

        if (! $this->isParticipant($relation, $auth->id)) {
            return redirect()->back()->with('failure', 'Je bent geen onderdeel van deze relatie.');
        }
        if ($relation->status === 'blocked' && $relation->sender_id !== $auth->id) {
            return redirect()->back()->with('failure', 'Alleen de blokkerende mag een blokkade opheffen.');
        }

        $relation->delete();

        return redirect()->back()->with('success', 'Relatie verwijderd.');
    }

    private function isParticipant(Relation $relation, int $userId): bool
    {
        return $relation->user1_id === $userId || $relation->user2_id === $userId;
    }
}
