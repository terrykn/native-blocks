import { cn } from '@docs/lib/utils';

export function NbIcon({
    className,
    pathClassName,
    ...props
}: {
    className?: string;
    pathClassName?: string;
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 28 28"
            fill="none"
            className={cn('w-5', className)}
            shapeRendering="geometricPrecision"
            {...props}
        >
            <path
                d="M12.5 14.8613V23.6514L5 19.2764V10.4863L12.5 14.8613ZM23 19.2764L15.5 23.6514V14.8613L23 10.4863V19.2764ZM21.5332 7.86816L14 12.2627L6.46582 7.86816L14 3.47363L21.5332 7.86816Z"
                className={(pathClassName)}
                fill="currentColor"
            />
        </svg>
    );
}