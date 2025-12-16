import { useEffect } from 'react';

interface SchemaMarkupProps {
  schemas: Record<string, unknown>[];
}

export default function SchemaMarkup({ schemas }: SchemaMarkupProps) {
  useEffect(() => {
    // Add schema markup to head
    schemas.forEach((schema, index) => {
      const scriptId = `schema-${index}`;
      let script = document.getElementById(scriptId) as HTMLScriptElement;

      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }

      script.textContent = JSON.stringify(schema);
    });

    // Cleanup on unmount
    return () => {
      schemas.forEach((_, index) => {
        const script = document.getElementById(`schema-${index}`);
        if (script) {
          script.remove();
        }
      });
    };
  }, [schemas]);

  return null;
}
