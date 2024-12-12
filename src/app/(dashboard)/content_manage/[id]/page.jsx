"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function PostDetailPage() {
  const params = useParams();
  const PostId = params.id;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPostData();
  }, []);

  const fetchPostData = async () => {
    try {
      const response = await fetch(`/api/ContentManage/${PostId}`);
      const res = await response.json();

      if (response.ok) {
        setPost(res.data);
      } else {
        console.error("Error fetching post data");
      }
    } catch (error) {
      console.error("Error fetching post data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6  ">
      <div className="mb-6">
        <Image
          width={1200}
          height={700}
          //  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-auto max-h-96 object-cover  rounded-lg shadow-md"
        />
      </div>
      <div className="bg-orange-50 p-2 ">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 text-sm mb-4 ">
          Published on: {new Date(post.createdAt).toLocaleDateString()} |
          Updated on: {new Date(post.updatedAt).toLocaleDateString()}
        </p>
        <p className="text-lg break-words  ">{post.description}</p>
      </div>
    </div>
  );
}
