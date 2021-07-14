import { animate, animation, keyframes, state, style, transition, trigger } from "@angular/animations";


export const fadeIn = animation([
  animate('{{duration}}s ease'),
  keyframes([
    style({
      opacity: 0
    }),
    style({
      opacity: 1
    })
  ])
])