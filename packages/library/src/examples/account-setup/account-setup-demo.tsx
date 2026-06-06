"use client";

import { AccountSetup } from '@/library/blocks/account-setup';
import { Camera, Music, Palette, Send, Video, Zap } from 'lucide-react-native';
import { View } from 'react-native';

const GRID_OPTIONS = [
  { id: '1', label: 'Photography', icon: <Camera size={24} className="text-foreground" /> },
  { id: '2', label: 'Music', icon: <Music size={24} className="text-foreground" /> },
  { id: '3', label: 'Design', icon: <Palette size={24} className="text-foreground" /> },
  { id: '4', label: 'Video', icon: <Video size={24} className="text-foreground" /> },
  { id: '5', label: 'Tech', icon: <Zap size={24} className="text-foreground" /> },
  { id: '6', label: 'Marketing', icon: <Send size={24} className="text-foreground" /> },
];

const LIST_OPTIONS = [
  { id: '1', label: 'Personal', description: 'Just for me and my close friends' },
  { id: '2', label: 'Professional', description: 'Grow your business and brand' },
  { id: '3', label: 'Creator', description: 'Share your work with the world' },
];

const CHIP_OPTIONS = [
  { id: '1', label: 'React Native' },
  { id: '2', label: 'Tailwind' },
  { id: '3', label: 'TypeScript' },
  { id: '4', label: 'Next.js' },
  { id: '5', label: 'Node.js' },
  { id: '6', label: 'GraphQL' },
  { id: '7', label: 'Prisma' },
  { id: '8', label: 'Docker' },
  { id: '9', label: 'AWS' },
  { id: '10', label: 'Firebase' },
  { id: '11', label: 'Supabase' },
  { id: '12', label: 'PostgreSQL' },
  { id: '13', label: 'Redis' },
  { id: '14', label: 'Python' },
  { id: '15', label: 'Rust' },
];

export function AccountSetupPreview() {
  const handleFinalSubmit = (data: any) => {
    console.log('Final Data:', data);
    alert('Account Setup Complete!');
  };

  return (
    <View className="flex-1 w-full max-w-md h-[600px] overflow-hidden">
      <AccountSetup.Root totalSteps={3} onSubmit={handleFinalSubmit}>
        <AccountSetup.Header 
          title="Create Profile" 
          description="Customize your experience to get started." 
        />
        
        <AccountSetup.Content>
          <AccountSetup.Step 
            index={0} 
            layoutType="grid" 
            options={GRID_OPTIONS} 
          />
          <AccountSetup.Step 
            index={1} 
            layoutType="list" 
            options={LIST_OPTIONS} 
          />
          <AccountSetup.Step 
            index={2} 
            layoutType="chips" 
            options={CHIP_OPTIONS} 
            multiple 
          />
        </AccountSetup.Content>
        
        <AccountSetup.Footer />
      </AccountSetup.Root>
    </View>
  );
}
