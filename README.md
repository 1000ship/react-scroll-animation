<h1 align="center">🎞 react-scroll-motion ✨</h1>
<p>
  <a href="https://www.npmjs.com/package/react-scroll-motion" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/react-scroll-motion.svg">
  </a>
  <a href="https://github.com/1000ship/react-scroll-motion#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/1000ship/react-scroll-motion/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/1000ship/react-scroll-motion/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/1000ship/react-scroll-motion" />
  </a>
</p>


> Easy to make scroll animation with ReactJS

## Install

```sh
# Use npm
npm install react-scroll-motion

# Use yarn
yarn add react-scroll-motion
```

## Preview

| PC                                                           | Mobile                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| <img src="_readme/example-pc.gif" alt="Preview PC" width=434 height=320/> | <img src="_readme/example-mobile.gif" alt="Preview Mobile" width=148 height=320/> |

- [View on deployed example](https://1000ship.github.io/react-scroll-motion/)
  
  
## Import components/functions

### ReactJS

```jsx
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";
```

- React 18 and 19 are fully supported


### NextJS v12 or lower
```jsx
import dynamic from "next/dynamic";
const Animator = dynamic(
  import("react-scroll-motion").then((it) => it.Animator),
  { ssr: false }
);

import { ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";
```
- **Check this out especially if you use *NextJS***
- Please import `Animator` component with `next/dynamic` like upper code, when using NextJS

### NextJS v13 or higher
```jsx
"use client";

import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";
```
- Please add `"use client";` at the top of your file, when using NextJS v13 or higher.
- You don't need to use `next/dynamic` anymore
- Here's NextJS v14 example code (https://github.com/1000ship/nextjs-14-react-scroll-motion)

## Example Code
```jsx
const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
const FadeUp = batch(Fade(), Move(), Sticky());

<ScrollContainer>
  <ScrollPage>
    <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
      <span style={{ fontSize: "30px" }}>Let me show you scroll animation 😀</span>
    </Animator>
  </ScrollPage>
  <ScrollPage>
    <Animator animation={ZoomInScrollOut}>
      <span style={{ fontSize: "40px" }}>I'm FadeUpScrollOut ✨</span>
    </Animator>
  </ScrollPage>
  <ScrollPage>
    <Animator animation={FadeUp}>
      <span style={{ fontSize: "40px" }}>I'm FadeUp ⛅️</span>
    </Animator>
  </ScrollPage>
  <ScrollPage>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} >
      <span style={{ fontSize: "40px" }}>
        <Animator animation={MoveIn(-1000, 0)}>Hello Guys 👋🏻</Animator>
        <Animator animation={MoveIn(1000, 0)}>Nice to meet you 🙋🏻‍♀️</Animator>
        - I'm Dante Chun -
        <Animator animation={MoveOut(1000, 0)}>Good bye ✋🏻</Animator>
        <Animator animation={MoveOut(-1000, 0)}>See you 💛</Animator>
      </span>
    </div>
  </ScrollPage>
  <ScrollPage>
    <Animator animation={batch(Fade(), Sticky())}>
      <span style={{ fontSize: "40px" }}>Done</span>
      <br/>
      <span style={{ fontSize: "30px" }}>
        There's FadeAnimation, MoveAnimation, StickyAnimation, ZoomAnimation
      </span>
    </Animator>
  </ScrollPage>
</ScrollContainer>
```

## Make custom animation

Let's make spin animation 😉

<img src="_readme/custom-animation.webp" alt="Custom spinning animation" width="400" height="400" />


### Javascript
```jsx
const Spin = (cycle) =>
  ({
    in: {
      style: {
        // `p` is number (0~1)
        // When just before this page appear, `p` will be 0
        // When this page filled your screen, `p` will be 1
        transform: (p) => `rotate(${p * 360 * cycle}deg)`,
      },
    },
    out: {
      style: {
        // `p` is number (0~1)
        // When this page filled your screen, `p` will be 0
        // When just after this page disappear, `p` will be 1
        transform: (p) => `rotate(${p * 360 * cycle}deg)`,
      },
    },
  });
```


### Typescript
```tsx
import { Animation } from "react-scroll-motion";

const Spin = (cycle: number) =>
  ({
    in: {
      style: {
        // `p` is number (0~1)
        // When just before this page appear, `p` will be 0
        // When this page filled your screen, `p` will be 1
        transform: (p) => `rotate(${p * 360 * cycle}deg)`,
      },
    },
    out: {
      style: {
        // `p` is number (0~1)
        // When this page filled your screen, `p` will be 0
        // When just after this page disappear, `p` will be 1
        transform: (p) => `rotate(${p * 360 * cycle}deg)`,
      },
    },
  } as Animation);
```

```jsx
<ScrollContainer>
  <ScrollPage>
    // Your custom animation also can be batched!
    <Animator animation={batch(Sticky(), Fade(), Spin(3))}>
      <h1 style={{ fontSize: 50 }}>Hello!!!</h1>
    </Animator>
  </ScrollPage>
  <ScrollPage>
    ...
  </ScrollPage>
</ScrollContainer>
```

## Notes & References

- [Simple Docs](_readme/docs.md)
- [Update Notes](_readme/update.md)

## Author

👤 **Dante Chun**

* Website: https://dante.company
* Github: [@1000ship](https://github.com/1000ship)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/1000ship/react-scroll-motion/issues). 

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Dante Chun](https://github.com/1000ship).<br />
This project is [MIT](https://github.com/1000ship/react-scroll-motion/blob/master/LICENSE) licensed.
