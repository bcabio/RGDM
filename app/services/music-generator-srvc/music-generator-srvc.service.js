"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
let MusicGeneratorSrvc = class MusicGeneratorSrvc {
    constructor(http) {
        this.http = http;
    }
    getMusic(musicFactor) {
        let params = new URLSearchParams();
        params.append('bass', musicFactor.toString());
        let options = new http_1.RequestOptions({ params: params });
        let thing;
        return this.http.get('/generateMusic', options)
            .toPromise()
            .then(response => {
            for (var x in response.json()) {
                console.log(x);
            }
            response.json();
        });
    }
};
MusicGeneratorSrvc = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MusicGeneratorSrvc);
exports.MusicGeneratorSrvc = MusicGeneratorSrvc;
//# sourceMappingURL=music-generator-srvc.service.js.map