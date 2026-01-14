import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar } from "lucide-react";
import { blogPosts, formatDate } from "@/data/blogPosts";

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>Blog | All Seasons Golf Carts - 4WD Electric Golf Cart News & Guides</title>
        <meta name="description" content="Explore the All Seasons Golf Carts blog for expert guides on 4WD electric golf carts, seasonal driving tips, off-road adventures, and EVolution D-MAX XT4 & XT6 insights." />
        <meta property="og:title" content="Blog | All Seasons Golf Carts" />
        <meta property="og:description" content="Expert guides on 4WD electric golf carts, seasonal driving tips, and off-road adventures with EVolution D-MAX models." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://allseasonsgolfcarts.com/blog" />
        <link rel="canonical" href="https://allseasonsgolfcarts.com/blog" />
      </Helmet>

      <div className="min-h-screen pt-20">
        <section className="py-12 lg:py-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <Badge variant="secondary" className="mb-4">All Seasons Insights</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                All Seasons Golf Carts Blog
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Expert guides, seasonal driving tips, and adventures with our premium 4WD electric golf carts. 
                Discover what makes EVolution D-MAX the ultimate year-round vehicle.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {blogPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card 
                    className="overflow-hidden h-full hover-elevate cursor-pointer group"
                    data-testid={`card-blog-${post.id}`}
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={post.heroImage}
                        alt={post.heroAlt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
                      </div>
                      <h2 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-primary font-medium text-sm">
                        Read Article
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
