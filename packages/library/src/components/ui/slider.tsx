import * as React from 'react';
import { PanResponder, View, type LayoutChangeEvent } from 'react-native';
import { cn } from '~/lib/utils';

interface SliderProps {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    onValueChange?: (value: number) => void;
    className?: string;
    disabled?: boolean;
}

function Slider({
    value = 0,
    min = 0,
    max = 100,
    step = 1,
    onValueChange,
    className,
    disabled = false,
}: SliderProps) {
    const sliderRef = React.useRef<View>(null);

    // Store mutable state in refs so PanResponder handlers always see fresh values
    const widthRef = React.useRef(0);
    const sliderXRef = React.useRef(0);
    const disabledRef = React.useRef(disabled);
    const internalValue = React.useRef(value);
    const onValueChangeRef = React.useRef(onValueChange);

    React.useEffect(() => { disabledRef.current = disabled; }, [disabled]);
    React.useEffect(() => { internalValue.current = value; }, [value]);
    React.useEffect(() => { onValueChangeRef.current = onValueChange; }, [onValueChange]);

    const getValueFromPosition = (position: number) => {
        const w = widthRef.current;
        if (w === 0) return internalValue.current;
        const percentage = Math.min(Math.max(position / w, 0), 1);
        const rawValue = percentage * (max - min) + min;
        const steppedValue = Math.round(rawValue / step) * step;
        return Math.min(Math.max(steppedValue, min), max);
    };

    const updateValue = (pageX: number) => {
        if (disabledRef.current || widthRef.current === 0) return;
        const position = pageX - sliderXRef.current;
        const newValue = getValueFromPosition(position);
        if (newValue !== internalValue.current) {
            internalValue.current = newValue;
            onValueChangeRef.current?.(newValue);
        }
    };

    // Create PanResponder once — handlers read from refs, never stale
    const panResponder = React.useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => !disabledRef.current,
            onMoveShouldSetPanResponder: () => !disabledRef.current,
            onPanResponderGrant: (event) => {
                updateValue(event.nativeEvent.pageX);
            },
            onPanResponderMove: (event) => {
                updateValue(event.nativeEvent.pageX);
            },
            onPanResponderRelease: () => { },
        })
    ).current;

    const onLayout = (e: LayoutChangeEvent) => {
        widthRef.current = e.nativeEvent.layout.width;
        // Re-measure page position whenever layout changes (rotation, etc.)
        sliderRef.current?.measure((_x, _y, _w, _h, pageX) => {
            sliderXRef.current = pageX;
        });
    };

    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <View
            ref={sliderRef}
            onLayout={onLayout}
            className={cn('relative h-5 w-full justify-center', disabled && 'opacity-50', className)}
            {...panResponder.panHandlers}
        >
            <View className="bg-secondary h-2 w-full rounded-full" />
            <View
                className="bg-primary absolute h-2 rounded-full"
                style={{ width: `${percentage}%` }}
            />
            <View
                className="bg-background border-primary absolute h-5 w-5 rounded-full border-2 shadow-sm"
                style={{ left: `${percentage}%`, marginLeft: -10 }}
            />
        </View>
    );
}

export { Slider };
export type { SliderProps };