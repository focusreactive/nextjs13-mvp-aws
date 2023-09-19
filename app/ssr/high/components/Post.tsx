import { Suspense } from "react";

import BuildInfo from "@/components/BuildInfo/BuildInfo";
import { api } from "@/utils/api";

import type { Post } from "@/app/global";


interface PostProps {
    post: Post;
}

export default async function Post({ post }: PostProps) {
    const [image] = await api.images({ cache: 'no-store' });

    return (
        <article key={post.id}>
            <h3 className="">{post.title}</h3>
            <p>{post.body}</p>

            <Suspense>
                <div className="grid">
                    <img src={image} alt="dog" width={400} />
                </div>
            </Suspense>
            <BuildInfo />
        </article>
    )
}