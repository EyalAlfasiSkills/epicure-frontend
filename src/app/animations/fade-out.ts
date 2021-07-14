import { animate, animation, state, style, transition, trigger } from "@angular/animations";


export const fadeOut = animation([
  animate('{{duration}}s ease'),
   style({
    transform: 'translateY(-20px)',
    opacity: 0
  })
])