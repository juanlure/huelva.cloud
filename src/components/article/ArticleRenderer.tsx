'use client';

import React from 'react';
import parse, { DOMNode, Element, domToReact } from 'html-react-parser';
import RichImage from './RichImage';
import RichQuote from './RichQuote';
import TipBox from './TipBox';

interface ArticleRendererProps {
    content: string;
}

export default function ArticleRenderer({ content }: ArticleRendererProps) {
    const options = {
        replace: (domNode: DOMNode) => {
            if (domNode instanceof Element) {
                // 1. Replace <img> with RichImage
                if (domNode.name === 'img') {
                    const { src, alt } = domNode.attribs;
                    return <RichImage src={src} alt={alt || ''} caption={undefined} />;
                }

                // 2. Replace <blockquote> with RichQuote
                if (domNode.name === 'blockquote') {
                    return <RichQuote>{domToReact(domNode.children as DOMNode[], options)}</RichQuote>;
                }

                // 3. Replace <div class="tip-box"> with TipBox
                if (domNode.name === 'div' && domNode.attribs.class?.includes('tip-box')) {
                    // We extract the inner content, usually "💡 <strong>Consejo Pro: </strong> Text"
                    // We might want to clean strictly or just render children
                    return <TipBox>{domToReact(domNode.children as DOMNode[], options)}</TipBox>;
                }

                // 4. Transform Figures (often from Agent generated images)
                if (domNode.name === 'figure') {
                    // Check if it has an image inside
                    const img = domNode.children.find(child => child instanceof Element && child.name === 'img') as Element;
                    const captionNode = domNode.children.find(child => child instanceof Element && child.name === 'figcaption') as Element;

                    if (img) {
                        const src = img.attribs.src;
                        const alt = img.attribs.alt || '';
                        const caption = captionNode ? domToReact(captionNode.children as DOMNode[], options) : undefined;

                        // If caption is a string, pass it, otherwise let RichImage handle alt as fallback
                        return <RichImage
                            src={src}
                            alt={alt}
                            caption={typeof caption === 'string' ? caption : undefined}
                        />;
                    }
                }
            }
        },
    };

    try {
        return (
            <div className="prose prose-lg prose-navy prose-headings:font-display prose-headings:font-bold prose-p:leading-8 prose-p:text-navy/80 hover:prose-a:text-terracotta transition-all">
                {parse(content, options)}
            </div>
        );
    } catch (error) {
        console.error("Error parsing article content:", error);
        return (
            <div className="prose prose-lg">
                <p className="text-red-500 bg-red-50 p-4 rounded-lg border border-red-100 italic">
                    Lo sentimos, ha habido un problema cargando parte del contenido.
                    Estamos trabajando en ello (seguramente algo se nos ha escapao).
                </p>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        );
    }
}
