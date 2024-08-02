# Welcome to the React Native Application for Creek Software 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

   If it doesn't start properly, follow the terminal message and install it using `yarn install expo`.

# Challenge

1. Write code that allocates available space in any given view and fits any number of
   views with a ratio 1:1. The views should be given as much space as possible, wrap if
   needed, and there should be no scroll bars. The number of views can increase at any
   time. The squares (views with 1:1 ratio) should have even spacing vertically and
   horizontally. The end result should look like a grid so that you don’t have to scroll to see
   the elements no matter how many elements there are.

2. Create a component with one text input and a text that outputs the input value after
   debouncing it. The text should not be displayed immediately as I input it, but rather, the
   component should wait until I am done typing and then display it.

3. You have to implement the following: We have three components (A, B, C) that both
   need to reference the same arbitrary state, let it be { fontSize: 16 }. All three of them can
   modify it. The component that holds them together (D) is quite basic and not interacting
   with that state. The root component (E) can render any number of components D, and
   the tricky part is to make sure that the states of D instances are not connected and don’t
   conflict. This means that components inside D[0] can have { fontSize: 10 }, while
   components inside D[1] still have the initial { fontSize: 16 }.

- use typescript
- you components should be written in a functional manner
- you can use any online react native sandbox or send us a zip folder with the source code if you prefer that
- please evaluate the assignments before starting working on them and let us know your estimates
- make sure you work efficiently, don’t use AI or copy/paste previous code

## Grid component thought process

Considering we need to know the overall space, we need to know the available height and width which we can get through `Dimensions.get("window").width` and `Dimensions.get("window").width` available from React Native itself. If user moves the screen we need to recalculate this, so we use React `useState` with `useEffect` to listen to this action and properly re-calculate, which is why we use `useCallback` and `useMemo` to cache these calculations per render and only change when the dependency changes.

Next we need to know how many columns to render since it needs to have a 1:1 ratio, the width and height needs to be the same, so we need to know first the size of the called "View", for this we need to know how much `width` we have to work with, then we take the square root of the total length to know how many rows to render and with this number we can get the max `height` and `width` of the "View", then we choose the minimum ideal size and use that and finally we can take the size number and divide it with the `width` to get the columns.

## Debounced Input

This is a more common component used in searchbars when interacting with APIs, the idea is just to simply render an Input component then add the logic of `useDebounce` hook which is commonly known by now in the component itself (could be separate from the component) and apply the logic as it fits.

## Use Context Shared State through fontsize

Another common case, we define the context using `createContext` and generate the shared state using `useContext`. Where we define the `Provider`, which is component `D`, we can create the common shared state and manage it there, sending through the `Provider` the setter and the value we want to share through the children components of `D` which create a unique instance separate from each other as it should, when we add more than one `D` component inside `E` component, it creates a unique value shared on the childrens of `D` separate from the other `D` inside `E`.

# File Structure

Inside `app/(tabs)` we have the render of the screens themselves, their only job is to render the component.

Inside `components` we have `DebouncedInput`, `Fontsize` and `Grid` where the response to the challenges is located. All the rest of files were added by `Expo` framework.
