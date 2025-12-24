import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getPosts } from '@/app/actions/blog'
import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const posts = await getPosts()
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="container mx-auto max-w-3xl py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Latest Posts</h1>
        {user ? (
           <div className="flex gap-4">
             <span className="self-center text-sm text-muted-foreground">{user.email}</span>
             <Link href="/blog/create">
                <Button>Create Post</Button>
             </Link>
           </div>
        ) : (
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
        )}
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <Link href={`/blog/${post.id}`} key={post.id} className="block">
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-muted-foreground">
                  {post.content}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-20 bg-muted/20 rounded-lg">
             <h2 className="text-xl font-semibold mb-2">No posts yet</h2>
             <p className="text-muted-foreground">Be the first to create a post!</p>
          </div>
        )}
      </div>
    </div>
  )
}
