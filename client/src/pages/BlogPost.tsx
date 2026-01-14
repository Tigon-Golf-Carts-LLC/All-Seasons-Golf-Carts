import { useRoute, Link } from "wouter";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Calendar, Share2 } from "lucide-react";
import { getBlogPostBySlug, formatDate, blogPosts, BlogSection } from "@/data/blogPosts";

function renderContent(section: BlogSection, index: number) {
  const renderTextWithLinks = (text: string) => {
    const linkPatterns = [
      { text: "EVolution D-MAX XT4", href: "/evolution-d-max-xt4" },
      { text: "EVolution D-MAX XT6", href: "/evolution-d-max-xt6" },
      { text: "D-MAX XT4", href: "/evolution-d-max-xt4" },
      { text: "D-MAX XT6", href: "/evolution-d-max-xt6" }
    ];

    let result = text;
    let hasLink = false;

    for (const pattern of linkPatterns) {
      if (result.includes(pattern.text) && !hasLink) {
        const parts = result.split(pattern.text);
        if (parts.length > 1) {
          return (
            <>
              {parts[0]}
              <Link href={pattern.href}>
                <span className="text-primary hover:underline cursor-pointer font-medium">
                  {pattern.text}
                </span>
              </Link>
              {parts.slice(1).join(pattern.text)}
            </>
          );
        }
      }
    }

    return text;
  };

  switch (section.type) {
    case "h2":
      return <h2 key={index} className="text-2xl lg:text-3xl font-bold mt-10 mb-4">{section.content}</h2>;
    case "h3":
      return <h3 key={index} className="text-xl lg:text-2xl font-bold mt-8 mb-3">{section.content}</h3>;
    case "h4":
      return <h4 key={index} className="text-lg font-bold mt-6 mb-2">{section.content}</h4>;
    case "h5":
      return <h5 key={index} className="text-base font-bold mt-4 mb-2">{section.content}</h5>;
    case "h6":
      return <h6 key={index} className="text-sm font-bold mt-4 mb-2">{section.content}</h6>;
    case "p":
      return <p key={index} className="text-muted-foreground leading-relaxed mb-4">{renderTextWithLinks(section.content)}</p>;
    case "ul":
      return (
        <ul key={index} className="list-disc pl-6 mb-4 space-y-2">
          {section.items?.map((item, i) => (
            <li key={i} className="text-muted-foreground">{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={index} className="list-decimal pl-6 mb-4 space-y-2">
          {section.items?.map((item, i) => (
            <li key={i} className="text-muted-foreground">{item}</li>
          ))}
        </ol>
      );
    default:
      return null;
  }
}

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const post = params?.slug ? getBlogPostBySlug(params.slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <Link href="/blog">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = blogPosts.findIndex(p => p.id === post.id);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.seoTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta property="og:title" content={post.seoTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:image" content={`https://allseasonsgolfcarts.com${post.heroImage}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://allseasonsgolfcarts.com/blog/${post.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.seoTitle} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={`https://allseasonsgolfcarts.com${post.heroImage}`} />
        <link rel="canonical" href={`https://allseasonsgolfcarts.com/blog/${post.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.metaDescription,
            "image": `https://allseasonsgolfcarts.com${post.heroImage}`,
            "datePublished": post.publishDate,
            "author": {
              "@type": "Organization",
              "name": "All Seasons Golf Carts"
            },
            "publisher": {
              "@type": "Organization",
              "name": "All Seasons Golf Carts",
              "url": "https://allseasonsgolfcarts.com"
            }
          })}
        </script>
      </Helmet>

      <article className="min-h-screen pt-20">
        <div className="relative">
          <div className="aspect-[21/9] lg:aspect-[3/1] overflow-hidden">
            <img
              src={post.heroImage}
              alt={post.heroAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 pb-8 lg:pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link href="/blog">
                <Button variant="outline" size="sm" className="gap-2 mb-6 bg-background/80 backdrop-blur-sm" data-testid="button-back-blog">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Button>
              </Link>
              
              <Badge variant="secondary" className="mb-4">All Seasons Golf Carts</Badge>
              
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 text-foreground">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2"
                  onClick={handleShare}
                  data-testid="button-share"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="prose prose-lg max-w-none">
            {post.content.map((section, index) => renderContent(section, index))}
          </div>

          <Card className="p-6 lg:p-8 mt-12 bg-primary/5 border-primary/20">
            <h3 className="text-xl font-bold mb-4">Ready to Experience All Seasons Capability?</h3>
            <p className="text-muted-foreground mb-6">
              Explore our premium 4WD electric golf carts and discover year-round driving freedom.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/evolution-d-max-xt4">
                <Button className="gap-2" data-testid="button-cta-xt4">
                  Explore XT4
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/evolution-d-max-xt6">
                <Button variant="outline" className="gap-2" data-testid="button-cta-xt6">
                  Explore XT6
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Card>

          {(prevPost || nextPost) && (
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-bold mb-6">Continue Reading</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {prevPost && (
                  <Link href={`/blog/${prevPost.slug}`}>
                    <Card className="p-4 hover-elevate cursor-pointer group h-full" data-testid="link-prev-post">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <ArrowLeft className="w-4 h-4" />
                        Previous Article
                      </div>
                      <p className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                        {prevPost.title}
                      </p>
                    </Card>
                  </Link>
                )}
                {nextPost && (
                  <Link href={`/blog/${nextPost.slug}`}>
                    <Card className="p-4 hover-elevate cursor-pointer group h-full md:text-right" data-testid="link-next-post">
                      <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-2">
                        Next Article
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <p className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                        {nextPost.title}
                      </p>
                    </Card>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
