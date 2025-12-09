/**
 * Animation utility functions for consistent motion configurations
 * Ensures compatibility with Motion 11+ and prevents animation errors
 */

export interface SafeAnimationConfig {
  duration?: number;
  repeat?: number;
  ease?: string | string[] | [number, number, number, number];
  delay?: number;
  repeatType?: "loop" | "reverse" | "mirror";
  repeatDelay?: number;
}

/**
 * Creates a safe animation configuration that prevents negative or invalid values
 */
export function createSafeAnimation(config: SafeAnimationConfig): SafeAnimationConfig {
  return {
    duration: Math.max(config.duration || 1, 0.1), // Ensure positive duration
    repeat: config.repeat || 0,
    ease: config.ease || "easeInOut",
    delay: Math.max(config.delay || 0, 0), // Ensure non-negative delay
    repeatType: config.repeatType,
    repeatDelay: config.repeatDelay ? Math.max(config.repeatDelay, 0) : undefined,
  };
}

/**
 * Common animation presets for consistent UI animations
 */
export const animationPresets = {
  // Infinite loops
  infiniteRotate: createSafeAnimation({
    duration: 2,
    repeat: 999999,
    ease: "linear"
  }),
  
  infinitePulse: createSafeAnimation({
    duration: 2,
    repeat: 999999,
    ease: "easeInOut",
    repeatType: "reverse"
  }),
  
  infiniteFloat: createSafeAnimation({
    duration: 3,
    repeat: 999999,
    ease: "easeInOut",
    repeatType: "reverse"
  }),
  
  infiniteGlow: createSafeAnimation({
    duration: 2,
    repeat: 999999,
    ease: "easeInOut",
    repeatType: "reverse"
  }),
  
  // One-time animations
  fadeIn: createSafeAnimation({
    duration: 0.5,
    ease: "easeOut"
  }),
  
  slideIn: createSafeAnimation({
    duration: 0.6,
    ease: "easeOut"
  }),
  
  scaleIn: createSafeAnimation({
    duration: 0.4,
    ease: "backOut"
  }),
  
  // Text animations
  typewriter: createSafeAnimation({
    duration: 1,
    repeat: 999999,
    ease: "linear"
  })
};

/**
 * Validates animation values before applying them
 */
export function validateAnimationValue(value: number, fallback: number = 1): number {
  if (typeof value !== 'number' || isNaN(value) || value < 0) {
    console.warn(`Invalid animation value: ${value}, using fallback: ${fallback}`);
    return fallback;
  }
  return value;
}

/**
 * Creates a safe random duration within a range
 */
export function safeRandomDuration(min: number = 1, max: number = 3): number {
  const duration = Math.random() * (max - min) + min;
  return validateAnimationValue(duration, min);
}

/**
 * Validate opacity values for animations (must be between 0.01 and 1)
 */
export function safeOpacity(value: number): number {
  return Math.max(Math.min(value, 1), 0.01);
}

/**
 * Validate array of opacity values
 */
export function safeOpacityArray(values: number[]): number[] {
  return values.map(safeOpacity);
}

/**
 * Validate duration for animations (must be at least 0.1 seconds)
 */
export function safeDuration(value: number): number {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    console.warn(`Invalid duration value: ${value}, using fallback: 0.1`);
    return 0.1;
  }
  return Math.max(value, 0.1);
}

/**
 * Validate repeat values for animations - ensures compatibility with Motion 11+
 */
export function safeRepeat(value: number | undefined): number {
  if (typeof value === 'number' && !isNaN(value) && isFinite(value) && value >= 0) {
    return Math.max(0, Math.floor(value));
  }
  return 0;
}

/**
 * Create a safe transition object that prevents all animation errors
 * This function ensures all values are valid and compatible with Motion 11+
 */
export function safeTransition(config: {
  duration?: number;
  repeat?: number;
  ease?: string;
  delay?: number;
  repeatType?: "loop" | "reverse" | "mirror";
  repeatDelay?: number;
  type?: string;
  stiffness?: number;
  damping?: number;
  [key: string]: any;
}): any {
  // Ensure all numeric values are valid before creating the transition object
  const safeDur = safeDuration(config.duration || 1);
  const safeRep = safeRepeat(config.repeat);
  const safeDelay = Math.max(config.delay || 0, 0);
  const safeRepeatDelay = config.repeatDelay ? Math.max(config.repeatDelay, 0) : undefined;
  
  // Create base transition object with guaranteed safe values
  const transition: any = {
    duration: safeDur,
    ease: config.ease || "easeInOut",
    delay: safeDelay,
  };
  
  // Copy over any other properties that might be needed
  Object.keys(config).forEach(key => {
    if (!['duration', 'ease', 'delay', 'repeat', 'repeatType', 'repeatDelay'].includes(key)) {
      transition[key] = config[key];
    }
  });
  
  // Only add repeat if it's a valid value
  if (typeof safeRep === 'number' && safeRep >= 0) {
    transition.repeat = safeRep;
  }
  
  // Only add repeatType if we have a valid repeat value
  if (config.repeatType && typeof safeRep === 'number' && safeRep > 0) {
    transition.repeatType = config.repeatType;
  }
  
  // Only add repeatDelay if we have a valid repeat value and delay
  if (safeRepeatDelay !== undefined && typeof safeRep === 'number' && safeRep > 0) {
    transition.repeatDelay = safeRepeatDelay;
  }
  
  return transition;
}

/**
 * Create safe animate props for Motion components
 * Handles arrays of values and ensures all properties are valid
 */
export function safeAnimate(config: {
  opacity?: number | number[];
  scale?: number | number[];
  x?: number | number[];
  y?: number | number[];
  rotate?: number | number[];
  [key: string]: any;
}): any {
  const result: any = {};
  
  // Handle opacity arrays specifically
  if (config.opacity !== undefined) {
    if (Array.isArray(config.opacity)) {
      result.opacity = safeOpacityArray(config.opacity);
    } else {
      result.opacity = safeOpacity(config.opacity);
    }
  }
  
  // Handle other numeric arrays
  ['scale', 'x', 'y', 'rotate'].forEach(prop => {
    if (config[prop] !== undefined) {
      if (Array.isArray(config[prop])) {
        result[prop] = config[prop].map((val: number) => 
          typeof val === 'number' && !isNaN(val) && isFinite(val) ? val : 0
        );
      } else {
        const val = config[prop];
        result[prop] = typeof val === 'number' && !isNaN(val) && isFinite(val) ? val : 0;
      }
    }
  });
  
  // Copy over any other safe properties
  Object.keys(config).forEach(key => {
    if (!['opacity', 'scale', 'x', 'y', 'rotate'].includes(key)) {
      result[key] = config[key];
    }
  });
  
  return result;
}
