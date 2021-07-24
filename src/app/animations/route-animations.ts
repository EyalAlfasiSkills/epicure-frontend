import { animate, animateChild, query, style, transition, trigger } from "@angular/animations";

export const fade =
    trigger('routeAnimations', [
        transition('* <=> *', [
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    opacity: 0,
                })
            ]),
            query(':enter', [
                animate('0.5s ease', style({
                    opacity: 1,
                }))
            ]),
            query('@*', [
                animateChild()
            ], { optional: true })
        ])
    ])