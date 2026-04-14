import { BlogLayout } from "@/components/blog-layout";
import { PostGrid } from "@/components/post-grid";
import { Sidebar } from "@/components/sidebar";
import { getAllPostsMeta, getSidebarData } from "@/lib/posts";

export default async function Home() {
  const [posts, sidebar] = await Promise.all([getAllPostsMeta(), getSidebarData()]);
  const { popularPosts, featuredPost, tagsWithCounts } = sidebar;

  return (
    <BlogLayout
      main={<PostGrid posts={posts} />}
      sidebar={
        <Sidebar popularPosts={popularPosts} featuredPost={featuredPost} tagsWithCounts={tagsWithCounts} />
      }
    />
  );
}
