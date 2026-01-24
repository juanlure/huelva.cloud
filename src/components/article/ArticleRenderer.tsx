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
                    return <RichImage src={src} alt={alt || ''} />;
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
                    const caption = domNode.children.find(child => child instanceof Element && child.name === 'figcaption') as Element;

                    if (img) {
                        const src = img.attribs.src;
                        const alt = img.attribs.alt || (caption ? (caption.children[0] as any)?.data : '');
                        return <RichImage src={src} alt={alt} />;
                    }
                }
            }
        },
    };

    return <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-orange-600">
        {parse(content, options)}
    </div>;
}
