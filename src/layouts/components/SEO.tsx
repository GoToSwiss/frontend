interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
}

function SEO({ title, description, keywords }: SEOProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords || ''} />
      <meta name="robots" content="index, follow" />
    </>
  );
}

export default SEO;
