import {Injectable} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';

import {AppSettings} from '../_models/settings';
import {ProjectService} from "./project.service";

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    private appSettings = new AppSettings();

    constructor(private fuxaLanguage: TranslateService, private projectService: ProjectService) {
        projectService.onLoadHmi.subscribe((res) => {
            this.appSettings = projectService.getProject().settings || new AppSettings();
            if (this.appSettings.language) {
                this.useLanguage(this.appSettings.language);
            }
        })
    }

    init() {
        // this language will be used as a fallback when a translation isn't found in the current language
        this.fuxaLanguage.setDefaultLang('en');
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.fuxaLanguage.use('en');
        // to load saved settings
        this.useLanguage(this.appSettings.language);
    }

    getSettings() {
        return this.appSettings;
    }

    setSettings(settings, nosave:boolean) {
        this.appSettings = settings;
        this.projectService.setSettings(this.appSettings, nosave);
        this.fuxaLanguage.use(this.appSettings.language);
    }

    useLanguage(language) {
        this.fuxaLanguage.use(language);
    }
}
