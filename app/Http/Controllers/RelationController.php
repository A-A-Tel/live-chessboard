<?php

namespace App\Http\Controllers;

use App\Models\Relation;
use App\Models\User;
use Illuminate\Http\RedirectResponse;

class RelationController extends Controller
{
    public function sendRequest(User $user): mixed
    {
        $auth = auth()->user();

        if ($auth->id === $user->id) {
            abort(403, 'Schizofrenie is niet toegestaan..');
        }

        $user1 = min($auth->id, $user->id);
        $user2 = max($auth->id, $user->id);

        $relation = Relation::where([
            'user1_id' => $user1,
            'user2_id' => $user2,
        ])->first();

        if (!$relation) {
            return Relation::create([
                'user1_id' => $user1,
                'user2_id' => $user2,
                'sender_id' => $auth->id,
                'status'    => 'pending',
            ]);
        }

        match ($relation->status) {
            'blocked' => abort(403, 'Dit is op dit moment niet mogelijk.'),
            'pending' => abort(409, 'Er is al een verzoek gaande.'),
            'accepted' => abort(409, 'Jullie zijn al vrienden.'),
            default   => null,
        };

        $relation->update([
            'sender_id' => $auth->id,
            'status'    => 'pending',
        ]);

        return redirect()->back();
    }

    public function accept(Relation $relation): RedirectResponse
    {
        $auth = auth()->user();

        $this->isParticipant($relation, $auth->id);

        if ($relation->sender_id === $auth->id) {
            abort(403, 'Je kan niet je eigen request accepteren.');
        }

        if ($relation->status !== 'pending') {
            abort(409, 'Deze relatie is niet relevant meer.');
        }

        $relation->update(['status' => 'accepted']);

        return redirect()->back()->with('success', 'Geaccepteerd.');
    }

    public function block(Relation $relation): RedirectResponse
    {
        $auth = auth()->user();

        $this->isParticipant($relation, $auth->id);

        if ($relation->status === 'blocked') {
            return redirect()->back()->with('success', 'Gebruiker geblokkeerd.');
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

        $this->isParticipant($relation, $auth->id);

        if ($relation->status === 'blocked' && $relation->sender_id !== $auth->id) {
            abort(403, 'Alleen de blokkerende mag een blokkade opheffen.');
        }

        $relation->delete();

        return redirect()->back()->with('success', 'Relatie verwijderd');
    }

    /**
     * Abort with 403 if the given user is not part of this relation.
     */
    private function isParticipant(Relation $relation, int $userId): void
    {
        if ($relation->user1_id !== $userId && $relation->user2_id !== $userId) {
            abort(403, 'You are not part of this relation.');
        }
    }
}
