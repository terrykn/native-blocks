import { PreviewCarousel } from '@showcase/components/preview-carousel';
import * as React from 'react';
import { SliderPreview } from '@/library/examples/slider';

const SliderPreviews = [ { name: 'Default', component: SliderPreview } ] 

export default function SliderScreen() {
  return <PreviewCarousel previews={SliderPreviews} />
}
