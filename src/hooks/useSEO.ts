import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  schema?: object;
}

export function useSEO({ title, description, schema }: SEOProps) {
  useEffect(() => {
    document.title = `${title} | Freelance Rate Calculator`;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    let schemaScript = document.querySelector('#seo-schema');
    if (schemaScript) {
      schemaScript.remove();
    }
    
    if (schema) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'seo-schema';
      schemaScript.setAttribute('type', 'application/ld+json');
      schemaScript.textContent = JSON.stringify(schema);
      document.head.appendChild(schemaScript);
    }

    return () => {
      if (schemaScript) schemaScript.remove();
    };
  }, [title, description, schema]);
}
