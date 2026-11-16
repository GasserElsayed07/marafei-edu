(function(){
let translateObjs = {};
const trans = (...a) => {
    return translateObjs[a[0x0]] = a, '';
};
function regTextVar(a, b) {
    var c = ![];
    return d(b);
    function d(k, l) {
        switch (k['toLowerCase']()) {
        case 'title':
        case 'subtitle':
        case 'photo.title':
        case 'photo.description':
            var m = (function () {
                switch (k['toLowerCase']()) {
                case 'title':
                case 'photo.title':
                    return 'media.label';
                case 'subtitle':
                    return 'media.data.subtitle';
                case 'photo.description':
                    return 'media.data.description';
                }
            }());
            if (m)
                return function () {
                    var r, s, t = (l && l['viewerName'] ? this['getComponentByName'](l['viewerName']) : undefined) || this['getMainViewer']();
                    if (k['toLowerCase']()['startsWith']('photo'))
                        r = this['getByClassName']('PhotoAlbumPlayListItem')['filter'](function (v) {
                            var w = v['get']('player');
                            return w && w['get']('viewerArea') == t;
                        })['map'](function (v) {
                            return v['get']('media')['get']('playList');
                        });
                    else
                        r = this['_getPlayListsWithViewer'](t), s = j['bind'](this, t);
                    if (!c) {
                        for (var u = 0x0; u < r['length']; ++u) {
                            r[u]['bind']('changing', f, this);
                        }
                        c = !![];
                    }
                    return i['call'](this, r, m, s);
                };
            break;
        case 'tour.name':
        case 'tour.description':
            return function () {
                return this['get']('data')['tour']['locManager']['trans'](k);
            };
        default:
            if (k['toLowerCase']()['startsWith']('viewer.')) {
                var n = k['split']('.'), o = n[0x1];
                if (o) {
                    var p = n['slice'](0x2)['join']('.');
                    return d(p, { 'viewerName': o });
                }
            } else {
                if (k['toLowerCase']()['startsWith']('quiz.') && 'Quiz' in TDV) {
                    var q = undefined, m = (function () {
                            switch (k['toLowerCase']()) {
                            case 'quiz.questions.answered':
                                return TDV['Quiz']['PROPERTY']['QUESTIONS_ANSWERED'];
                            case 'quiz.question.count':
                                return TDV['Quiz']['PROPERTY']['QUESTION_COUNT'];
                            case 'quiz.items.found':
                                return TDV['Quiz']['PROPERTY']['ITEMS_FOUND'];
                            case 'quiz.item.count':
                                return TDV['Quiz']['PROPERTY']['ITEM_COUNT'];
                            case 'quiz.score':
                                return TDV['Quiz']['PROPERTY']['SCORE'];
                            case 'quiz.score.total':
                                return TDV['Quiz']['PROPERTY']['TOTAL_SCORE'];
                            case 'quiz.time.remaining':
                                return TDV['Quiz']['PROPERTY']['REMAINING_TIME'];
                            case 'quiz.time.elapsed':
                                return TDV['Quiz']['PROPERTY']['ELAPSED_TIME'];
                            case 'quiz.time.limit':
                                return TDV['Quiz']['PROPERTY']['TIME_LIMIT'];
                            case 'quiz.media.items.found':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_ITEMS_FOUND'];
                            case 'quiz.media.item.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_ITEM_COUNT'];
                            case 'quiz.media.questions.answered':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_QUESTIONS_ANSWERED'];
                            case 'quiz.media.question.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_QUESTION_COUNT'];
                            case 'quiz.media.score':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_SCORE'];
                            case 'quiz.media.score.total':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_TOTAL_SCORE'];
                            case 'quiz.media.index':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'];
                            case 'quiz.media.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_COUNT'];
                            case 'quiz.media.visited':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_VISITED_COUNT'];
                            default:
                                var s = /quiz\.([\w_]+)\.(.+)/['exec'](k);
                                if (s) {
                                    q = s[0x1];
                                    switch ('quiz.' + s[0x2]) {
                                    case 'quiz.score':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['SCORE'];
                                    case 'quiz.score.total':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['TOTAL_SCORE'];
                                    case 'quiz.media.items.found':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEMS_FOUND'];
                                    case 'quiz.media.item.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEM_COUNT'];
                                    case 'quiz.media.questions.answered':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_QUESTIONS_ANSWERED'];
                                    case 'quiz.media.question.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_QUESTION_COUNT'];
                                    case 'quiz.questions.answered':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTIONS_ANSWERED'];
                                    case 'quiz.question.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTION_COUNT'];
                                    case 'quiz.items.found':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEMS_FOUND'];
                                    case 'quiz.item.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEM_COUNT'];
                                    case 'quiz.media.score':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_SCORE'];
                                    case 'quiz.media.score.total':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_TOTAL_SCORE'];
                                    }
                                }
                            }
                        }());
                    if (m)
                        return function () {
                            var r = this['get']('data')['quiz'];
                            if (r) {
                                if (!c) {
                                    if (q != undefined) {
                                        if (q == 'global') {
                                            var s = this['get']('data')['quizConfig'], t = s['objectives'];
                                            for (var u = 0x0, v = t['length']; u < v; ++u) {
                                                r['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], h['call'](this, t[u]['id'], m), this);
                                            }
                                        } else
                                            r['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], h['call'](this, q, m), this);
                                    } else
                                        r['bind'](TDV['Quiz']['EVENT_PROPERTIES_CHANGE'], g['call'](this, m), this);
                                    c = !![];
                                }
                                try {
                                    var w = 0x0;
                                    if (q != undefined) {
                                        if (q == 'global') {
                                            var s = this['get']('data')['quizConfig'], t = s['objectives'];
                                            for (var u = 0x0, v = t['length']; u < v; ++u) {
                                                w += r['getObjective'](t[u]['id'], m);
                                            }
                                        } else
                                            w = r['getObjective'](q, m);
                                    } else {
                                        w = r['get'](m);
                                        if (m == TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'])
                                            w += 0x1;
                                    }
                                    return w;
                                } catch (x) {
                                    return undefined;
                                }
                            }
                        };
                }
            }
            break;
        }
        return function () {
            return '';
        };
    }
    function e() {
        var k = this['get']('data');
        k['updateText'](k['translateObjs'][a], a['split']('.')[0x0]);
        let l = a['split']('.'), m = l[0x0] + '_vr';
        m in this && k['updateText'](k['translateObjs'][a], m);
    }
    function f(k) {
        var l = k['data']['nextSelectedIndex'];
        if (l >= 0x0) {
            var m = k['source']['get']('items')[l], n = function () {
                    m['unbind']('begin', n, this), e['call'](this);
                };
            m['bind']('begin', n, this);
        }
    }
    function g(k) {
        return function (l) {
            k in l && e['call'](this);
        }['bind'](this);
    }
    function h(k, l) {
        return function (m, n) {
            k == m && l in n && e['call'](this);
        }['bind'](this);
    }
    function i(k, l, m) {
        for (var n = 0x0; n < k['length']; ++n) {
            var o = k[n], p = o['get']('selectedIndex');
            if (p >= 0x0) {
                var q = l['split']('.'), r = o['get']('items')[p];
                if (m !== undefined && !m['call'](this, r))
                    continue;
                for (var s = 0x0; s < q['length']; ++s) {
                    if (r == undefined)
                        return '';
                    r = 'get' in r ? r['get'](q[s]) : r[q[s]];
                }
                return r;
            }
        }
        return '';
    }
    function j(k, l) {
        var m = l['get']('player');
        return m !== undefined && m['get']('viewerArea') == k;
    }
}
var script = {"children":["this.MainViewer_mobile","this.Container_C2E69C66_E9CB_2BD1_41EC_50DCA97A0974"],"width":"100%","backgroundColorRatios":[0],"start":"this.init(); this.initAnalytics(); this.syncPlaylists([this.PlayList_9CD0AF98_BBDB_38AE_41AD_DC46B8F10F18,this.mainPlayList])","id":"rootPlayer","data":{"displayTooltipInTouchScreens":true,"history":{},"textToSpeechConfig":{"stopBackgroundAudio":false,"volume":1,"pitch":1,"speechOnInfoWindow":false,"speechOnQuizQuestion":false,"rate":1,"speechOnTooltip":false},"defaultLocale":"en","locales":{"ar":"locale/ar.txt","en":"locale/en.txt"},"name":"Player736"},"backgroundColor":["#DFF5FD"],"scrollBarColor":"#000000","mute":true,"mouseWheelEnabled":false,"layout":"absolute","class":"Player","watermark":false,"defaultMenu":["fullscreen","mute","rotation"],"minHeight":0,"minWidth":0,"hash": "2b55911bd3248a54ab3a3f5a7efbe7d352100899eb095d092d1c81448b2a2422", "definitions": [{"width":"100%","scaleMode":"fit_outside","horizontalAlign":"center","backgroundOpacity":0,"id":"Image_C4BFF2EC_E9C9_1CD2_41DA_94655CB2D73B","left":"0%","data":{"name":"Image"},"url":trans('Image_C4BFF2EC_E9C9_1CD2_41DA_94655CB2D73B.url'),"class":"Image","verticalAlign":"middle","minHeight":1,"minWidth":1,"top":"0%","height":"100%","propagateClick":false},{"children":["this.Image_C4BFF2EC_E9C9_1CD2_41DA_94655CB2D73B"],"overflow":"scroll","width":"100%","backgroundOpacity":0,"id":"Container_C2E69C66_E9CB_2BD1_41EC_50DCA97A0974","scrollBarColor":"#000000","data":{"name":"Container"},"right":"0%","layout":"absolute","class":"Container","minHeight":20,"minWidth":20,"top":"0%","gap":10,"scrollBarMargin":2,"height":"100%","propagateClick":false},{"toolTipFontColor":"#606060","playbackBarHeadBorderSize":0,"subtitlesFontColor":"#FFFFFF","toolTipFontFamily":"Arial","subtitlesTextShadowHorizontalLength":1,"progressBarBackgroundColor":["#3399FF"],"progressBackgroundColor":["#000000"],"width":"100%","playbackBarHeadBackgroundColor":["#111111","#666666"],"playbackBarBottom":5,"left":0,"progressBorderColor":"#000000","subtitlesBottom":50,"progressBottom":10,"subtitlesTop":0,"progressHeight":2,"playbackBarBackgroundColor":["#FFFFFF"],"subtitlesTextShadowColor":"#000000","progressBarBorderRadius":2,"progressBorderSize":0,"playbackBarProgressBorderSize":0,"playbackBarHeight":10,"progressBarBorderSize":0,"playbackBarBackgroundColorDirection":"vertical","subtitlesFontSize":"3vmin","vrThumbstickRotationStep":20,"playbackBarHeadWidth":6,"surfaceReticleColor":"#FFFFFF","playbackBarProgressBorderRadius":0,"height":"100%","playbackBarRight":0,"progressBorderRadius":2,"playbackBarProgressBackgroundColor":["#3399FF"],"toolTipPaddingLeft":3,"toolTipBackgroundColor":"#F6F6F6","subtitlesBackgroundOpacity":0.2,"progressLeft":"33%","subtitlesBorderColor":"#FFFFFF","playbackBarHeadShadowOpacity":0.7,"playbackBarProgressBackgroundColorRatios":[0],"surfaceReticleSelectionColor":"#FFFFFF","playbackBarBorderColor":"#FFFFFF","subtitlesFontFamily":"Arial","playbackBarBorderRadius":0,"propagateClick":false,"playbackBarProgressBorderColor":"#000000","data":{"name":"Main Viewer"},"toolTipShadowColor":"#333138","firstTransitionDuration":0,"playbackBarHeadBorderRadius":0,"id":"MainViewer_mobile","transitionMode":"fade_out_fade_in","subtitlesGap":0,"playbackBarHeadBorderColor":"#000000","playbackBarBorderSize":0,"playbackBarHeadShadowHorizontalLength":0,"vrPointerColor":"#FFFFFF","vrPointerSelectionColor":"#FF6600","subtitlesBackgroundColor":"#000000","toolTipFontSize":"1.11vmin","toolTipShadowBlurRadius":1,"vrPointerSelectionTime":2000,"playbackBarHeadShadowVerticalLength":0,"toolTipBorderColor":"#767676","playbackBarHeadShadowBlurRadius":1.5,"class":"ViewerArea","subtitlesTextShadowVerticalLength":1,"playbackBarBackgroundOpacity":1,"progressBackgroundColorRatios":[0],"minHeight":25,"progressRight":"33%","top":0,"playbackBarLeft":0,"progressOpacity":0.7,"minWidth":50,"progressBarBackgroundColorDirection":"horizontal","subtitlesTextShadowOpacity":1,"playbackBarHeadShadowColor":"#000000","playbackBarHeadBackgroundColorRatios":[0,1],"progressBarBackgroundColorRatios":[0],"playbackBarHeadShadow":true,"progressBarBorderColor":"#000000","toolTipPaddingRight":3,"toolTipBorderRadius":1,"playbackBarHeadHeight":15,"toolTipTextShadowBlurRadius":1,"toolTipTextShadowColor":"#000000"},{"class":"MediaAudio","data":{"label":"buzzer-or-wrong-answer-20582"},"autoplay":true,"audio":"this.audiores_532A359C_464E_7035_41BF_E3C61A957300","id":"audio_53CD5747_464D_F013_41BB_EB648D9B3CD4"},{"class":"PanoramaCamera","initialPosition":{"class":"PanoramaCameraPosition","pitch":0,"yaw":0},"enterPointingToHorizon":true,"id":"panorama_FCFCA21F_BBCB_A650_41D6_A5B17069F3A9_camera","initialSequence":"this.sequence_8145B381_BBCB_A631_41D0_A04BC62E546B"},{"class":"MediaAudio","data":{"label":"mixkit-correct-answer-tone-2870"},"autoplay":true,"audio":"this.audiores_5329E517_464E_7032_41C5_DF749276C949","id":"audio_52770D0B_4632_9013_41C8_9E4A618E903D"},{"class":"Panorama","thumbnailUrl":"media/panorama_FCFCA21F_BBCB_A650_41D6_A5B17069F3A9_t.jpg","data":{"label":"pano"},"vfov":180,"frames":[{"class":"CubicPanoramaFrame","thumbnailUrl":"media/panorama_FCFCA21F_BBCB_A650_41D6_A5B17069F3A9_t.jpg","cube":{"class":"ImageResource","levels":[{"class":"TiledImageResourceLevel","colCount":90,"url":"media/panorama_FCFCA21F_BBCB_A650_41D6_A5B17069F3A9_0/{face}/0/{row}_{column}.jpg","rowCount":15,"tags":"ondemand","height":7680,"width":46080},{"class":"TiledImageResourceLevel","colCount":48,"url":"media/panorama_FCFCA21F_BBCB_A650_41D6_A5B17069F3A9_0/{face}/1/{row}_{column}.jpg","rowCount":8,"tags":"ondemand","height":4096,"width":24576},{"class":"TiledImageResourceLevel","colCount":24,"url":"media/panorama_FCFCA21F_BBCB_A650_41D6_A5B17069F3A9_0/{face}/2/{row}_{column}.jpg","rowCount":4,"tags":"ondemand","height":2048,"width":12288},{"class":"TiledImageResourceLevel","colCount":12,"url":"media/panorama_FCFCA21F_BBCB_A650_41D6_A5B17069F3A9_0/{face}/3/{row}_{column}.jpg","rowCount":2,"tags":"ondemand","height":1024,"width":6144}]}}],"hfov":360,"label":trans('panorama_FCFCA21F_BBCB_A650_41D6_A5B17069F3A9.label'),"id":"panorama_FCFCA21F_BBCB_A650_41D6_A5B17069F3A9","hfovMax":130},{"class":"MediaAudio","data":{"label":"6-Happy-Commercial-Piano(chosic.com)"},"autoplay":true,"loop":true,"audio":"this.audiores_BF9155BE_AAC1_785D_41DE_344C9685A74B","id":"audio_B2E03B90_AAC0_C824_41CC_D9225C4903EF"},{"class":"PlayList","id":"PlayList_9CD0AF98_BBDB_38AE_41AD_DC46B8F10F18","items":[{"class":"PanoramaPlayListItem","media":"this.panorama_FCFCA21F_BBCB_A650_41D6_A5B17069F3A9"}]},{"class":"PanoramaPlayer","arrowKeysAction":"translate","aaEnabled":true,"mouseControlMode":"drag_rotation","displayPlaybackBar":true,"viewerArea":"this.MainViewer_mobile","id":"MainViewer_mobilePanoramaPlayer","touchControlMode":"drag_rotation","keepModel3DLoadedWithoutLocation":true},{"class":"PlayList","id":"mainPlayList","items":[{"class":"PanoramaPlayListItem","camera":"this.panorama_FCFCA21F_BBCB_A650_41D6_A5B17069F3A9_camera","media":"this.panorama_FCFCA21F_BBCB_A650_41D6_A5B17069F3A9","end":"this.trigger('tourEnded')","player":"this.MainViewer_mobilePanoramaPlayer"}]},{"class":"AudioResource","id":"audiores_532A359C_464E_7035_41BF_E3C61A957300","mp3Url":trans('audiores_532A359C_464E_7035_41BF_E3C61A957300.mp3Url')},{"class":"PanoramaCameraSequence","id":"sequence_8145B381_BBCB_A631_41D0_A04BC62E546B","movements":[{"class":"DistancePanoramaCameraMovement","yawSpeed":7.96,"yawDelta":18.5,"easing":"cubic_in"},{"class":"DistancePanoramaCameraMovement","yawSpeed":7.96,"yawDelta":323},{"class":"DistancePanoramaCameraMovement","yawSpeed":7.96,"yawDelta":18.5,"easing":"cubic_out"}]},{"class":"AudioResource","id":"audiores_5329E517_464E_7032_41C5_DF749276C949","mp3Url":trans('audiores_5329E517_464E_7032_41C5_DF749276C949.mp3Url')},{"class":"AudioResource","id":"audiores_BF9155BE_AAC1_785D_41DE_344C9685A74B","gain":0.47,"mp3Url":trans('audiores_BF9155BE_AAC1_785D_41DE_344C9685A74B.mp3Url')}],"gap":10,"scripts":{"textToSpeechComponent":TDV.Tour.Script.textToSpeechComponent,"loadFromCurrentMediaPlayList":TDV.Tour.Script.loadFromCurrentMediaPlayList,"resumeGlobalAudios":TDV.Tour.Script.resumeGlobalAudios,"executeAudioActionByTags":TDV.Tour.Script.executeAudioActionByTags,"setObjectsVisibilityByID":TDV.Tour.Script.setObjectsVisibilityByID,"showPopupPanoramaVideoOverlay":TDV.Tour.Script.showPopupPanoramaVideoOverlay,"stopGlobalAudio":TDV.Tour.Script.stopGlobalAudio,"changeBackgroundWhilePlay":TDV.Tour.Script.changeBackgroundWhilePlay,"stopGlobalAudios":TDV.Tour.Script.stopGlobalAudios,"getFirstPlayListWithMedia":TDV.Tour.Script.getFirstPlayListWithMedia,"initAnalytics":TDV.Tour.Script.initAnalytics,"takeScreenshot":TDV.Tour.Script.takeScreenshot,"getCurrentPlayerWithMedia":TDV.Tour.Script.getCurrentPlayerWithMedia,"executeJS":TDV.Tour.Script.executeJS,"toggleTextToSpeechComponent":TDV.Tour.Script.toggleTextToSpeechComponent,"showWindow":TDV.Tour.Script.showWindow,"setOverlayBehaviour":TDV.Tour.Script.setOverlayBehaviour,"showPopupImage":TDV.Tour.Script.showPopupImage,"setOverlaysVisibility":TDV.Tour.Script.setOverlaysVisibility,"autotriggerAtStart":TDV.Tour.Script.autotriggerAtStart,"clone":TDV.Tour.Script.clone,"assignObjRecursively":TDV.Tour.Script.assignObjRecursively,"initOverlayGroupRotationOnClick":TDV.Tour.Script.initOverlayGroupRotationOnClick,"textToSpeech":TDV.Tour.Script.textToSpeech,"changeOpacityWhilePlay":TDV.Tour.Script.changeOpacityWhilePlay,"executeFunctionWhenChange":TDV.Tour.Script.executeFunctionWhenChange,"fixTogglePlayPauseButton":TDV.Tour.Script.fixTogglePlayPauseButton,"getCurrentPlayers":TDV.Tour.Script.getCurrentPlayers,"showWindowBase":TDV.Tour.Script.showWindowBase,"getOverlays":TDV.Tour.Script.getOverlays,"_getObjectsByTags":TDV.Tour.Script._getObjectsByTags,"getPlayListItems":TDV.Tour.Script.getPlayListItems,"getPixels":TDV.Tour.Script.getPixels,"stopTextToSpeech":TDV.Tour.Script.stopTextToSpeech,"quizShowScore":TDV.Tour.Script.quizShowScore,"changePlayListWithSameSpot":TDV.Tour.Script.changePlayListWithSameSpot,"getOverlaysByTags":TDV.Tour.Script.getOverlaysByTags,"mixObject":TDV.Tour.Script.mixObject,"sendAnalyticsData":TDV.Tour.Script.sendAnalyticsData,"setOverlaysVisibilityByTags":TDV.Tour.Script.setOverlaysVisibilityByTags,"setValue":TDV.Tour.Script.setValue,"triggerOverlay":TDV.Tour.Script.triggerOverlay,"setCameraSameSpotAsMedia":TDV.Tour.Script.setCameraSameSpotAsMedia,"initQuiz":TDV.Tour.Script.initQuiz,"getPlayListsWithMedia":TDV.Tour.Script.getPlayListsWithMedia,"quizSetItemFound":TDV.Tour.Script.quizSetItemFound,"setPanoramaCameraWithCurrentSpot":TDV.Tour.Script.setPanoramaCameraWithCurrentSpot,"unloadViewer":TDV.Tour.Script.unloadViewer,"startPanoramaWithCamera":TDV.Tour.Script.startPanoramaWithCamera,"openLink":TDV.Tour.Script.openLink,"getActiveMediaWithViewer":TDV.Tour.Script.getActiveMediaWithViewer,"_initSplitViewer":TDV.Tour.Script._initSplitViewer,"startModel3DWithCameraSpot":TDV.Tour.Script.startModel3DWithCameraSpot,"getKey":TDV.Tour.Script.getKey,"getPlayListItemByMedia":TDV.Tour.Script.getPlayListItemByMedia,"updateIndexGlobalZoomImage":TDV.Tour.Script.updateIndexGlobalZoomImage,"startPanoramaWithModel":TDV.Tour.Script.startPanoramaWithModel,"updateDeepLink":TDV.Tour.Script.updateDeepLink,"getPlayListItemIndexByMedia":TDV.Tour.Script.getPlayListItemIndexByMedia,"getGlobalAudio":TDV.Tour.Script.getGlobalAudio,"openEmbeddedPDF":TDV.Tour.Script.openEmbeddedPDF,"setObjectsVisibilityByTags":TDV.Tour.Script.setObjectsVisibilityByTags,"setPanoramaCameraWithSpot":TDV.Tour.Script.setPanoramaCameraWithSpot,"pauseCurrentPlayers":TDV.Tour.Script.pauseCurrentPlayers,"getActivePlayerWithViewer":TDV.Tour.Script.getActivePlayerWithViewer,"init":TDV.Tour.Script.init,"cloneBindings":TDV.Tour.Script.cloneBindings,"restartTourWithoutInteraction":TDV.Tour.Script.restartTourWithoutInteraction,"quizShowQuestion":TDV.Tour.Script.quizShowQuestion,"setComponentsVisibilityByTags":TDV.Tour.Script.setComponentsVisibilityByTags,"clonePanoramaCamera":TDV.Tour.Script.clonePanoramaCamera,"_initTwinsViewer":TDV.Tour.Script._initTwinsViewer,"setPlayListSelectedIndex":TDV.Tour.Script.setPlayListSelectedIndex,"getActivePlayersWithViewer":TDV.Tour.Script.getActivePlayersWithViewer,"copyObjRecursively":TDV.Tour.Script.copyObjRecursively,"setComponentVisibility":TDV.Tour.Script.setComponentVisibility,"stopMeasurement":TDV.Tour.Script.stopMeasurement,"setSurfaceSelectionHotspotMode":TDV.Tour.Script.setSurfaceSelectionHotspotMode,"getQuizTotalObjectiveProperty":TDV.Tour.Script.getQuizTotalObjectiveProperty,"getOverlaysByGroupname":TDV.Tour.Script.getOverlaysByGroupname,"pauseGlobalAudiosWhilePlayItem":TDV.Tour.Script.pauseGlobalAudiosWhilePlayItem,"pauseGlobalAudio":TDV.Tour.Script.pauseGlobalAudio,"visibleComponentsIfPlayerFlagEnabled":TDV.Tour.Script.visibleComponentsIfPlayerFlagEnabled,"quizShowTimeout":TDV.Tour.Script.quizShowTimeout,"getComponentsByTags":TDV.Tour.Script.getComponentsByTags,"getMediaByName":TDV.Tour.Script.getMediaByName,"getRootOverlay":TDV.Tour.Script.getRootOverlay,"updateMediaLabelFromPlayList":TDV.Tour.Script.updateMediaLabelFromPlayList,"setEndToItemIndex":TDV.Tour.Script.setEndToItemIndex,"quizPauseTimer":TDV.Tour.Script.quizPauseTimer,"getMediaFromPlayer":TDV.Tour.Script.getMediaFromPlayer,"getStateTextToSpeech":TDV.Tour.Script.getStateTextToSpeech,"quizStart":TDV.Tour.Script.quizStart,"getAudioByTags":TDV.Tour.Script.getAudioByTags,"copyToClipboard":TDV.Tour.Script.copyToClipboard,"toggleMeasurement":TDV.Tour.Script.toggleMeasurement,"updateVideoCues":TDV.Tour.Script.updateVideoCues,"cleanSelectedMeasurements":TDV.Tour.Script.cleanSelectedMeasurements,"cleanAllMeasurements":TDV.Tour.Script.cleanAllMeasurements,"startMeasurement":TDV.Tour.Script.startMeasurement,"isCardboardViewMode":TDV.Tour.Script.isCardboardViewMode,"historyGoBack":TDV.Tour.Script.historyGoBack,"getPanoramaOverlayByName":TDV.Tour.Script.getPanoramaOverlayByName,"getMediaWidth":TDV.Tour.Script.getMediaWidth,"setStartTimeVideo":TDV.Tour.Script.setStartTimeVideo,"pauseGlobalAudios":TDV.Tour.Script.pauseGlobalAudios,"getPanoramaOverlaysByTags":TDV.Tour.Script.getPanoramaOverlaysByTags,"setMainMediaByIndex":TDV.Tour.Script.setMainMediaByIndex,"setDirectionalPanoramaAudio":TDV.Tour.Script.setDirectionalPanoramaAudio,"enableVR":TDV.Tour.Script.enableVR,"setStartTimeVideoSync":TDV.Tour.Script.setStartTimeVideoSync,"getMediaHeight":TDV.Tour.Script.getMediaHeight,"getMediaByTags":TDV.Tour.Script.getMediaByTags,"setMeasurementsVisibility":TDV.Tour.Script.setMeasurementsVisibility,"historyGoForward":TDV.Tour.Script.historyGoForward,"createTween":TDV.Tour.Script.createTween,"disableVR":TDV.Tour.Script.disableVR,"setMediaBehaviour":TDV.Tour.Script.setMediaBehaviour,"createTweenModel3D":TDV.Tour.Script.createTweenModel3D,"setMainMediaByName":TDV.Tour.Script.setMainMediaByName,"quizResumeTimer":TDV.Tour.Script.quizResumeTimer,"shareSocial":TDV.Tour.Script.shareSocial,"quizFinish":TDV.Tour.Script.quizFinish,"isPanorama":TDV.Tour.Script.isPanorama,"playAudioList":TDV.Tour.Script.playAudioList,"downloadFile":TDV.Tour.Script.downloadFile,"toggleMeasurementsVisibility":TDV.Tour.Script.toggleMeasurementsVisibility,"toggleVR":TDV.Tour.Script.toggleVR,"playGlobalAudioWhilePlayActiveMedia":TDV.Tour.Script.playGlobalAudioWhilePlayActiveMedia,"keepCompVisible":TDV.Tour.Script.keepCompVisible,"setMapLocation":TDV.Tour.Script.setMapLocation,"playGlobalAudioWhilePlay":TDV.Tour.Script.playGlobalAudioWhilePlay,"_initItemWithComps":TDV.Tour.Script._initItemWithComps,"setModel3DCameraSpot":TDV.Tour.Script.setModel3DCameraSpot,"stopAndGoCamera":TDV.Tour.Script.stopAndGoCamera,"isComponentVisible":TDV.Tour.Script.isComponentVisible,"setMeasurementUnits":TDV.Tour.Script.setMeasurementUnits,"skip3DTransitionOnce":TDV.Tour.Script.skip3DTransitionOnce,"showComponentsWhileMouseOver":TDV.Tour.Script.showComponentsWhileMouseOver,"getComponentByName":TDV.Tour.Script.getComponentByName,"htmlToPlainText":TDV.Tour.Script.htmlToPlainText,"registerKey":TDV.Tour.Script.registerKey,"setModel3DCameraWithCurrentSpot":TDV.Tour.Script.setModel3DCameraWithCurrentSpot,"_getPlayListsWithViewer":TDV.Tour.Script._getPlayListsWithViewer,"unregisterKey":TDV.Tour.Script.unregisterKey,"getMainViewer":TDV.Tour.Script.getMainViewer,"resumePlayers":TDV.Tour.Script.resumePlayers,"showPopupMedia":TDV.Tour.Script.showPopupMedia,"_initTTSTooltips":TDV.Tour.Script._initTTSTooltips,"playGlobalAudio":TDV.Tour.Script.playGlobalAudio,"setModel3DCameraSequence":TDV.Tour.Script.setModel3DCameraSequence,"translate":TDV.Tour.Script.translate,"existsKey":TDV.Tour.Script.existsKey,"setLocale":TDV.Tour.Script.setLocale,"syncPlaylists":TDV.Tour.Script.syncPlaylists,"getModel3DInnerObject":TDV.Tour.Script.getModel3DInnerObject,"setObjectsVisibility":TDV.Tour.Script.setObjectsVisibility,"showPopupPanoramaOverlay":TDV.Tour.Script.showPopupPanoramaOverlay,"getPlayListWithItem":TDV.Tour.Script.getPlayListWithItem,"executeAudioAction":TDV.Tour.Script.executeAudioAction},"init":"this.initQuiz(this.PlayList_9CD0AF98_BBDB_38AE_41AD_DC46B8F10F18, true, true); var quiz = this.get('data')['quiz']; quiz.bind('timeout', (function() { var functionCallee = function(){ this.quizShowTimeout({repeat: {visible: true}, score: {visible: true}}) }.bind(this); return functionCallee }.bind(this))()); quiz.bind('finish', (function() { var functionCallee = function(){ this.quizShowScore({canClose: true}) }.bind(this); return functionCallee }.bind(this))())","scrollBarMargin":2,"height":"100%","propagateClick":false};
if (script['data'] == undefined)
    script['data'] = {};
script['data']['translateObjs'] = translateObjs, script['data']['createQuizConfig'] = function () {
    let a = {"autoFinish":true,"score":{"canClose":true,"submitToLMS":{"visible":false,"label":trans('quizScore_54E7E54F_463E_9013_41C9_DBBE5D0A1BC6.submitToLMS','quizScore_54E7E54F_463E_9013_41C9_DBBE5D0A1BC6.submitToLMS.label')},"completion":{"visible":true,"label":trans('quizScore_54E7E54F_463E_9013_41C9_DBBE5D0A1BC6.completion','quizScore_54E7E54F_463E_9013_41C9_DBBE5D0A1BC6.completion.label')},"items":{"visible":true,"label":trans('quizScore_54E7E54F_463E_9013_41C9_DBBE5D0A1BC6.items','quizScore_54E7E54F_463E_9013_41C9_DBBE5D0A1BC6.items.label')},"questions":{"visible":true,"correctLabel":trans('quizScore_54E7E54F_463E_9013_41C9_DBBE5D0A1BC6.questionsCorrect','quizScore_54E7E54F_463E_9013_41C9_DBBE5D0A1BC6.questions.correctLabel'),"incorrectLabel":trans('quizScore_54E7E54F_463E_9013_41C9_DBBE5D0A1BC6.questionsIncorrect','quizScore_54E7E54F_463E_9013_41C9_DBBE5D0A1BC6.questions.incorrectLabel'),"label":trans('quizScore_54E7E54F_463E_9013_41C9_DBBE5D0A1BC6.questions','quizScore_54E7E54F_463E_9013_41C9_DBBE5D0A1BC6.questions.label')},"title":trans('quizScore_54E7E54F_463E_9013_41C9_DBBE5D0A1BC6.title'),"id":"quizScore_54E7E54F_463E_9013_41C9_DBBE5D0A1BC6","elapsedTime":{"visible":true,"label":trans('quizScore_54E7E54F_463E_9013_41C9_DBBE5D0A1BC6.elapsedTime','quizScore_54E7E54F_463E_9013_41C9_DBBE5D0A1BC6.elapsedTime.label')},"repeat":{"visible":false,"label":trans('quizScore_54E7E54F_463E_9013_41C9_DBBE5D0A1BC6.repeat','quizScore_54E7E54F_463E_9013_41C9_DBBE5D0A1BC6.repeat.label')},"downloadCSV":{"visible":false,"label":trans('quizScore_54E7E54F_463E_9013_41C9_DBBE5D0A1BC6.downloadCSV','quizScore_54E7E54F_463E_9013_41C9_DBBE5D0A1BC6.downloadCSV.label')}},"theme":{"score":{"window":{"backgroundColor":"#FEF9E1","closeButton":{"backgroundOpacity":1,"backgroundColor":"#4C71D7"},"backgroundOpacity":1,"stats":{"borderOpacity":1,"mainValue":{"fontFamily":"Noto Sans"},"label":{"fontFamily":"Noto Sans"},"secondaryValue":{"fontFamily":"Noto Sans"},"borderColor":"#4C71D7","title":{"fontFamily":"Noto Sans"}},"description":{"fontFamily":"Noto Sans"},"buttonsContainer":{"button":{"backgroundColor":"#4C71D7","fontFamily":"Noto Sans","backgroundOpacity":1}},"title":{"fontStyle":"normal","fontFamily":"Noto Sans"},"calification":{"fontFamily":"Noto Sans"}},"veil":{"backgroundOpacity":0.3,"backgroundColor":"#333333"}},"timeout":{"window":{"backgroundColor":"#FEF9E1","button":{"backgroundColor":"#4C71D7","fontFamily":"Noto Sans","backgroundOpacity":1},"backgroundOpacity":1,"title":{"fontStyle":"normal","fontFamily":"Noto Sans"}},"veil":{"backgroundOpacity":0.3,"backgroundColor":"#333333"}},"question":{"window":{"title":{"fontStyle":"normal","fontFamily":"Noto Sans"},"height":"60%","closeButton":{"backgroundOpacity":1,"backgroundColor":"#4C71D7"},"option":{"text":{"fontFamily":"Noto Sans","selected":{"fontFamily":"Noto Sans"}},"label":{"incorrect":{"fontFamily":"Noto Sans"},"fontFamily":"Noto Sans","correct":{"fontFamily":"Noto Sans"}}},"backgroundOpacity":1,"optionsContainer":{"width":"100%"},"backgroundColor":"#FEF9E1","width":"50%","buttonsContainer":{"button":{"fontFamily":"Noto Sans"}},"mediaContainer":{"height":"0%","panoramaPlayer":{"mouseControlMode":"drag_rotation","touchControlMode":"drag_rotation"},"width":"0%"}},"veil":{"backgroundOpacity":0.3,"backgroundColor":"#333333"}}},"timeout":{"title":trans('quizTimeout_54E2754E_463E_9015_41A4_8BBF097ADAEE.title'),"id":"quizTimeout_54E2754E_463E_9015_41A4_8BBF097ADAEE","score":{"visible":true,"label":trans('quizTimeout_54E2754E_463E_9015_41A4_8BBF097ADAEE.score','quizTimeout_54E2754E_463E_9015_41A4_8BBF097ADAEE.score.label')},"repeat":{"visible":false,"label":trans('quizTimeout_54E2754E_463E_9015_41A4_8BBF097ADAEE.repeat','quizTimeout_54E2754E_463E_9015_41A4_8BBF097ADAEE.repeat.label')}},"data":{"bodyScale":1,"titlesScale":1},"objectives":[{"id":"score1","label":trans('score1.label'),"visibleInScore":true}],"question":{"id":"quizQuestion_54E5B54F_463E_9013_4186_5E793F5FBC99","responseDisplayTime":2000,"ok":trans('quizQuestion_54E5B54F_463E_9013_4186_5E793F5FBC99.ok'),"scoreZeroIsIncorrect":true}}, b = this['get']('data')['translateObjs'];
    for (const c in translateObjs) {
        if (!b['hasOwnProperty'](c))
            b[c] = translateObjs[c];
    }
    return a;
}, TDV['PlayerAPI']['defineScript'](script);
//# sourceMappingURL=script_device.js.map
})();
//Generated with v2026.0.6, Sat Sep 19 2026