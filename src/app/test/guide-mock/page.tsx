'use client';

import React from 'react';
import GuideRenderer from '../../../components/guide/GuideRenderer';
import { MOCK_GUIDE } from './data';

export default function MockGuidePage() {
    return <GuideRenderer guide={MOCK_GUIDE} />;
}
