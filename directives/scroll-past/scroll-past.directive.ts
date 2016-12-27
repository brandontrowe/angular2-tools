import { Directive, ElementRef, Input }     from "@angular/core";
import * as _                               from 'lodash';

@Directive({
    selector: '[scrollPast]',
    host: { '(window:scroll)': 'track($event)' }
})

export class ScrollPastDirective {
    @Input() scrollPastClass: string = 'off-screen';

    constructor(public el: ElementRef) {}

    debounce(func: () => void, wait: number = 0, immediate: boolean = false) {
        let timeout;
        return function() {
            let context = this, args = arguments;
            let later = () => {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    stick() {
        let classesArr = this.el.nativeElement.getAttribute('class').split(' ');
        if(!_.includes(classesArr, this.scrollPastClass)){
            classesArr.push(this.scrollPastClass)
        }
        this.el.nativeElement.setAttribute('class', classesArr.join(' '))
    }

    unstick() {
        let classesArr = this.el.nativeElement.getAttribute('class').split(' ');
        _.remove(classesArr, (n) => {
            return n == this.scrollPastClass;
        })
        this.el.nativeElement.setAttribute('class', classesArr.join(' '))
    }

    track($event) {
        let scroll = this.debounce(() => {
            if(this.el.nativeElement.offsetTop <= window.scrollY) {
                this.stick();
            } else {
                this.unstick();
            }
        }, 250);
        scroll();
    };
}
