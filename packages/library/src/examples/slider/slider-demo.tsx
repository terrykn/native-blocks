import * as React from 'react';
import { View } from 'react-native';
import { Slider } from '@/library/components/ui/slider';
import { Text } from '~/components/ui/text';

export function SliderPreview() {
  const [value, setValue] = React.useState(50);

  return (
    <View className="w-full max-w-[300px] gap-2 p-6">
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-medium">Brightness</Text>
        <Text className="text-muted-foreground text-sm">{value}%</Text>
      </View>
      <Slider value={value} onValueChange={setValue} />
    </View>
  );
}
