import ml from "devegram-ml";
import translations from "./devegram-ml.js";
import langsConfig from "./languages-config.json";

export const initUILang  = function () {
    let ul = localStorage.getItem('ui_lang') || (function () {localStorage.setItem('ui_lang', 'en'); return 'en'})()
    ml.addLang(translations)
    ml.setLang('en')
    return {
        '$ml': ml,
        '$langConfig': {
            lang: ul,
            dir: langsConfig.languages[ul].dir,
            align: langsConfig.languages[ul].align,
            cssClass: 'text-' + langsConfig.languages[ul].align
        }
    }
}


