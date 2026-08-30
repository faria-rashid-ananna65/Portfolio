import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Faria WebDev - Full Stack Web Developer",
  description = "Professional developer portfolio by Faria WebDev showcasing projects, skills, and experience in modern web development technologies.",
  keywords = "Faria WebDev, web developer, frontend developer, React, JavaScript, full stack, MERN",
  url,
  image,
  type = "website",
}) => {
  const siteUrl = (url || process.env.REACT_APP_SITE_URL || "").replace(/\/$/, "");
  const ogImage = image || process.env.REACT_APP_OG_IMAGE || "";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={siteUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
