"use client";
import * as React from 'react';
import { Pressable, ScrollView, View, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
    SlideInRight,
    SlideOutLeft
} from 'react-native-reanimated';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';
import { Camera, Music, Palette, Send, Video, Zap } from 'lucide-react-native';

const triggerSelectionHaptic = () => {
    if (Platform.OS !== 'web') {
        Haptics.selectionAsync().catch(() => { });
    }
};

const triggerSuccessHaptic = () => {
    if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => { });
    }
};

const triggerImpactHaptic = (style: Haptics.ImpactFeedbackStyle) => {
    if (Platform.OS !== 'web') {
        Haptics.impactAsync(style).catch(() => { });
    }
};

interface AccountSetupContextValue {
    currentStep: number;
    totalSteps: number;
    formData: Record<string, any>;
    canGoNext: boolean;
    nextStep: () => void;
    prevStep: () => void;
    setCanGoNext: (can: boolean) => void;
    updateFormData: (stepIndex: number, value: any) => void;
    onSubmit: (data: Record<string, any>) => void;
}

const AccountSetupContext = React.createContext<AccountSetupContextValue | null>(null);

function useAccountSetup() {
    const context = React.useContext(AccountSetupContext);
    if (!context) {
        throw new Error('AccountSetup components must be used within an AccountSetup.Root');
    }
    return context;
}

interface RootProps {
    children: React.ReactNode;
    totalSteps: number;
    onSubmit: (data: Record<string, any>) => void;
    className?: string;
}

function Root({ children, totalSteps, onSubmit, className }: RootProps) {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [formData, setFormData] = React.useState<Record<string, any>>({});
    const [canGoNext, setCanGoNext] = React.useState(false);

    const nextStep = React.useCallback(() => {
        if (currentStep < totalSteps - 1) {
            triggerSelectionHaptic();
            setCurrentStep((prev) => prev + 1);
        } else {
            triggerSuccessHaptic();
            onSubmit(formData);
        }
    }, [currentStep, totalSteps, formData, onSubmit]);

    const prevStep = React.useCallback(() => {
        if (currentStep > 0) {
            triggerSelectionHaptic();
            setCurrentStep((prev) => prev - 1);
        }
    }, [currentStep]);

    const updateFormData = React.useCallback((stepIndex: number, value: any) => {
        setFormData((prev) => ({ ...prev, [stepIndex]: value }));
    }, []);

    const value = React.useMemo(
        () => ({
            currentStep,
            totalSteps,
            formData,
            canGoNext,
            nextStep,
            prevStep,
            setCanGoNext,
            updateFormData,
            onSubmit,
        }),
        [currentStep, totalSteps, formData, canGoNext, nextStep, prevStep, updateFormData, onSubmit]
    );

    return (
        <AccountSetupContext.Provider value={value}>
            <View className={cn('bg-background flex-1', className)}>{children}</View>
        </AccountSetupContext.Provider>
    );
}

interface HeaderProps {
    title: string;
    description?: string;
    className?: string;
}

function Header({ title, description, className }: HeaderProps) {
    const { currentStep, totalSteps } = useAccountSetup();
    const progress = ((currentStep + 1) / totalSteps) * 100;
    return (
        <View className={cn('px-6 pt-6 pb-4 gap-4', className)}>
            <View className="gap-1">
                <Text variant="h3" className="text-2xl font-bold">
                    {title}
                </Text>
                {description && (
                    <Text variant="muted" className="text-muted-foreground">
                        {description}
                    </Text>
                )}
            </View>
            <Progress value={progress} />
        </View>
    );
}

interface ContentProps {
    children: React.ReactNode;
    className?: string;
}

function Content({ children, className }: ContentProps) {
    const { currentStep } = useAccountSetup();

    let activeChild: React.ReactNode = null;
    React.Children.forEach(children, (child) => {
        if (
            React.isValidElement<{ index: number }>(child) &&
            child.props.index === currentStep
        ) {
            activeChild = child;
        }
    });

    return (
        <View className={cn('flex-1 px-6', className)}>
            <Animated.View
                key={currentStep}
                entering={SlideInRight.duration(300)}
                exiting={SlideOutLeft.duration(300)}
                style={{ flex: 1 }}
            >
                {activeChild}
            </Animated.View>
        </View>
    );
}

type LayoutType = 'grid' | 'list' | 'chips';

interface Option {
    id: string;
    label: string;
    icon?: React.ReactNode;
    description?: string;
}

interface StepProps {
    index: number;
    layoutType: LayoutType;
    options: Option[];
    multiple?: boolean;
}

function Step({ index, layoutType, options, multiple = false }: StepProps) {
    const { formData, updateFormData, setCanGoNext } = useAccountSetup();
    const selectedValues = formData[index] || (multiple ? [] : null);

    React.useEffect(() => {
        const hasValue = multiple ? (selectedValues as string[]).length > 0 : !!selectedValues;
        setCanGoNext(hasValue);
    }, [selectedValues, multiple, setCanGoNext]);

    const isSelected = (id: string) => {
        if (multiple) {
            return (selectedValues as string[]).includes(id);
        }
        return selectedValues === id;
    };

    const toggleOption = (id: string) => {
        triggerImpactHaptic(Haptics.ImpactFeedbackStyle.Light);
        let newValue;
        if (multiple) {
            const current = selectedValues as string[];
            if (current.includes(id)) {
                newValue = current.filter((v) => v !== id);
            } else {
                newValue = [...current, id];
            }
        } else {
            newValue = id;
        }
        updateFormData(index, newValue);
    };

    if (layoutType === 'grid') {
        return (
            <View className="flex-row flex-wrap gap-4">
                {options.slice(0, 6).map((option) => (
                    <Pressable
                        key={option.id}
                        onPress={() => toggleOption(option.id)}
                        className="w-[47%]"
                    >
                        <Card
                            className={cn(
                                'items-center justify-center p-4 h-32',
                                isSelected(option.id) ? 'border-primary bg-primary/5' : 'border-border'
                            )}
                        >
                            {option.icon && <View className="mb-2">{option.icon}</View>}
                            <Text className={cn('text-center font-medium', isSelected(option.id) && 'text-primary')}>
                                {option.label}
                            </Text>
                        </Card>
                    </Pressable>
                ))}
            </View>
        );
    }

    if (layoutType === 'list') {
        return (
            <View className="gap-3">
                {options.map((option) => (
                    <Pressable key={option.id} onPress={() => toggleOption(option.id)}>
                        <Card
                            className={cn(
                                'flex-row items-center p-4 gap-4',
                                isSelected(option.id) ? 'border-primary bg-primary/5' : 'border-border'
                            )}
                        >
                            {option.icon && <View>{option.icon}</View>}
                            <View className="flex-1">
                                <Text className={cn('font-medium', isSelected(option.id) && 'text-primary')}>
                                    {option.label}
                                </Text>
                                {option.description && (
                                    <Text variant="muted" className="text-xs">
                                        {option.description}
                                    </Text>
                                )}
                            </View>
                        </Card>
                    </Pressable>
                ))}
            </View>
        );
    }

    if (layoutType === 'chips') {
        return (
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                <View className="flex-row flex-wrap gap-2 pt-2">
                    {options.map((option) => (
                        <Pressable
                            key={option.id}
                            onPress={() => toggleOption(option.id)}
                            className={cn(
                                'rounded-full px-4 py-2 border',
                                isSelected(option.id)
                                    ? 'bg-primary border-primary'
                                    : 'bg-background border-border'
                            )}
                        >
                            <Text
                                className={cn(
                                    'text-sm font-medium',
                                    isSelected(option.id) ? 'text-primary-foreground' : 'text-foreground'
                                )}
                            >
                                {option.label}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        );
    }

    return null;
}

interface FooterProps {
    className?: string;
    nextLabel?: string;
    backLabel?: string;
    finishLabel?: string;
}

function Footer({
    className,
    nextLabel = 'Next',
    backLabel = 'Back',
    finishLabel = 'Finish'
}: FooterProps) {
    const { currentStep, totalSteps, canGoNext, nextStep, prevStep } = useAccountSetup();
    const isLastStep = currentStep === totalSteps - 1;

    return (
        <View className={cn('px-6 py-6 border-t border-border flex-row gap-4 bg-background', className)}>
            {currentStep > 0 && (
                <Button
                    variant="outline"
                    className="flex-1 h-12"
                    onPress={prevStep}
                >
                    <Text>{backLabel}</Text>
                </Button>
            )}
            <Button
                className={cn('flex-1 h-12', !canGoNext && 'opacity-50')}
                disabled={!canGoNext}
                onPress={nextStep}
            >
                <Text>{isLastStep ? finishLabel : nextLabel}</Text>
            </Button>
        </View>
    );
}

export const AccountSetup = {
    Root,
    Header,
    Content,
    Step,
    Footer,
};