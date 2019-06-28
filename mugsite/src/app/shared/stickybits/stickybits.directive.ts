import { Directive, Input, Inject, PLATFORM_ID, SimpleChanges, ElementRef, AfterContentInit, OnChanges, OnDestroy } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import stickybits from "stickybits";

@Directive({
    selector: "[appStickyBits]"
})
export class StickyBitsDirective implements AfterContentInit, OnChanges, OnDestroy {

    private instance: any = null;
    private verticalPosition: string; // 'top' (default) | 'bottom'

    // options
    private stuckClass: string = 'is-stuck';
    private stickyClass: string = 'is-sticky';
    private changeClass: string = 'is-sticky-change';
    private parentClass: string = 'is-sticky-parent'

    // Add/remove classes from element according to it's sticky state
    // this is expensive for the browser - better if can be avoided and remain 'false'
    @Input() useStickyClasses: boolean = false;
    // desired offset from the top of the viewport to which the element will stick
    @Input() stickyOffset: number = 0;
    // Stick the element to the bottom instead of top
    @Input() stickToBottom: boolean = true;

    constructor(
        private element: ElementRef,
        @Inject(PLATFORM_ID) private platformId: string
    ) { }

    ngAfterContentInit() {
        this.init();
    }

    ngOnChanges(changes: SimpleChanges) {
        let change = changes.stickybits;
        if (isPlatformBrowser(this.platformId) && change && !change.isFirstChange) {
            if (change.currentValue) {
                this.init();
            } else {
                this.destroy();
            }
        }
    }

    ngOnDestroy() {
        this.destroy();
    }

    private init() {
        this.destroy();
        let element = this.element.nativeElement as HTMLElement;
        if (element) {
            this.instance = stickybits(element, {
                useStickyClasses: this.useStickyClasses,
                stickyBitStickyOffset: this.stickyOffset,
                verticalPosition: this.getVerticalPosition(),
                stuckClass: this.stuckClass,
                stickyClass: this.stickyClass,
                stickyChangeClass: this.changeClass,
                parentClass: this.parentClass
            });
        }
    }

    private destroy() {
        if (this.instance) {
            this.instance.cleanup();
            this.instance = null;
        }
    }

    private getVerticalPosition() {
        if (this.stickToBottom) {
            return 'bottom'
        } else {
            return 'top'
        }
    }
}
