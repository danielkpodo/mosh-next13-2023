import Script from 'next/script';

const GoogleAnalyticsScript = () => {
  return (
    <>
      <Script async src='https://www.googletagmanager.com/gtag/js?id=TAG_ID' />
      {/* the id is required for inline script, just pass something into the id to suppress the error */}
      <Script id='my-website-tracking-script'>
        {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'TAG_ID');`}
      </Script>
    </>
  );
};

export default GoogleAnalyticsScript;
