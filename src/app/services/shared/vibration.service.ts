import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { GlobalObjectService } from './global-object.service';

@Injectable({
  providedIn: 'root',
})
export class VibrationService {
  windowRef: any;
  constructor(
    windowRef: GlobalObjectService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.windowRef = windowRef.getWindow();
  }

  vibrate(options = { duration: 100, interval: 100, count: 1 }) {
    if (arguments.length !== 1) {
      throw new Error('Expected exactly one argument.');
    }

    if (Object.prototype.toString.call(options) !== '[object Object]') {
      throw new TypeError('Expected first argument to be an object.');
    }

    if (
      typeof options.duration !== 'number' ||
      !Number.isInteger(options.duration)
    ) {
      throw new TypeError('Expected options.duration to be an integer.');
    }

    if (
      typeof options.interval !== 'number' ||
      !Number.isInteger(options.interval)
    ) {
      throw new TypeError('Expected options.interval to be an integer.');
    }

    if (typeof options.count !== 'number' || !Number.isInteger(options.count)) {
      throw new TypeError('Expected options.count to be an integer.');
    }

    if (options.duration < 0) {
      throw new RangeError(
        'Expected options.duration to be greater or equal to zero.'
      );
    }

    if (options.interval < 0) {
      throw new RangeError(
        'Expected options.interval to be greater or equal to zero.'
      );
    }

    if (options.count < 0) {
      throw new RangeError(
        'Expected options.count to be greater or equal to zero.'
      );
    }

    if (!this.windowRef) {
      return;
    }

    if (!this.windowRef.navigator) {
      return;
    }

    if (!this.windowRef.navigator.vibrate) {
      return;
    }

    const pattern = [];

    for (let index = 0; index < options.count; index++) {
      pattern.push(options.duration);
      pattern.push(options.interval);
    }

    if (
      (!this.windowRef.navigator.userAgent.match(/iPhone/i) &&
        isPlatformBrowser(this.platformId)) ||
      (!this.windowRef.navigator.userAgent.match(/iPod/i) &&
        isPlatformBrowser(this.platformId))
    ) {
      this.windowRef.navigator.vibrate(pattern);
    }
  }
}
