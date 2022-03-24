export const clamp = (num: number, min: number, max: number) =>
    Math.min(Math.max(min, num), max);

export function isMouseEvent(e: Event): e is MouseEvent {
    return (e as MouseEvent).pageX !== undefined;
}

export function isTouchEvent(e: Event): e is MouseEvent {
    return (e as TouchEvent).changedTouches !== undefined;
}
