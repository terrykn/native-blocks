import { PreviewCarousel } from '@showcase/components/preview-carousel';
import * as React from 'react';
import { AccountSetupPreview } from '@/library/examples/account-setup';

const AccountSetupPreviews = [ { name: 'Default', component: AccountSetupPreview } ] 

export default function AccountSetupScreen() {
  return <PreviewCarousel previews={AccountSetupPreviews} />
}
