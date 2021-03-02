import { HTMLAttributes } from 'vue'
import type Controller from '../Controller'
import type Recognizer from '../recognizers/Recognizer'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type AtLeastOneOf<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U]

export type Vector2 = [number, number]
export type Fn = any

export interface GenericOptions {
  domTarget?: EventTarget
  window?: EventTarget
  eventOptions?: { capture?: boolean; passive?: boolean }
  enabled?: boolean
  transform?: (v: Vector2) => Vector2
}

export interface GestureOptions<T extends StateKey> {
  enabled?: boolean
  initial?: Vector2 | ((state: State[T]) => Vector2)
  threshold?: number | Vector2
  triggerAllEvents?: boolean
  rubberband?: boolean | number | Vector2
  transform?: (v: Vector2) => Vector2
}

export type Bounds = {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export type CoordinatesConfig<T extends CoordinatesKey> = GestureOptions<T> & {
  axis?: 'x' | 'y'
  lockDirection?: boolean
  bounds?: Bounds | ((state: State[T]) => Bounds)
}

export type DistanceAngleBounds = { min?: number; max?: number }

export type DistanceAngleConfig<
  T extends DistanceAngleKey
> = GestureOptions<T> & {
  distanceBounds?:
    | DistanceAngleBounds
    | ((state: State[T]) => DistanceAngleBounds)
  angleBounds?: DistanceAngleBounds | ((state: State[T]) => DistanceAngleBounds)
}

export type DragConfig = CoordinatesConfig<'drag'> & {
  filterTaps?: boolean
  useTouch?: boolean
  swipeVelocity?: number | Vector2
  swipeDistance?: number | Vector2
  swipeDuration?: number
  experimental_preventWindowScrollY?: boolean
  delay?: boolean | number
}

export type UseDragConfig = GenericOptions & DragConfig
export type UsePinchConfig = GenericOptions & DistanceAngleConfig<'pinch'>
export type UseWheelConfig = GenericOptions & CoordinatesConfig<'wheel'>
export type UseScrollConfig = GenericOptions & CoordinatesConfig<'scroll'>
export type UseMoveConfig = GenericOptions & CoordinatesConfig<'move'>
export type UseHoverConfig = GenericOptions

export type UseGestureConfig = GenericOptions & {
  drag?: DragConfig
  wheel?: CoordinatesConfig<'wheel'>
  scroll?: CoordinatesConfig<'scroll'>
  move?: CoordinatesConfig<'move'>
  pinch?: DistanceAngleConfig<'pinch'>
  hover?: { enabled?: boolean }
}

export interface InternalGenericOptions {
  domTarget?: EventTarget
  eventOptions: { capture?: boolean; passive?: boolean }
  window?: EventTarget
  enabled: boolean
  transform?: (v: Vector2) => Vector2
}

export interface InternalGestureOptions<T extends StateKey> {
  enabled: boolean
  initial: Vector2 | ((state: State[T]) => Vector2)
  threshold: Vector2
  triggerAllEvents: boolean
  rubberband: Vector2
  bounds: [Vector2, Vector2] | ((state: State[T]) => [Vector2, Vector2])
  transform?: (v: Vector2) => Vector2
}

export interface InternalCoordinatesOptions<T extends CoordinatesKey>
  extends InternalGestureOptions<T> {
  axis?: 'x' | 'y'
  lockDirection: boolean
}

export interface InternalDistanceAngleOptions<T extends DistanceAngleKey>
  extends InternalGestureOptions<T> {}

export interface InternalDragOptions
  extends InternalCoordinatesOptions<'drag'> {
  filterTaps: boolean
  useTouch: boolean
  experimental_preventWindowScrollY: boolean
  swipeVelocity: Vector2
  swipeDistance: Vector2
  swipeDuration: number
  delay: number
}

export type InternalConfig = InternalGenericOptions & {
  drag?: InternalDragOptions
  wheel?: InternalCoordinatesOptions<'wheel'>
  scroll?: InternalCoordinatesOptions<'scroll'>
  move?: InternalCoordinatesOptions<'move'>
  pinch?: InternalDistanceAngleOptions<'pinch'>
  hover?: { enabled: boolean; transform?: (v: Vector2) => Vector2 }
}

export type WebKitGestureEvent = PointerEvent & {
  scale: number
  rotation: number
}

export type DomEvents =
  | TouchEvent
  | PointerEvent
  | WheelEvent
  | UIEvent
  | WebKitGestureEvent

export interface EventHandlers {
  // Mouse Events
  onMouseDown?: Fn
  onMouseDownCapture?: Fn
  onMouseEnter?: Fn
  onMouseLeave?: Fn
  onMouseMove?: Fn
  onMouseMoveCapture?: Fn
  onMouseOut?: Fn
  onMouseOutCapture?: Fn
  onMouseOver?: Fn
  onMouseOverCapture?: Fn
  onMouseUp?: Fn
  onMouseUpCapture?: Fn
  // Touch Events
  onTouchCancel?: Fn
  onTouchCancelCapture?: Fn
  onTouchEnd?: Fn
  onTouchEndCapture?: Fn
  onTouchMove?: Fn
  onTouchMoveCapture?: Fn
  onTouchStart?: Fn
  onTouchStartCapture?: Fn

  // Pointer Events
  onPointerDown?: Fn
  onPointerDownCapture?: Fn
  onPointerMove?: Fn
  onPointerMoveCapture?: Fn
  onPointerUp?: Fn
  onPointerUpCapture?: Fn
  onPointerCancel?: Fn
  onPointerCancelCapture?: Fn
  onPointerEnter?: Fn
  onPointerEnterCapture?: Fn
  onPointerLeave?: Fn
  onPointerLeaveCapture?: Fn
  onPointerOver?: Fn
  onPointerOverCapture?: Fn
  onPointerOut?: Fn
  onPointerOutCapture?: Fn
  onGotPointerCapture?: Fn
  onGotPointerCaptureCapture?: Fn
  onLostPointerCapture?: Fn
  onLostPointerCaptureCapture?: Fn

  // UI Events
  onScroll?: Fn
  onScrollCapture?: Fn

  // Wheel Events
  onWheel?: Fn
  onWheelCapture?: Fn

  // Cheat mode for Gesture Events
  onGestureStart?: Fn
  onGestureChange?: Fn
  onGestureEnd?: Fn

  // onClick for drag / filterTaps
  onClick?: Fn
  onClickCapture?: Fn
}

export type EventHandlersKey = keyof EventHandlers

export type IngKey =
  | 'hovering'
  | 'scrolling'
  | 'wheeling'
  | 'dragging'
  | 'moving'
  | 'pinching'
export type CoordinatesKey = 'drag' | 'wheel' | 'move' | 'scroll'
export type DistanceAngleKey = 'pinch'
export type GestureKey = CoordinatesKey | DistanceAngleKey | 'hover'
export type StateKey<T extends GestureKey = GestureKey> = T extends 'hover'
  ? 'move'
  : T

export type SharedGestureState = { [ingKey in IngKey]: boolean } & {
  touches: number
  down: boolean
  buttons: number
  shiftKey: boolean
  altKey: boolean
  metaKey: boolean
  ctrlKey: boolean
  locked: boolean
}

export type EventTypes = {
  drag: PointerEvent
  wheel: WheelEvent
  scroll: UIEvent
  move: PointerEvent
  pinch: TouchEvent | WheelEvent | WebKitGestureEvent
  hover: PointerEvent
}

export interface CommonGestureState {
  _active: boolean
  _blocked: boolean
  _intentional: [false | number, false | number]
  _movement: Vector2
  _initial: Vector2
  _bounds: [Vector2, Vector2]
  _lastEventType?: string
  _dragTarget?: EventTarget | (EventTarget & Element) | null
  _dragPointerId?: number | null
  _dragStarted: boolean
  _dragPreventScroll: boolean
  _dragIsTap: boolean
  _dragDelayed: boolean
  event?: UIEvent
  intentional: boolean
  values: Vector2
  velocities: Vector2
  delta: Vector2
  movement: Vector2
  offset: Vector2
  lastOffset: Vector2
  initial: Vector2
  previous: Vector2
  direction: Vector2
  first: boolean
  last: boolean
  active: boolean
  startTime: number
  timeStamp: number
  elapsedTime: number
  cancel(): void
  canceled: boolean
  memo?: any
  args?: any
}

export interface Coordinates {
  axis?: 'x' | 'y'
  xy: Vector2
  velocity: number
  vxvy: Vector2
  distance: number
}

export interface DragState {
  _pointerId?: number
  tap: boolean
  swipe: Vector2
}

export interface PinchState {
  _pointerIds: [number, number]
}

export interface DistanceAngle {
  da: Vector2
  vdva: Vector2
  origin: Vector2
  turns: number
}

export type State = {
  shared: SharedGestureState
  drag: CommonGestureState & Coordinates & DragState
  wheel: CommonGestureState & Coordinates
  scroll: CommonGestureState & Coordinates
  move: CommonGestureState & Coordinates
  pinch: CommonGestureState & DistanceAngle & PinchState
}

export type GestureState<T extends StateKey> = State[T]
export type PartialGestureState<T extends StateKey> = Partial<GestureState<T>>

export type FullGestureState<T extends StateKey> = SharedGestureState & State[T]

export type Handler<T extends GestureKey, K = EventTypes[T]> = (
  state: Omit<FullGestureState<StateKey<T>>, 'event'> & { event: K },
) => any | void

export type InternalHandlers = { [Key in GestureKey]?: Handler<Key, any> }

type NativeHandlersKeys = keyof Omit<
  HTMLAttributes,
  keyof UserHandlers & keyof HTMLAttributes
>

// allows overriding the event type from the returned state in handlers
export type AnyGestureEventTypes = Partial<
  {
    drag: any
    wheel: any
    scroll: any
    move: any
    pinch: any
    hover: any
  } & { [key in NativeHandlersKeys]: any }
>

// if no type is provided in the user generic for a given key
// then return the default EventTypes that key
type check<
  T extends AnyGestureEventTypes,
  Key extends GestureKey
> = undefined extends T[Key] ? EventTypes[Key] : T[Key]

export type UserHandlers<T extends AnyGestureEventTypes = EventTypes> = {
  onDrag: Handler<'drag', check<T, 'drag'>>
  onDragStart: Handler<'drag', check<T, 'drag'>>
  onDragEnd: Handler<'drag', check<T, 'drag'>>
  onPinch: Handler<'pinch', check<T, 'pinch'>>
  onPinchStart: Handler<'pinch', check<T, 'pinch'>>
  onPinchEnd: Handler<'pinch', check<T, 'pinch'>>
  onWheel: Handler<'wheel', check<T, 'wheel'>>
  onWheelStart: Handler<'wheel', check<T, 'wheel'>>
  onWheelEnd: Handler<'wheel', check<T, 'wheel'>>
  onMove: Handler<'move', check<T, 'move'>>
  onMoveStart: Handler<'move', check<T, 'move'>>
  onMoveEnd: Handler<'move', check<T, 'move'>>
  onScroll: Handler<'scroll', check<T, 'scroll'>>
  onScrollStart: Handler<'scroll', check<T, 'scroll'>>
  onScrollEnd: Handler<'scroll', check<T, 'scroll'>>
  onHover: Handler<'hover', check<T, 'hover'>>
}

export type RecognizerClass = {
  new (controller: Controller, args: any): Recognizer
}

export type NativeHandlers<T extends AnyGestureEventTypes = {}> = {
  [key in NativeHandlersKeys]: (
    state: SharedGestureState & {
      event: undefined extends T[key] ? Event : T[key]
      args: any
    },
    ...args: any
  ) => void
}

export type Handlers<T extends AnyGestureEventTypes = EventTypes> = Partial<
  UserHandlers<T> & NativeHandlers<T>
>

export type HookReturnType<
  T extends { domTarget?: EventTarget }
> = T['domTarget']
