/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2024 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
*     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * Javascript code in this page
 */
"use strict";
var pdfjsLib = {};
(() => {
  var __webpack_modules__ = {};
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }
  __webpack_require__.g = function() {
    if (typeof globalThis === "object") return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e) {
      if (typeof window === "object") return window;
    }
  }();
  (() => {
    var exports = pdfjsLib;
    var module = {
      exports
    };
    (function(global, factory) {
      factory(exports);
    })(typeof window !== "undefined" ? window : __webpack_require__.g, (function(exports) {
      const {
        AbortException,
        AnnotationEditorLayer,
        AnnotationEditorParamsType,
        AnnotationEditorType,
        AnnotationLayer,
        AnnotationMode,
        CMapCompressionType,
        createObjectURL,
        createValidAbsoluteUrl,
        DOMSVGFactory,
        FeatureTest,
        fetchData,
        getDocument,
        getFilenameFromUrl,
        getPdfFilenameFromUrl,
        getXfaPageViewport,
        GrabToPan,
        ImageKind,
        InvalidPDFException,
        isPdfFile,
        MissingPDFException,
        noContextMenu,
        normalizeUnicode,
        OPS,
        PasswordResponses,
        PDFDataRangeTransport,
        PDFDateString,
        PDFViewer,
        PDFViewerApplication,
        PDFViewerApplicationConstants,
        PDFViewerApplicationOptions,
        PixelsPerInch,
        postMessageTransfers,
        PresentationModeState,
        ProgressBar,
        RenderingCancelledException,
        renderTextLayer,
        reviveTypedArray,
        ScrollMode,
        shadow,
        SimpleLinkService,
        SpreadMode,
        StatTimer,
        SVGGraphics,
        TextLayer,
        UnexpectedResponseException,
        updateTextLayer,
        Util,
        VerbosityLevel,
        version,
        XfaLayer
      } = __webpack_require__(1);
      exports.AbortException = AbortException;
      exports.AnnotationEditorLayer = AnnotationEditorLayer;
      exports.AnnotationEditorParamsType = AnnotationEditorParamsType;
      exports.AnnotationEditorType = AnnotationEditorType;
      exports.AnnotationLayer = AnnotationLayer;
      exports.AnnotationMode = AnnotationMode;
      exports.CMapCompressionType = CMapCompressionType;
      exports.createObjectURL = createObjectURL;
      exports.createValidAbsoluteUrl = createValidAbsoluteUrl;
      exports.DOMSVGFactory = DOMSVGFactory;
      exports.FeatureTest = FeatureTest;
      exports.fetchData = fetchData;
      exports.getDocument = getDocument;
      exports.getFilenameFromUrl = getFilenameFromUrl;
      exports.getPdfFilenameFromUrl = getPdfFilenameFromUrl;
      exports.getXfaPageViewport = getXfaPageViewport;
      exports.GrabToPan = GrabToPan;
      exports.ImageKind = ImageKind;
      exports.InvalidPDFException = InvalidPDFException;
      exports.isPdfFile = isPdfFile;
      exports.MissingPDFException = MissingPDFException;
      exports.noContextMenu = noContextMenu;
      exports.normalizeUnicode = normalizeUnicode;
      exports.OPS = OPS;
      exports.PasswordResponses = PasswordResponses;
      exports.PDFDataRangeTransport = PDFDataRangeTransport;
      exports.PDFDateString = PDFDateString;
      exports.PDFViewer = PDFViewer;
      exports.PDFViewerApplication = PDFViewerApplication;
      exports.PDFViewerApplicationConstants = PDFViewerApplicationConstants;
      exports.PDFViewerApplicationOptions = PDFViewerApplicationOptions;
      exports.PixelsPerInch = PixelsPerInch;
      exports.postMessageTransfers = postMessageTransfers;
      exports.PresentationModeState = PresentationModeState;
      exports.ProgressBar = ProgressBar;
      exports.RenderingCancelledException = RenderingCancelledException;
      exports.renderTextLayer = renderTextLayer;
      exports.reviveTypedArray = reviveTypedArray;
      exports.ScrollMode = ScrollMode;
      exports.shadow = shadow;
      exports.SimpleLinkService = SimpleLinkService;
      exports.SpreadMode = SpreadMode;
      exports.StatTimer = StatTimer;
      exports.SVGGraphics = SVGGraphics;
      exports.TextLayer = TextLayer;
      exports.UnexpectedResponseException = UnexpectedResponseException;
      exports.updateTextLayer = updateTextLayer;
      exports.Util = Util;
      exports.VerbosityLevel = VerbosityLevel;
      exports.version = version;
      exports.XfaLayer = XfaLayer;
    }));
  })();
  (() => {
    var __webpack_exports__ = {};
    const {
      WorkerMessageHandler
    } = __webpack_require__(1);
    WorkerMessageHandler.initialize();
  })();
})();
//# sourceMappingURL=pdf.worker.mjs.map
