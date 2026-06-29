import {Comment, User } from '@/types'
import { Form } from '@inertiajs/react';
import { useState } from 'react';

export type CommentsProps = {
    user?: User;
    comments: Comment[];
    postRoute: 'user'|'game'
    postId: number;
}

export default function Comments(props: CommentsProps) {
    const [content, setContent] = useState<string>('');

    return (
        <div className="flex w-full flex-col">
            <h1 className="primary-text mb-11 text-6xl">Commentaar</h1>
            <div className="bg-light-primary rounded-2xl p-7">
                <Form method="post"
                      action={`/${props.postRoute}/comments/${props.postId}`}
                      className="flex flex-col"
                      onSuccess={() => setContent('')}
                >
                    <textarea
                        className="secondary-text bg-primary h-fit w-full resize-none rounded-2xl p-3 text-2xl"
                        maxLength={1024}
                        minLength={1}
                        placeholder="Schrijf commentaar"
                        rows={5}
                        name="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button
                        className="secondary-text bg-primary mt-4 mr-15 ml-auto w-fit rounded-2xl p-3 text-xl"
                        type="submit"
                        children="Plaatsen"
                    />
                </Form>

                <div className="mt-9 flex flex-col gap-8">
                    {props.comments.map((comment: Comment) => (
                        <div key={comment.id} className="bg-primary flex gap-4 rounded-2xl p-5">
                            <img className="h-26 w-26 rounded-full" src={`/storage/avatars/${comment.commenter.avatar}`} alt="Avatar" />
                            <div>

                                <h3 className="secondary-text text-4xl">{comment.commenter.username}</h3>
                                <span className="secondary-text mt-2 block text-xl">{comment.content}</span>
                                {props.user?.id === comment.commenter.id && (
                                    <Form method="delete"
                                          action={`/${props.postRoute}/comments/${comment.id}`}
                                          className="mt-4 bg-dark-primary w-fit secondary-text text-2xl p-2 rounded-xl"
                                    >
                                        <button children="Verwijder" />
                                    </Form>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
