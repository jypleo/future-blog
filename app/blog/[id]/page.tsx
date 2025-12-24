import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getPost } from '@/app/actions/blog'

export default async function PostPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto max-w-2xl py-10">
      <Link href="/" className="inline-block mb-6">
        <Button variant="ghost" size="sm" className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to posts
        </Button>
      </Link>

      <article className="prose prose-zinc dark:prose-invert lg:prose-xl max-w-none">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          {post.title}
        </h1>
        <div className="text-sm text-muted-foreground mb-8">
           Published {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
        </div>
        <div className="whitespace-pre-wrap leading-7">
          {post.content}
        </div>
      </article>
    </div>
  )
}
