'use client';

import React, { useEffect } from 'react';
import parse, { DOMNode, Element, domToReact } from 'html-react-parser';
import RichImage from './RichImage';
import RichQuote from './RichQuote';
import TipBox from './TipBox';
import styles from './ProseContent.module.css';

interface ArticleRendererProps {
  content: string;
}

export default function ArticleRenderer({ content }: ArticleRendererProps) {
  // Scroll progress effect
  useEffect(() => {
    const progressBar = document.querySelector('[data-progress-line]') as HTMLElement;
    if (!progressBar) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const options = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element) {
        // Images
        if (domNode.name === 'img') {
          const { src, alt } = domNode.attribs;
          return <RichImage src={src} alt={alt || ''} caption={undefined} />;
        }

        // Blockquotes
        if (domNode.name === 'blockquote') {
          return <RichQuote>{domToReact(domNode.children as DOMNode[], options)}</RichQuote>;
        }

        // Tip boxes
        if (domNode.name === 'div' && domNode.attribs.class?.includes('tip-box')) {
          return <TipBox>{domToReact(domNode.children as DOMNode[], options)}</TipBox>;
        }

        // Figures
        if (domNode.name === 'figure') {
          const img = domNode.children.find(child => child instanceof Element && child.name === 'img') as Element;
          const captionNode = domNode.children.find(child => child instanceof Element && child.name === 'figcaption') as Element;

          if (img) {
            const src = img.attribs.src;
            const alt = img.attribs.alt || '';
            const caption = captionNode ? domToReact(captionNode.children as DOMNode[], options) : undefined;

            return <RichImage src={src} alt={alt} caption={typeof caption === 'string' ? caption : undefined} />;
          }
        }

        // Paragraphs - wrap for animation
        if (domNode.name === 'p') {
          const content = domToReact(domNode.children as DOMNode[], options);
          return (
            <p className="contentParagraph">
              {content}
            </p>
          );
        }

        // Headings - wrap for animation
        if (domNode.name === 'h2' || domNode.name === 'h3') {
          const content = domToReact(domNode.children as DOMNode[], options);
          const Tag = domNode.name;
          return (
            <Tag className="contentHeading">
              {content}
            </Tag>
          );
        }
      }
    },
  };

  try {
    return (
      <div className={styles.proseContent}>
        {parse(content, options)}
      </div>
    );
  } catch (error) {
    console.error("Error parsing article content:", error);
    return (
      <div className="error-state">
        <p className="text-red-500 bg-red-50 p-4 rounded-lg border border-red-100 italic">
          Lo sentimos, ha habido un problema cargando parte del contenido.
        </p>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }
}
