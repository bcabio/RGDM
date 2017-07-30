import { Injectable } from '@angular/core';

function getWindow(): any {
	return window;
}

@Injectable()
export class WindowRefSrvc {
	get nativeWindow(): any {
    return getWindow();
	}
}
