import React from 'react';
import SweetDetailClient from './SweetDetailClient';

// Generate static params for static export
export async function generateStaticParams() {
  // For static export, we'll generate some common sweet IDs
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' },
  ];
}

const SweetDetailPage = ({ params }: { params: { id: string } }) => {
  return <SweetDetailClient id={params.id} />;
};

export default SweetDetailPage;
