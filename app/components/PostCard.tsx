import Link from "next/link";
import React, { FC } from "react";
import Badge from "./Badge";
import { Tag } from "@prisma/client";
import Image from "next/image";

import colorTags from '@/app/components/colorTags'
interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    tags: Tag[];
    imageUrl: string;
    createdAt: Date;
  };
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <div className="card bg-[#eceff2] shadow-xl text-[#f6f8f9] mb-4 w-full">
      <div className="card-body flex flex-col w-full">
        <div>
          <p className="text-sm text-neutral">{post.createdAt.toLocaleDateString()}</p>
          <div className="flex justify-start items-center w-full">
            <Link href={`/blog/${post.id}`} className="pr-4">
              <h2 className="card-title text-4xl font-bold text-slate-600 hover:text-purple-500">{post.title}</h2>
            </Link>
            <div className="grid grid-cols-2 gap-1">
              {post.tags.map((tag) => (
                <Badge key={tag.id} bg={colorTags[tag.name.toUpperCase()]}>{tag.name}</Badge>
              ))
              }
            </div>

          </div>
          <p className="mt-2 text-2xl text-[#637e94]">{post.content.slice(0, 100)}</p>
        </div>
        <div className="card-actions flex justify-start">
          <Link href={`/blog/${post.id}`} className="hover:underline text-[#323d48]">
            read more...
          </Link>
        </div>
        {post.imageUrl !== "" && (
          <div className="w-full flex justify-start">
            <div className="w-full md:w-[800px] relative md:h-[500px] flex">
              <Image src={post.imageUrl} alt={post.title} className="rounded-2xl" width={1600} height={900} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export default PostCard;

