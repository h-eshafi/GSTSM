import { supabase } from './supabase';

export interface Post {
  id: string;
  type: string;
  title: string;
  kicker: string;
  excerpt?: string;
  image?: string;
  content?: string;
  createdAt: string;
}

let memoryPosts: Post[] | null = null;
let isFetching = false;
let fetchPromise: Promise<Post[]> | null = null;

export async function getCachedPosts(forceRefresh = false): Promise<Post[]> {
  if (!forceRefresh && memoryPosts && memoryPosts.length > 0) {
    return memoryPosts;
  }

  if (isFetching && fetchPromise) {
    return fetchPromise;
  }

  isFetching = true;
  fetchPromise = (async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('createdAt', { ascending: false });

      if (data && data.length > 0) {
        memoryPosts = data;
        return data;
      }
      if (error) console.error('Error fetching posts:', error);
    } catch (e) {
      console.error('Exception fetching posts:', e);
    } finally {
      isFetching = false;
      fetchPromise = null;
    }
    return memoryPosts || [];
  })();

  return fetchPromise;
}

export function getPostByIdSync(id: string): Post | undefined {
  if (!memoryPosts) return undefined;
  return memoryPosts.find(p => p.id === id);
}

export function updatePostInCache(post: Post): void {
  if (!memoryPosts) {
    memoryPosts = [post];
    return;
  }
  const index = memoryPosts.findIndex(p => p.id === post.id);
  if (index >= 0) {
    memoryPosts[index] = { ...memoryPosts[index], ...post };
  } else {
    memoryPosts.unshift(post);
  }
}

export function removePostFromCache(id: string): void {
  if (!memoryPosts) return;
  memoryPosts = memoryPosts.filter(p => p.id !== id);
}
