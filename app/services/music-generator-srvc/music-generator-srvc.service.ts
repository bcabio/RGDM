import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MusicGeneratorSrvc {
	private http: Http;

	constructor(http: Http) {
		this.http = http;
	}

	getMusic(musicFactor: number): Promise<Array<Track>> {
		let params = new URLSearchParams();
		params.append('bass', musicFactor.toString());

		let options = new RequestOptions({params: params});

		let thing: any;

		return this.http.get('/generateMusic', options)
			.toPromise()
			.then(response => {
				for(var x in response.json()) {
					console.log(x);
				}
				response.json() as Track});

		
	}
}

export interface Track {
	trackMidiString: string,
	soundFontUrl: string
}